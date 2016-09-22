import React, { Component } from 'react';

export default class Button extends Component {
  constructor({className, children, name, handleChange, data}) {
    super();
    this.state = {
    };
  }

  render() {
    return (
        <button
          className={this.props.className}
          children={this.props.children}
          name={this.props.name}
          onClick={(e) => this.props.handleChange(e.target.name,JSON.parse(this.props.data))}
        />
    );
  }
}
