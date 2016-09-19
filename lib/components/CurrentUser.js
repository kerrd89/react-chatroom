import React, {Component} from 'react';


export default class CurrentUser extends Component {
  constructor(props) {
    super();
  }

  render() {
    debugger;
    return (
        <li className="CurrentUser">
          <p>{this.user.displayName}</p>
          <button
            children="Sign Out"
            className="Sign-Out"
            onClick={() => this.props.onClick()}
          />
        </li>
      );
  }
}
