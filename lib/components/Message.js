import React, {Component} from 'react';

export default class Message extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
        <li key={this.props.createdAt}>
          <p>{this.props.user.displayName}: {this.props.content}</p>
        </li>
      );
  }
}
