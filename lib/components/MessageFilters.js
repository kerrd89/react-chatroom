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
        <h1>Shoot The Breeze</h1>
        <input
          type="text"
          placeholder="Filter"
        />
        <button
          className="SortButton"
          children="Sort up"
        />
        <button
          className="SortButton"
          children="Sort down"
        />
      </div>
    );
  }
}
