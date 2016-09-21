import React, { Component } from 'react';

export default class MessageFilters extends Component {
  constructor({ user , addNewMessage }) {
    super();
    this.state = {
      draftMessage: ''
    };
  }

  submitNewMessage() {
    this.props.addNewMessage(this.props.user ,this.state.draftMessage);
    this.setState({draftMessage: ''});
  }

  render() {
    if (!this.props.user) {return null;}
    return (
      <div className='MessageInput'>
        <input
          className="ActualMessageInput"
          placeholder="Message…"
          value={this.state.draftMessage}
          onChange={(e) => this.setState({ draftMessage: e.target.value })}
          maxLength={140}
        />
        <div>{this.state.draftMessage.length}</div>
        <button className="NewMessageSubmit" onClick={() => this.submitNewMessage()}>Add New Message</button>
        <button onClick={() => this.setState({draftMessage: ''})}>Clear</button>
      </div>
    );
  }
}
