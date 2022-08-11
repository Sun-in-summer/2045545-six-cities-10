import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import App from './components/app/app';
import { AuthorizationStatus } from './const';
import { reviews } from './mocks/reviews';
import {store} from './store';
import { fetchOffersAction, checkAuthAction } from './store/api-actions';

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
      <App

        reviews = {reviews}
      />
    </Provider>
  </React.StrictMode>,
);
