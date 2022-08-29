import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import browserHistory from './browser-history';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Provider} from 'react-redux';
import {store} from './store';
import { fetchOffersAction, checkAuthAction } from './store/api-actions';
import HistoryRouter from './components/history-router/history-router';


store.dispatch(fetchOffersAction());
store.dispatch(checkAuthAction());


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement ,
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
