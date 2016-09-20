import React, {Component} from 'react';
import moment from 'moment';


export default class Message extends Component {
  constructor(props) {
    super();
  }

  render() {
    let time = this.props.createdAt;
    let realTime = moment(time).format("LLL")

    if(this.props.filter) {
      console.log(this.props.filter);
      if (this.props.content.includes(this.props.filter)) {
        return (
          <li key={this.props.createdAt}>
          <p>{realTime}</p>
          <p>{this.props.user.displayName}: {this.props.content}</p>
          </li>
        )
      }
      else {
        return null;
      }
    }
    if(!this.props.filter) {
      return (
        <li key={this.props.createdAt}>
        <p>{realTime}</p>
        <p>{this.props.user.displayName}: {this.props.content}</p>
        </li>
      );
    }
  }
}
