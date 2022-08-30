import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { generatePath } from 'react-router-dom';
import { APIRoute} from '../const';
import { dropToken, saveToken } from '../services/token';
import { AuthData } from '../types/auth-data';
import { Offer, Offers, OfferStatus } from '../types/offer';
import { FeedbackReview, Reviews } from '../types/reviews';
import { AppDispatch, State } from '../types/state';
import { UserData } from '../types/user-data';
import {
  redirectBack} from './action';
import { updateOffers, updateSelectedOffer, updateNearByOffers, updateFavoriteOffers } from '../store/action';


export const fetchOffersAction = createAsyncThunk<Offers, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchOffers',
  async (_arg, { extra: api}) => {
    const {data} = await api.get<Offers>(APIRoute.Offers);
    return data;
  },
);

export const fetchFavoriteOffersAction = createAsyncThunk<Offers, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchFavoriteOffers',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Offers>(APIRoute.Favorite);
    return data;
  }
);

export const fetchReviewsAction = createAsyncThunk<Reviews, (string | undefined), {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchReviews',
  async (id, { extra: api}) => {
    const {data} = await api.get<Reviews>(generatePath(APIRoute.Reviews, {id}));
    return data;
  }
  );

export const fetchNearByOffersAction = createAsyncThunk<Offers, string |undefined , {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchNearByOffers',
  async (id, { extra: api}) => {
    const {data} = await api.get<Offers>(generatePath(APIRoute.OffersNearBy, {id}));
    return data;
  }
);


export const fetchSelectedOfferAction = createAsyncThunk<Offer, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}> (
  'data/fetchSelectedOffer',
  async(id, { extra: api}) => {
    const {data} = await api.get<Offer>(generatePath(APIRoute.Offer, {id}));
    return data;
  }
);


export const sendReviewAction = createAsyncThunk<Reviews, FeedbackReview, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/sendReview',
  async ({id, comment, rating}, {extra: api}) => {
    const {data} = await api.post<Reviews>(generatePath(APIRoute.Reviews, {id}), {comment, rating});
    return data;
  }
);

export const changeFavoriteStatusAction = createAsyncThunk<Offer, OfferStatus,
 {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/changeFavoriteStatus',
  async({id, status}, {dispatch, extra: api})=>{
    const {data} = await api.post<Offer>(generatePath(APIRoute.FavoriteStatus,{
      id: id.toString(),
      status: Number(status).toString(),
    }));
    dispatch(updateOffers(data as Offer));
    dispatch(updateNearByOffers(data));
    dispatch(updateFavoriteOffers(data));
    dispatch(updateSelectedOffer(data));
    return data;
  }
);


export const checkAuthAction = createAsyncThunk<UserData, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {

    const {data} = await api.get<UserData>(APIRoute.Login);
    if (data) {
      dispatch(fetchFavoriteOffersAction());
    }
    return data;
  },
);

export const loginAction = createAsyncThunk<UserData | null, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {

    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(redirectBack());
    return data;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'use/logout',
  async (_arg, { extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);


