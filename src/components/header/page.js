import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import './style.css';

export default function Page() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className="spaced-title">Devices Manager</Typography>
      </Toolbar>
    </AppBar>
  )
}
