import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import ReactGA from 'react-ga';
import { CookiesProvider } from 'react-cookie';
import store from './redux/store';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);
const TRACKING_ID = process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID;
if (process.env.REACT_APP_GOOGLE_ANALYTICS) {
  ReactGA.initialize(TRACKING_ID);
}

ReactGA.initialize(TRACKING_ID);
root.render(
  <Provider store={store}>
    <CookiesProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CookiesProvider>
  </Provider>,
);
