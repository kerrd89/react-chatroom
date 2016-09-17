import React, {Component} from 'react';


export default class User extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
        <li className="User">
          <p>{this.props.user}</p>
        </li>
      );
  }
}
