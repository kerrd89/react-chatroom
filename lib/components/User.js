import React, {Component} from 'react';


export default class User extends Component {
  constructor(props) {
    super();
  }

  redDot(user, activeUser) {
    if(user.displayName === activeUser.displayName) { return '🔴 '};
  }

  render() {
    return (
        <li
            // key={this.props.uid}
            className="User" onClick={() => this.props.handleClick(this.props)}>
          <p>{this.props.displayName} ({this.props.email}) {this.redDot(this.props, this.props.activeUser)}</p>
        </li>
      );
  }
}
