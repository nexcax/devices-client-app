import React, { Component } from 'react';
import Page from './page';

export default class index extends Component {

  constructor(props) {
    super(props);

    this.handleFilter = this.props.handleFilter.bind(this);
    this.handleSort = this.props.handleSort.bind(this);
  }

  render() {
    return (
      <Page initialFilters={this.props.initialFilters} handleFilterChange={this.props.handleFilter} handleSortChange={this.props.handleSort} />
    )
  }
}
