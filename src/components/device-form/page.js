import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Button, createStyles, Dialog, DialogContent, DialogContentText, DialogTitle, FormControl, FormHelperText, InputAdornment, makeStyles, MenuItem, OutlinedInput, TextField } from '@material-ui/core';

import { DEVICE_TYPES } from '../../configs/Constants';
import { DeviceService } from '../../services/devices.service';
import './styles.css';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      minWidth: '100%',
      marginLeft: '0px',
      marginBottom: theme.spacing(2),
    },
    buttonContainer: {
      padding: '20px 0',
      display: 'flex',
      justifyContent: 'flex-end',
    },
  }),
);

export default function Page({open, device, handleClose, handleSubmitForm}) {
  const classes = useStyles();
  const [errors, setErrors] = useState({
    system_name: false,
    type: false,
    hdd_capacity: false,
  });
  const [state, setState] = useState({
    id: '',
    system_name: '',
    type: '',
    hdd_capacity: 0,
  });

  useEffect(() => {
    if (device && device.id) {
      setState({
        id: device.id,
        system_name: device.system_name,
        type: device.type,
        hdd_capacity: device.hdd_capacity,
      });
    }
  }, [device]);

  const handleOnchange = (field, value) => {
    setState({ ...state, [field]: value });
  };

  const cleanForm = () => {
    setState({
      id: '',
      system_name: '',
      type: '',
      hdd_capacity: 0,
    });
  };

  const onHandleSubmit = () => {
    let promise;
    
    if (state && state.id) {
      promise = DeviceService.update(state.id, state);
    } else {
      promise = DeviceService.save(state);
    }
    promise.then(() => {
      cleanForm();
      handleSubmitForm(state);
    }).catch(error => {
      console.log('error', error);
    });
  };

  const validateForm = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const formErrors = {
      system_name: String(state.system_name).trim() === '',
      type: state.type === '',
      hdd_capacity: !isValidNumber(state.hdd_capacity),
    };

    setErrors({
      ...errors,
      ...formErrors,
    });
    if (Object.values(formErrors).indexOf(true) >= 0) {
      return;
    } else {
      onHandleSubmit();
    }
  };

  const isValidNumber = (value) => {
    if (String(value).indexOf('e') >= 0 || String(value).trim() === '') {
      return false;
    }
    return (!isNaN(Number(value)) && Number(value) >= 0);
  };

  return (
    <Dialog open={open}>
      <DialogTitle id="form-dialog-title">
        {device && device.id ? 'Edit device' : 'Add device'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
        {
          device && device.id
            ? 'Update the device information in the form below'
            : 'Add all information to create a new device'
        }
        </DialogContentText>
        <div>
        {/* <form onSubmit={(event) => onHandleSubmit(event)}> */}
        <form onSubmit={validateForm}>
          <input type="hidden" name="id" value={state.id}  onChange={(event) => handleOnchange('id', event.target.value)} />
        
          <FormControl className={clsx(classes.root)} variant="outlined">
            <TextField id="system_name" label="System Name" variant="outlined" value={state.system_name} onChange={(event) => handleOnchange('system_name', event.target.value)} />
            <FormHelperText id="outlined-weight-helper-text">
              Enter the device name
              {errors.system_name && <span className="error-validation">The name of the device is required</span>}
            </FormHelperText>
          </FormControl>

          <FormControl className={clsx(classes.root)} variant="outlined">
            <TextField
              id="outlined-select-currency"
              select
              label="Device Type"
              value={state.type}
              onChange={(event) => handleOnchange('type', event.target.value)}
              helperText="Please select the type for this device"
              variant="outlined"
            >
              {DEVICE_TYPES.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.text}
                </MenuItem>
              ))}
            </TextField>
            {errors.type && <span className="error-validation">Please select a device type</span>}
          </FormControl>

          <FormControl className={clsx(classes.root)} variant="outlined">
            <OutlinedInput
              id="outlined-adornment-weight"
              type="number"
              value={state.hdd_capacity}
              onChange={(event) => handleOnchange('hdd_capacity', event.target.value)}
              endAdornment={<InputAdornment position="end">GB</InputAdornment>}
              aria-describedby="outlined-weight-helper-text"
              inputProps={{
                'aria-label': 'hdd capacity',
              }}
              labelWidth={0}
            />
            <FormHelperText id="outlined-weight-helper-text">
              The Hard Disk Drive capacity in Gigabytes (GB)
              {errors.hdd_capacity && <span className="error-validation">HDD capacity value is incorrect</span>}
            </FormHelperText>
          </FormControl>
          <div className={clsx(classes.buttonContainer)}>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button variant="contained" type="submit" color="primary">
              Save
            </Button>
          </div>
        </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
