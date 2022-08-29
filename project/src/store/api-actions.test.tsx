import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../services/api';
import {changeFavoriteStatusAction, checkAuthAction, fetchFavoriteOffersAction, fetchNearByOffersAction, fetchOffersAction, fetchReviewsAction, fetchSelectedOfferAction, loginAction, logoutAction, sendReviewAction} from './api-actions';
import {APIRoute, MIN_TEST_NUMBER, MAX_TEST_NUMBER} from '../const';
import {State} from '../types/state';
import { createMockOffer, createMockReview, createMockFeedbackReview, createMockOfferStatus, createMockAuthData, createMockToken } from '../mock';
import { getRandomId} from '../utils/utils';
import { generatePath } from 'react-router-dom';
import { redirectBack, updateFavoriteOffers, updateNearByOffers, updateOffers, updateSelectedOffer } from './action';
import { AuthData } from '../types/auth-data';
import { OfferStatus } from '../types/offer';

const randomId = getRandomId(MIN_TEST_NUMBER, MAX_TEST_NUMBER);


describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should authorization status is Auth when server return 200', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Login)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      checkAuthAction.pending.type,
      fetchFavoriteOffersAction.pending.type,
      checkAuthAction.fulfilled.type,

    ]);
  });

  it('should dispatch LoadOffers when GET /hotels', async () => {
    const mockOffers = [createMockOffer()];
    mockAPI
      .onGet(APIRoute.Offers)
      .reply(200, mockOffers);

    const store = mockStore();

    await store.dispatch(fetchOffersAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchOffersAction.pending.type,
      fetchOffersAction.fulfilled.type
    ]);
  });

  it('should dispatch LoadSelectedOffer when GET /hotels/:id', async () => {
    const mockOffer = createMockOffer();

    mockAPI
      .onGet(APIRoute.Offer.replace(':id', randomId))
      .reply(200, mockOffer);


    const store = mockStore();

    await store.dispatch(fetchSelectedOfferAction(randomId));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchSelectedOfferAction.pending.type,
      fetchSelectedOfferAction.fulfilled.type
    ]);
  });


  it('should dispatch LoadNearbyOffers when GET /hotels/:id/nearby', async () => {
    const mockNearbyOffers = [createMockOffer()];

    mockAPI
      .onGet(`${APIRoute.Offer.replace(':id', randomId)}/nearby`)
      .reply(200, mockNearbyOffers);

    const store = mockStore();

    await store.dispatch(fetchNearByOffersAction(randomId));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchNearByOffersAction.pending.type,
      fetchNearByOffersAction.fulfilled.type
    ]);
  });

  it('should dispatch LoadFavoritesOffers when GET /favorites', async () => {
    const mockFavoritesOffers = [createMockOffer()];
    mockAPI
      .onGet(APIRoute.Favorite)
      .reply(200, mockFavoritesOffers);

    const store = mockStore();

    await store.dispatch(fetchFavoriteOffersAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchFavoriteOffersAction.pending.type,
      fetchFavoriteOffersAction.fulfilled.type
    ]);
  });

  it('should dispatch LoadReviews when GET /comments/:id', async () => {
    const mockReviews = [createMockReview()];
    mockAPI
      .onGet(APIRoute.Reviews.replace(':id', randomId))
      .reply(200, mockReviews);

    const store = mockStore();

    await store.dispatch(fetchReviewsAction(randomId));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchReviewsAction.pending.type,
      fetchReviewsAction.fulfilled.type
    ]);
  });

  it('should dispatch LoadComment when POST /comments/:id', async () => {
    const mockFeedbackReview = createMockFeedbackReview();

    mockAPI
      .onPost(APIRoute.Reviews.replace(':id', mockFeedbackReview.id as string))
      .reply(200);

    const store = mockStore();

    await store.dispatch(sendReviewAction(mockFeedbackReview));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      sendReviewAction.pending.type,
      sendReviewAction.fulfilled.type
    ]);
  });

  it('should dispatch LoadFavoritesOffer when POST /favorites/:id/status', async () => {
    const mockFavoriteOfferStatus : OfferStatus = createMockOfferStatus();

    mockAPI
      .onPost(generatePath(APIRoute.FavoriteStatus,
        {id: mockFavoriteOfferStatus.id.toString(),
          status: Number(mockFavoriteOfferStatus.status).toString(),
        }))
      .reply(200);


    const store = mockStore();

    await store.dispatch(changeFavoriteStatusAction(mockFavoriteOfferStatus));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      changeFavoriteStatusAction.pending.type,
      updateOffers.type,
      updateNearByOffers.type,
      updateFavoriteOffers.type,
      updateSelectedOffer.type,
      changeFavoriteStatusAction.fulfilled.type
    ]);
  });

  it('should dispatch RequriedAuthorization and RedirectToRoute when POST /login', async () => {
    const mockUser: AuthData = createMockAuthData();
    const mockToken : string = createMockToken();

    mockAPI
      .onPost(APIRoute.Login)
      .reply(200, {token: mockToken});

    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(mockUser));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      loginAction.pending.type,
      redirectBack.type,
      loginAction.fulfilled.type
    ]);

    expect(Storage.prototype.setItem).toBeCalledWith('six-cities-token', mockToken);
  });

  it('should dispatch Logout when  /logout', async () => {
    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(204);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      logoutAction.pending.type,
      logoutAction.fulfilled.type
    ]);


    expect(Storage.prototype.removeItem).toBeCalledWith('six-cities-token');
  });


});
