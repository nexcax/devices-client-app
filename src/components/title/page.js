import React from 'react';
import { Typography } from '@material-ui/core';


export default function Page({title}) {
  return (
    <Typography variant="h4" gutterBottom>
      {title}
    </Typography>
  )
}
