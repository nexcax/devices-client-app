
# Devices Client App
This project is for a challenge resolution to manage devices storing all information related below:
  * id
  * System Name
  * Type
  * HDD Capacity

It allows to add devices type like:
  * Windows Workstation
  * Windows Server
  * Mac

For reference the application was built using React, below you will find information about create-react-app CLI used, and how to install if you have not.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

The project depends on NodeJs and you need to have it installed in your environment.

All the dependencies were already added in the package.json file and you can follow all the instructions below:

## How to run

This app was created based on the backend API provided by Ninja Team from: [https://github.com/NinjaRMM/devicesTask_serverApp](https://github.com/NinjaRMM/devicesTask_serverApp), all endpoints are describes below:

### GET devices

    GET http://localhost:3000/devices

### POST device

    POST http://localhost:3000/devices
    Content-Type: application/json
    {
    "system_name": "my-mac",
    "type": "MAC",
    "hdd_capacity": "64"
    }

### GET device

    GET http://localhost:3000/devices/:deviceId

### PUT device

    PUT http://localhost:3000/devices/:deviceId
    Content-Type: application/json
    {
    "system_name": "my-win-server",
    "type": "WINDOWS_SERVER",
    "hdd_capacity": "500"
    }

### DELETE device

    DELETE http://localhost:3000/devices/:deviceId

### IMPORTANT

Before start running the app, please clone the backend application from [https://github.com/NinjaRMM/devicesTask_serverApp](https://github.com/NinjaRMM/devicesTask_serverApp) and execute the instructions in the Readme file for reference use: `npm install` and `npm start`, this will launch the backend API where the frontend app will connect and consume the data required.

### RUN FRONTEND

The packages used to build this project were:

 - React
 - React-Router-Dom
 - Redux - Redux-Observable - RxJs
 - Material-UI - Material-UI-Icons

Enter in the project directory (cd devices-client) on your downloaded or cloned path, and you can run:

### `yarn install` or `yarn`
This will install all the required packages.

### `yarn start`

Runs the app in the development mode.
The application could be accessible by port 3000 but depending on the server application this port could be used so the app could be launched using the next ports like 3001 or 3002 so you can use [http://localhost:300x](http://localhost:300x) format (depends on the port) to view it in the browser.


### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


