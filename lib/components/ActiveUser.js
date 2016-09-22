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
          <p>You are signed in as <span className="UserLine">{this.props.user.displayName} ({this.props.user.email})</span></p>
          <button
            onClick={() => this.props.signOut()}
            children="Sign Out"
            className="SignOut"
          />
        </div>
      );
    }
    if (!this.props.user) {
      return (
        <div className="ActiveUser">
          <button
            onClick={() => this.props.signIn()}
            children="Log In"
            className="SignIn"
          />
        </div>
      );
    }

  }
}
