import React, { Component } from 'react';

export default class Input extends Component {
  constructor({className, placeholder, value, handleChange, type, name}) {
    super();
    this.state = {
    };
  }

  render() {
    return (
        <input
          className={this.props.className}
          type={this.props.type}
          placeholder={this.props.placeholder}
          value={this.props.draftMessge}
          onChange={(e) => this.props.handleChange(e.target.value)}
        />
    );
  }
}
