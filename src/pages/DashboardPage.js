import React, { Component } from 'react'
import AddIcon from '@material-ui/icons/Add';
import { Button, Container } from '@material-ui/core';

import { DeviceService } from '../services/devices.service';
import DeviceList from '../components/device-list/index';
import Title from '../components/title';
import Filters from '../components/filters';
import Dialog from '../components/dialog';
import DeviceForm from '../components/device-form';
import './DashboardPage.css';
import { DEVICE_TYPES } from '../configs/Constants';


export default class DashboardPage extends Component {
  state = {
    devices: [],
    sortField: '',
    typeFields: [],
    confirmDelete: false,
    selectedDevice: null,
    editOpen: false,
  };

  componentDidMount() {
    DeviceService.get();
    DeviceService.listen().subscribe(devices => {
      this.setState({
        ...this.state,
        devices, // all devices
        filteredDevices: DeviceService.applyFilter(this.state.typeFields, this.state.sortField), // only with filter applied
      });
    });
    // set initial filter
    const typeFields = DEVICE_TYPES.map(item => item.value);
    this.handleFilteredDevices(typeFields);
  }

  handleOnDelete(device) {
    if (device && device.id) {
      this.setState({
        ...this.state,
        selectedDevice: {...device},
        confirmDelete: true,
      }, );
    }
  }

  handleSortDevices(event) {
    this.setState({
      ...this.state,
      sortField: event,
    }, this.refreshFilteredDevices);
  }

  handleFilteredDevices(event) {
    this.setState({
      ...this.state,
      typeFields: event,
    }, this.refreshFilteredDevices);
  }

  refreshFilteredDevices() {
    const filteredDevices = DeviceService.applyFilter(this.state.typeFields, this.state.sortField);
    this.setState({
      ...this.state,
      filteredDevices,
    });
  }

  handleDeleteConfirmation(event) {
    if (event) {
      DeviceService.delete(this.state.selectedDevice.id).then(() => {
        this.setState({
          ...this.state,
          confirmDelete: false,
          selectedDevice: null,
        }, this.refreshFilteredDevices);
      });
    } else {
      this.setState({
        ...this.state,
        confirmDelete: false,
        selectedDevice: null,
      });
    }

  }

  onEditDevice(device) {
    this.setState({
      ...this.state,
      selectedDevice: device,
      editOpen: true,
    });
  }

  onCloseDeviceForm(event) {
    this.setState({
      ...this.state,
      selectedDevice: null,
      editOpen: false,
    });
  }

  render() {
    const { filteredDevices, confirmDelete, editOpen, selectedDevice, typeFields } = this.state;

    return (
      <Container className="page-container">
        <Title title={'Devices List'}></Title>
        <div className="flex-container">
          <Filters initialFilters={typeFields} handleSort={(event) => this.handleSortDevices(event)} handleFilter={(event) => this.handleFilteredDevices(event)}></Filters>
          <span className="spacer"></span>
          <Button color="primary" onClick={() => this.onEditDevice(null)}>
            <AddIcon /> Add new device
          </Button>
        </div>
        <DeviceList devices={filteredDevices} handleOnEditClick={(event) => this.onEditDevice(event)} handleOnDeleteClick={(event) => this.handleOnDelete(event)}></DeviceList>
        <Dialog open={confirmDelete} title="Delete device" message="Are you sure to delete this device?" handleClose={(event) => this.handleDeleteConfirmation(event)}></Dialog>
        <DeviceForm open={editOpen} device={selectedDevice} handleClose={(event) => this.onCloseDeviceForm(event)}></DeviceForm>
      </Container>
    )
  }
}
