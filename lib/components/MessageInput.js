import React, { Component } from 'react';

export default class MessageInputs extends Component {
  constructor({ user , addNewMessage }) {
    super();
    this.state = {
      draftMessage: '',
    };
  }

  handleChange(e) {
    this.setState({ draftMessage: e.target.value });
  }

  submitNewMessage() {
    this.props.addNewMessage(this.props.user ,this.state.draftMessage);
    this.setState({draftMessage: ''});
  }

  render() {
    return (
      <div className='MessageInput'>
        <input
          // className="ActualMessageInput"
          name="draftMessage"
          placeholder="Message…"
          value={this.state.draftMessage}
          onChange={(e) => this.handleChange(e)}
          maxLength={140}
        />
        <div>{this.state.draftMessage.length}</div>
        <button
          className="NewMessageButton"
          name="newMessageSubmit"
          disabled={!this.state.draftMessage}
          onClick={() => this.submitNewMessage()}
          children="Add New Message"
        />
        <button
          className="ClearButton"
          onClick={() => this.setState({draftMessage: ''})}
          children="Clear"
          disabled={!this.state.draftMessage}
        />
      </div>
    );
  }
}
