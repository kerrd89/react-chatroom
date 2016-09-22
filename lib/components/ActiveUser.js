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
          <p>You are signed in as {this.props.user.displayName} ({this.props.user.email})</p>
          <button onClick={() => this.props.signOut()}>Sign Out</button>
        </div>
      );
    }
    if (!this.props.user) {
      return (
        <div className="ActiveUser">
          <button onClick={() => this.props.signIn()}>Sign In</button>
        </div>
      );
    }

  }
}
