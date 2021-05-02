import React, { Component } from 'react';
import Page from './page';

export default class index extends Component {
  onHandleClose() {
    const { handleClose } = this.props;
    handleClose();
  }

  handleSubmit(event) {
    this.onHandleClose();
  }

  render() {
    const { open, device } = this.props;

    return (
      <Page open={open} handleSubmitForm={(event) => this.handleSubmit(event)} handleClose={(event) => this.onHandleClose(event)} device={device} />
    )
  }
}
