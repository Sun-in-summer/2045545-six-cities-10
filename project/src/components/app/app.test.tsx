import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AuthorizationStatus, AppRoute, DEFAULT_CITY, SORT_OPTIONS} from '../../const';
import {createMockOffer, createMockReview} from '../../mock';
import HistoryRouter from '../history-router/history-router';
import App from './app';
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);
const mockOffer = createMockOffer();
const mockReview = createMockReview();

const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.Auth},
  DATA: {
    offers: [mockOffer],
    isDataLoaded: false,
    offer: mockOffer,
    nearbyOffers: [],
    comments: [mockReview],
    favoritesOffers: [mockOffer],
  },
  OFFERS: {
    city: DEFAULT_CITY.name,
    sortItem: SORT_OPTIONS.POPULAR,
  },
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "MainScreen" when user navigate to "/"', () => {
    history.push(AppRoute.Main);

    render(fakeApp);

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
  });

  it('should render "LoginScreen" when user navigate to "/login"', () => {
    history.push(AppRoute.Login);

    render(fakeApp);

    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  });


  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    history.push(AppRoute.NotFound);

    render(fakeApp);

    expect(screen.getByText('Page not found')).toBeInTheDocument();
    expect(screen.getByText('Return to the homepage')).toBeInTheDocument();
  });
});


