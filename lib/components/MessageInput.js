import React, { Component } from 'react';
import Input from './Input';

export default class MessageInput extends Component {
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

  updateDraftMessage(newValue) {
    this.setState({draftMessage: newValue});
  }

  render() {
    if (!this.props.user) {return null;}
    return (
      <div className='MessageInput'>
        <Input
          className="ActualMessageInput"
          placeholder="Message…"
          value={this.state.draftMessage}
          handleChange={this.updateDraftMessage.bind(this)}
          maxLength={140}
        />
        <div>{this.state.draftMessage.length}</div>
        <button className="NewMessageSubmit"
        disabled={!this.state.draftMessage}
        onClick={() => this.submitNewMessage()}>Submit</button>
        <button className="Clear" onClick={() => this.setState({draftMessage: ''})}>Clear</button>
      </div>
    );
  }
}
