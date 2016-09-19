import React, { Component } from 'react';

export default class MessageInputs extends Component {
  constructor({ user , signOut , signIn }) {
    super();
    this.state = {
    };
  }

  render() {
    if (this.props.user) {
      return (
        <div className="ActiveUser">
          <p>Hello {this.props.user.displayName}</p>
          <button onClick={() => this.props.signOut()}>Sign Out</button>
        </div>
      );
    }
    if (!this.props.user) {
      return (
        <button onClick={() => this.props.signIn()}>Sign In</button>
      );
    }

  }
}
