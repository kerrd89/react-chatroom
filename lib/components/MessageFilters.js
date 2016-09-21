import React, { Component } from 'react';
import Button from './Button';

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
