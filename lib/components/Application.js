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
      selectedUser: null,
    };
  }

  updateFilter(value) {
    this.setState({filter: value.toLowerCase()});
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

  selectUser(user) {
    if (this.state.selectedUser === user) {
        return this.setState({ selectedUser: null });
      }
      return this.setState({selectedUser: user});
    }

  render() {
    const { user, messages, draftMessage } = this.state;
    const users =[];
    map(this.state.messages, (message) => {
      users.push(message.user);
    });
    var uniqueUsers = [...new Set(users.map(user => user.email))];

    const renderUsers = map(uniqueUsers, (user) => {
      return <User user={user} handleClick={this.selectUser.bind(this)}/>
      }
    );

    const renderMessages = map(this.state.messages, (message) => {
      if (!this.state.selectedUser) {
        return <Message {...message} filter={this.state.filter}/>
      }
      if (this.state.selectedUser === message.user.email) {
        return <Message {...message} filter={this.state.filter}/>
      }
    });

    return (
      <div className="Application">
        <MessageFilters handleChange={this.updateFilter.bind(this)}/>
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
