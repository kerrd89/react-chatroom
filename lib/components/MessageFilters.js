import React, { Component } from 'react'

export default class MessageFilters extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <div className='MessageFilters'>
        <input />
        <button>Sort up</button>
        <button>Sort down</button>
      </div>
    );
  }
}
