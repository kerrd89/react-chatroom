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
      if (this.props.content.includes(this.props.filter)) {
        return (
          <li key={this.props.createdAt} className="individualMessage">
          <p className="TimeStamp">{realTime}
            <span className="DisplayName">{this.props.user.displayName}</span>
          </p>
          <p>{this.props.content}</p>
          </li>
        )
      }
      else {
        return null;
      }
    }
    if(!this.props.filter) {
      return (
        <li className="Message individualMessage" key={this.props.createdAt}>
        <p className="TimeStamp">{realTime}
          <span className="DisplayName">{this.props.user.displayName}</span>
        </p>
        <p>{this.props.content}</p>
        </li>
      );
    }
  }
}
