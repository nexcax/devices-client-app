import { BehaviorSubject } from 'rxjs';
import { API } from '../configs/Constants';

export const devices$ = new BehaviorSubject([]);

export const DeviceService = {
  listen: () => {
    return devices$.asObservable();
  },

  close: () => {
    devices$.unsubscribe();
  },

  get: () => {
    fetch(API.url + '/devices', {
      method: 'GET',
    }).then(result => {
      result.json().then(data => devices$.next(data));
    });
  },

  applyFilter: (filterApplied, sortApplied) => {
    const filteredDevices = [
      ...devices$.value.map(device => {
        return {
          ...device,
          hdd_capacity: Number(device.hdd_capacity) || 0,
        };
      })
      .filter(device => {
        return (filterApplied.indexOf(device.type) >= 0);
      })
      .sort((a, b) => {
        if (!sortApplied || sortApplied === 'none') {
          return 0;
        } else {
          if (sortApplied === 'system_name') {
            return (a.system_name).localeCompare(b.system_name);
          } else if (sortApplied === 'hdd_capacity') {
            return a.hdd_capacity - b.hdd_capacity;
          }
        }
        return 0;
      }),
    ];
    return filteredDevices;
  },

  delete: (deviceId) => {
    return fetch(API.url + `/devices/${deviceId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }).finally(() => DeviceService.get());
  },

  update: (deviceId, device) => {
    return fetch(API.url + `/devices/${deviceId}`, {
      method: 'PUT',
      body: JSON.stringify({
        system_name: String(device.system_name).trim(),
        hdd_capacity: device.hdd_capacity,
        type: device.type,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => DeviceService.get()).catch(error => error);
  },

  save: (device) => {
    return fetch(API.url + '/devices', {
      method: 'POST',
      body: JSON.stringify({
        system_name: device.system_name,
        hdd_capacity: device.hdd_capacity,
        type: device.type,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => DeviceService.get()).catch(error => error);
  },
  
};