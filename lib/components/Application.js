import React, { Component } from 'react';
import firebase, { reference, signIn } from '../firebase';
import { pick, map, extend , sortedUniq , flatten, groupBy } from 'lodash';
import MessageFilters from './MessageFilters';
import MessageInput from './MessageInput';
import Message from './Message';
import User from './User';
import ActiveUser from './ActiveUser';

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

  //need a function to call for the messages on page load, not only on value change

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
          <ul className='Messages'>
            {renderMessages}
          </ul>
          <ul className='Users'>
            {renderUsers}
          </ul>
        </div>
        <ActiveUser signOut={this.triggerSignOut} signIn={signIn} user={user}/>
        <MessageInput reference={reference} addNewMessage={this.addNewMessage} user={this.state.user}/>
      </div>
    )
  }
}
