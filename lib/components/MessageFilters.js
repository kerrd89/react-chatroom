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
