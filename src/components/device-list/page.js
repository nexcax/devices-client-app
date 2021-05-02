import React from 'react';
import { Fragment } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import LaptopIcon from '@material-ui/icons/Laptop';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import StorageIcon from '@material-ui/icons/Storage';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Divider, IconButton, ListItemSecondaryAction, Typography } from '@material-ui/core';
import './styles.css';

export default function Page({devices, handleOnEditClick, handleOnDeleteClick}) {
  const handleDelete = (device) => {
    handleOnDeleteClick(device);
  };

  const empty = <ListItem><Typography variant="h5">No devices found</Typography></ListItem>
  return (
    <>
      <List className="list">
        {!devices || devices.length === 0 ? empty : devices && devices.length && devices.map(device => {
          const icono = device.type === 'WINDOWS_SERVER'
            ? <StorageIcon />
            : device.type === 'MAC'
              ? <LaptopMacIcon />
              : <LaptopIcon />
          return (
            <Fragment key={device.id}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    {icono}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={device.system_name} secondary={
                    <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className="inline"
                      color="textPrimary"
                    >
                      {device.type}
                    </Typography>
                    <Typography
                      component="span"
                      variant="body2"
                      className={device.hdd_capacity === 0 ? 'hdd-size size-warning' : 'hdd-size'}
                      color="textPrimary"
                    >
                      {device.hdd_capacity}GB
                    </Typography>
                  </React.Fragment>
                  } />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="edit" onClick={() => handleOnEditClick(device)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(device)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
            </Fragment>
          )
        })}
      </List>
    </>
  )
}
