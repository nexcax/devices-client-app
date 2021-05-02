import React, { Component } from 'react'
import Page from './page';

export default class index extends Component {
  render() {
    const { open, title, message, handleClose } = this.props;
    return (
      <Page open={open} title={title} message={message} handleClose={handleClose} />
    )
  }
}
