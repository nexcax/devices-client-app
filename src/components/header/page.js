import React from 'react';
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import StorageIcon from '@material-ui/icons/Storage';
import './style.css';

export default function Page() {
  return (
    <AppBar position="static">
      <Toolbar>
      <IconButton edge="start" color="inherit" aria-label="menu">
        <StorageIcon />
      </IconButton>
        <Typography variant="h6" className="spaced-title">Devices Manager</Typography>
      </Toolbar>
    </AppBar>
  )
}
