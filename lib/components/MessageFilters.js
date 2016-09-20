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
          name="filter"
          onChange={(e) => this.props.handleChange(e.target.name,e.target.value.toLowerCase())}
        />
        <button
          className="SortButton"
          children="Sort up"
          name="sort"
          onClick={(e) => this.props.handleChange(e.target.name,true)}
        />
        <button
          className="SortButton"
          children="Sort down"
          name="sort"
          onClick={(e) => this.props.handleChange(e.target.name,false)}
        />
      </div>
    );
  }
}
