import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { ThemeProvider, createTheme } from '@mui/material/styles';

import App from './app/app';
import { store } from './store/store';

const theme = createTheme();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
  <StrictMode>    
      <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>
  </StrictMode>
  </Provider>
  
);
