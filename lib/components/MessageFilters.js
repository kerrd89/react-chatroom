import React, { Component } from 'react';

export default class MessageFilters extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <div className='MessageFilters'>
        <input
          type="text"
          placeholder="Filter"
        />
        <button
          children="Sort up"
        />
        <button
          children="Sort down"
        />
      </div>
    );
  }
}
