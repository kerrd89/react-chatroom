import React, {Component} from 'react';


export default class User extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
        <li className="User" onClick={() => this.props.handleClick(this.props.user)}>
          <p>{this.props.user}</p>
        </li>
      );
  }
}
