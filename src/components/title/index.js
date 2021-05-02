import { Component } from 'react';
import Page from './page';

export default class Title extends Component {

  render() {
    return (
      <Page {...this.props} />
    )
  }

}
