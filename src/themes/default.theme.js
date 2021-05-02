import { red } from '@material-ui/core/colors';
/** 
 * NOTE THIS PLEASE
 * ===========================================================================
 * materialUI is having issues with findDOMNode because it is being deprecated
 * if you are reading this and you are testing the app in case of this is not working
 * properly, please give me a chance uncomment this line below and comment the unstable one
 * It must be like:
 import { createMuiTheme } from '@material-ui/core/styles';
 // import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';
 Thanks in advance
 * */ 
// 
// import { createMuiTheme } from '@material-ui/core/styles';
import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});

export default theme;