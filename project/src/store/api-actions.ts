import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { generatePath } from 'react-router-dom';
import { APIRoute, AuthorizationStatus, AppRoute} from '../const';
import { dropToken, saveToken } from '../services/token';
import { AuthData } from '../types/auth-data';
import { Offer, Offers, OfferStatus } from '../types/offer';
import { feedbackReview, Reviews } from '../types/reviews';
import { AppDispatch, State } from '../types/state';
import { UserData } from '../types/user-data';
import {
  requireAuthorization,
  redirectToRoute,
  loadOffers,
  loadSelectedOffer,
  loadReviews,
  loadNearByOffers,
  setDataLoadedStatus,
  setReviewsLoadedStatus,
  setSelectedOfferLoadedStatus,
  setNearByOffersLoadedStatus,
  setUserEmail
} from './action';


export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Offers>(APIRoute.Offers);
    dispatch(setDataLoadedStatus(true));
    dispatch(loadOffers(data));
    dispatch(setDataLoadedStatus(false));
  },
);

export const fetchSelectedOffer = createAsyncThunk<void, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}> (
  'data/fetchSelectedOffer',
  async(id, {dispatch, extra: api}) => {
    const {data} = await api.get<Offer>(generatePath(APIRoute.Offer, {id}));
    dispatch(setSelectedOfferLoadedStatus(false));
    dispatch(loadSelectedOffer(data));
    dispatch(setSelectedOfferLoadedStatus(true));
  }
);

export const fetchReviewsAction = createAsyncThunk<void, (string | undefined), {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchReviews',
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.get<Reviews>(generatePath(APIRoute.Reviews, {id}));
    dispatch(setReviewsLoadedStatus(false));
    dispatch(loadReviews(data));
    dispatch(setReviewsLoadedStatus(true));
  }
  );

export const fetchNearByOffersAction = createAsyncThunk<void, string , {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchNearByOffers',
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.get<Offers>(generatePath(APIRoute.OffersNearBy, {id}));
    dispatch(setNearByOffersLoadedStatus(false));
    dispatch(loadNearByOffers(data));
    dispatch(setNearByOffersLoadedStatus(true));
  }
);

export const sendReviewAction = createAsyncThunk<feedbackReview, feedbackReview, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/sendReview',
  async ({id, comment, rating}, {extra: api}) => {
    const {data} = await api.post<feedbackReview>(generatePath(APIRoute.Reviews, {id}), {comment, rating});
    return data;
  }
);

export const addToFavoritesAction = createAsyncThunk<Offer, OfferStatus,
 {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/addToFavorites',
  async({id, status, isFavorite}, {dispatch, extra: api})=>{
    const {data} = await api.post<Offer>(generatePath(APIRoute.FavoriteStatus,{
      id: id.toString(),
      status: status,
    }));

    dispatch(fetchOffersAction());


    return data;
  }
);


export const checkAuthAction = createAsyncThunk<string | void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      const {data: {email}} = await api.get(APIRoute.Login);
      dispatch(setUserEmail(email));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Main));
    dispatch(setUserEmail(email));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'use/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);


