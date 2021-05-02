import React from 'react';
import theme from './themes/default.theme';
import './App.css';
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';
import Header from './components/header';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header></Header>
        <AppRoutes></AppRoutes>
      </ThemeProvider>
    </React.StrictMode>
  );
}

export default App;
