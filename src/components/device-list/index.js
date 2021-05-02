import React, { Component } from 'react'

import Page from './page'


class DeviceList extends Component {

  constructor(props) {
    super(props);

    this.handleOnDeleteClick = this.handleOnDeleteClick.bind(this);
    this.handleOnEditClick = this.handleOnEditClick.bind(this);
  }

  handleOnEditClick(device) {
    const { handleOnEditClick } = this.props;
    if (handleOnEditClick) {
      handleOnEditClick(device);
    }
  }
  
  handleOnDeleteClick(device) {
    const { handleOnDeleteClick } = this.props;
    if (handleOnDeleteClick) {
      handleOnDeleteClick(device);
    }
  }

  render() {
    const { devices } = this.props;

    return (
      <>
        <Page
          devices={devices}
          handleOnEditClick={this.handleOnEditClick}
          handleOnDeleteClick={this.handleOnDeleteClick.bind(this)} />
      </>
    )
  }
}

export default DeviceList;