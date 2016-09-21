import React, { Component } from 'react';
import firebase, { reference, signIn } from '../firebase';
import { pick, map, extend , sortedUniq , flatten, groupBy, uniqWith } from 'lodash';
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
      sort: false,
      selectedUser: null,
    };
  }

  updateState(property, value) {
    this.state[property] = value;
    this.forceUpdate();
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
    if (this.state.selectedUser) {
      return this.setState({ selectedUser: null });
      }
      return this.setState({selectedUser: user});
    }

  render() {
    const { user, messages, draftMessage } = this.state;
    const usersArray = [];

    map(this.state.messages, (message) => usersArray.push(message.user));
    const uniqueUsers = (_.uniqWith(usersArray, _.isEqual));

    const renderUsers = map(uniqueUsers, (user) => {
      return <User {...user}
        activeUser={this.state.user}
        handleClick={this.selectUser.bind(this)}
        />
      }
    );

    const renderMessages = map(this.state.messages, (message) => {
      if (!this.state.selectedUser) {
        return <Message {...message} filter={this.state.filter}/>
      }
      if (this.state.selectedUser.email === message.user.email) {
        return <Message {...message} filter={this.state.filter}/>
      }
    });
    this.state.sort ? renderMessages.reverse() : renderMessages;

    return (
      <div className="Application">
        <MessageFilters handleChange={this.updateState.bind(this)}/>
        <div className='Main'>
          <ul className='Messages'>
            {renderMessages}
          </ul>
          <ul className='Users'>
            <h2>Users</h2>
            {renderUsers}
          </ul>
        </div>
        <ActiveUser signOut={this.triggerSignOut} signIn={signIn} user={user}/>
        <MessageInput reference={reference} addNewMessage={this.addNewMessage} user={this.state.user}/>
      </div>
    )
  }
}
