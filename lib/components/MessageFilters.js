import React, { Component } from 'react';
import Button from './Button';
import Input from './Input';

export default class MessageFilters extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  updateFilter(newFilter) {
    newFilter.toLowerCase();
    this.props.handleChange('filter', newFilter);
  }

  render() {
    return (
      <div className='MessageFilters'>
        <h1>Shoot The Breeze</h1>
        <Input
          className="Filter"
          type="text"
          placeholder="Filter"
          name="filter"
          handleChange={this.updateFilter.bind(this)}
        />
        <Button className="SortButton"
                children="Sort ⬆"
                name="sort"
                data="true"
                handleChange={this.props.handleChange}
        />
        <Button className="SortButton"
                children="Sort ⬇︎"
                name="sort"
                data="false"
                handleChange={this.props.handleChange}
        />
      </div>
    );
  }
}




<button
className="SortButton"
children="Sort ⬇︎"
name="sort"
onClick={(e) => this.props.handleChange(e.target.name,false)}
/>



// <button
// className="SortButton"
// children="Sort ⬆"
// name="sort"
// onClick={(e) => this.props.handleChange(e.target.name,true)}
// />
