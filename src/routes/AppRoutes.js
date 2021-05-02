import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import DashboardPage from '../pages/DashboardPage'

export default class AppRoutes extends Component {

  constructor(props) {
    super(props);
    this.state = {
      location: props.history && props.history.location,
    };
  }


  render() {
    return (
      <Router>
        <Switch>
          {/* Default page, there was no other routes for this challenge now */}
          <Route path="/"><DashboardPage /></Route>
        </Switch>
      </Router>
    )
  }
}
