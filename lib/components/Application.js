import React, { Component } from 'react';
import firebase, { reference, signIn } from '../firebase';
import { pick, map, extend , sortedUniq , flatten, groupBy } from 'lodash';
import MessageFilters from './MessageFilters';
import MessageInput from './MessageInput';
import Message from './Message';

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
      return <li key={user}>{user}</li>
    });
    const renderMessages = map(this.state.messages, (message) => {
      return <Message {...message} />
      }
    );
    // const renderMessages = this.state.messages.map(m => <li key={m.key}>{m.user.displayName}: {m.content}</li>);
    return (
      <div className="Application">
        <MessageFilters />
        <div className='Main'>
          <ul>
            {renderMessages}
          </ul>
          <ul>
            {renderUsers}
          </ul>
        </div>
        {user ? <p>Hello {user.displayName}</p> : <button onClick={() => signIn()}>Sign In</button> }
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


// <div className="MessageInput">
// <input
// placeholder="Message…"
// value={this.state.draftMessage}
// onChange={(e) => this.setState({ draftMessage: e.target.value })}
// />
// <button onClick={() => this.addNewMessage()}>Add New Message</button>
// </div>
