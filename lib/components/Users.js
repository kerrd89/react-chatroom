import React, {Component} from 'react';


export default class Users extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
        <li>
          <p>{this.props.user.displayName} ({this.props.user.email}) </p>
        </li>
      );
  }
}
