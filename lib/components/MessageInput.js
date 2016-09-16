import React, { Component } from 'react'

export default class MessageFilters extends Component {
  constructor({ user , addNewMessage }) {
    super();
    this.state = {
      draftMessage: ''
    };
  }

  submitNewMessage() {
    this.props.addNewMessage(this.state.draftMessage);
    this.setState({draftMessage: ''});
  }

  render() {
    return (
      <div className='MessageInput'>
        <input
          placeholder="Message…"
          value={this.state.draftMessage}
          onChange={(e) => this.setState({ draftMessage: e.target.value })}
        />
        <div>count</div>
        <button onClick={() => this.submitNewMessage()}>Add New Message</button>
      </div>
    );
  }
}
