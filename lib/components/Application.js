import React, { Component } from 'react'
import firebase, { reference, signIn } from '../firebase';
import { pick, map, extend } from 'lodash';
import MessageFilters from './MessageFilters';
import MessageInput from './MessageInput';

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

  addNewMessage(newMessage) {
    reference.push({
      user: pick(user, 'displayName', 'email', 'uid'),
      content: newMessage,
      createdAt: Date.now()
    });
  }

  render() {
    const { user, messages, draftMessage } = this.state;
    return (
      <div className="Application">
        <MessageFilters />
        <ul>
          { this.state.messages.map(m => <li key={m.key}>{m.user.displayName}: {m.content}</li>) }
        </ul>
        {user ? <p>Hello {user.displayName}</p> : <button onClick={() => signIn()}>Sign In</button> }
        <MessageInput user={user} addNewMessage={this.addNewMessage}/>
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
