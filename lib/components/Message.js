import React, {Component} from 'react';
import moment from 'moment';


export default class Message extends Component {
  constructor(props) {
    super();
  }

  render() {
    let time = this.props.createdAt;
    let realTime = moment(time).format("LLL")
    return (
        <li key={this.props.createdAt}>
          <p>{realTime}</p>
          <p>{this.props.user.displayName}: {this.props.content}</p>
        </li>
      );
  }
}
