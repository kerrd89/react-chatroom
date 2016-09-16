import React, { Component } from 'react'
import firebase, { reference, signIn } from '../firebase';
import { pick, map, extend } from 'lodash';
import MessageFilters from './MessageFilters';
import MessageInput from './MessageInput';
import Message from './Message'

export default class Application extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      user: null,
      filter: '',
      sort: ''
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

  render() {
    const { user, messages, draftMessage } = this.state;
    // const renderMessages = map(this.state.messages, (message) => {
    //   console.log(message.key);
    //   console.log(message.user.displayName);
    //   console.log(message.content);
    //   // <li key={message.key}>{message.user.displayName}: {message.content}</li>
    //   <Message {...message}/>
    //   }
    // );
    const renderMessages = this.state.messages.map(m => <li key={m.key}>{m.user.displayName}: {m.content}</li>);
    return (
      <div className="Application">
        <MessageFilters />
        <ul>
          {renderMessages}
        </ul>
        {user ? <p>Hello {user.displayName}</p> : <button onClick={() => signIn()}>Sign In</button> }
        <MessageInput reference={reference} addNewMessage={this.addNewMessage} user={this.state.user}/>
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
