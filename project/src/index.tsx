import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './components/app/app';
import HistoryRouter from './components/history-router/history-router';
import { AuthorizationStatus } from './const';
import {store} from './store';
import { fetchOffersAction, checkAuthAction } from './store/api-actions';
import browserHistory from './browser-history';


export const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean =>
  authorizationStatus === AuthorizationStatus.Unknown;

store.dispatch(fetchOffersAction());
store.dispatch(checkAuthAction());


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <HistoryRouter history = {browserHistory}>
        <ToastContainer
          autoClose = {3000}
          position="top-right"
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>,
);
