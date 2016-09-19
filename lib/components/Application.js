import React, { Component } from 'react';
import firebase, { reference, signIn } from '../firebase';
import { pick, map, extend , sortedUniq , flatten, groupBy } from 'lodash';
import MessageFilters from './MessageFilters';
import MessageInput from './MessageInput';
import Message from './Message';
<<<<<<< HEAD
import User from './User';
=======
import ActiveUser from './ActiveUser';
>>>>>>> de15dafe59da8db1ab8406c536095471bf1103d5

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
<<<<<<< HEAD

=======
>>>>>>> de15dafe59da8db1ab8406c536095471bf1103d5
    return (
      <div className="Application">
        <MessageFilters />
        <div className='Main'>
          <ul className='Messages'>
            {renderMessages}
          </ul>
          <ul className='Users'>
<<<<<<< HEAD
            <li>Users</li>
            {renderUsers}
          </ul>
        </div>
        {user ? <p className="CurrentUser">Hello {user.displayName}</p> : <button onClick={() => signIn()}>Sign In</button> }
=======
            {renderUsers}
          </ul>
        </div>
        <ActiveUser signOut={this.triggerSignOut} signIn={signIn} user={user}/>
>>>>>>> de15dafe59da8db1ab8406c536095471bf1103d5
        <MessageInput reference={reference} addNewMessage={this.addNewMessage} user={this.state.user}/>
      </div>
    )
  }
}
