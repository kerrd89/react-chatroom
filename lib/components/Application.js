import React, { Component } from 'react';
import firebase, { reference, signIn } from '../firebase';
import { pick, map, extend , sortedUniq , flatten, groupBy } from 'lodash';
import MessageFilters from './MessageFilters';
import MessageInput from './MessageInput';
import Message from './Message';
import User from './User';

export default class Application extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      user: null,
      filter: '',
      sort: '',
    };
  }

  updateFilter(search) {
    this.setState({filter: search});
  }

  componentDidMount() {
    reference.limitToLast(100).on('value', (snapshot) => {
      const messages = snapshot.val() || {};
      this.setState({
        messages: map(messages, (val, key) => extend(val, { key }))
      });
    });
    firebase.auth().onAuthStateChanged(user => this.setState({ user }));
  }

  addNewMessage(user, newMessage) {
    const userInfo = pick(user, 'displayName', 'email', 'uid');
    reference.push({
      user: userInfo,
      content:  newMessage,
      createdAt: Date.now()
    });
   }

   triggerSignOut() {
    firebase.auth().signOut();
    this.setState({ user: null });
  }

  render() {
    const { user, messages, draftMessage } = this.state;
    const users =[];
    map(this.state.messages, (message) => {
      users.push(message.user);
    });
    var uniqueUsers = [...new Set(users.map(user => user.email))];

    const renderUsers = map(uniqueUsers, (user) => {
      return <User user={user}/>
      }
    );
    const renderMessages = map(this.state.messages, (message) => {
      return <Message {...message}/>
      }
    );

    return (
      <div className="Application">
        <MessageFilters />
        <div className='Main'>
          <ul>
            {renderMessages}
          </ul>
          <ul className='Users'>
            <li>Users</li>
            {renderUsers}
          </ul>
        </div>
        {user ? <p className="CurrentUser">Hello {user.displayName}</p> : <button onClick={() => signIn()}>Sign In</button> }
        <MessageInput reference={reference} addNewMessage={this.addNewMessage} user={this.state.user}/>
        <button
          children="Sign Out"
          className="Sign-Out"
          onClick={() => this.triggerSignOut()}
        />
      </div>
    )
  }
}
