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
import { toast } from 'react-toastify';


export const fetchOffersAction = createAsyncThunk<Offers, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchOffers',
  async (_arg, { extra: api}) => {
    try {
      const {data} = await api.get<Offers>(APIRoute.Offers);
      return data;
    }
    catch (err) {
      toast.error('The offers are not loaded!');
    }
    throw new Error();

  },
);

export const fetchFavoriteOffersAction = createAsyncThunk<Offers, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchFavoriteOffers',
  async (_arg, { extra: api }) => {
    try {
      const { data } = await api.get<Offers>(APIRoute.Favorite);
      return data;
    } catch {
      toast.warn('Unable to load favorite offers');
    }
    throw new Error();
  }
);

export const fetchReviewsAction = createAsyncThunk<Reviews, (string | undefined), {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchReviews',
  async (id, { extra: api}) => {
    try {
      const {data} = await api.get<Reviews>(generatePath(APIRoute.Reviews, {id}));
      return data;
    } catch {
      toast.warn('Unable to load comments');
    }
    throw new Error();
  }
  );

export const fetchNearByOffersAction = createAsyncThunk<Offers, string |undefined , {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchNearByOffers',
  async (id, { extra: api}) => {
    try {
      const {data} = await api.get<Offers>(generatePath(APIRoute.OffersNearBy, {id}));
      return data;
    } catch {
      toast.warn('Unable to load nearby offers');
    }
    throw new Error();
  }
);


export const fetchSelectedOfferAction = createAsyncThunk<Offer, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}> (
  'data/fetchSelectedOffer',
  async(id, { extra: api}) => {
    try {
      const {data} = await api.get<Offer>(generatePath(APIRoute.Offer, {id}));
      return data;
    } catch {
      toast.warn('Unable to load offer detailed information, please try later');
    }
    throw new Error();
  }
);


export const sendReviewAction = createAsyncThunk<Reviews, FeedbackReview, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/sendReview',
  async ({id, comment, rating}, {extra: api}) => {
    try {
      const {data} = await api.post<Reviews>(generatePath(APIRoute.Reviews, {id}), {comment, rating});
      return data;
    } catch {
      toast.warn('Unable to send comment');
    }
    throw new Error();
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
    try {
      const {data} = await api.post<Offer>(generatePath(APIRoute.FavoriteStatus,{
        id: id.toString(),
        status: Number(status).toString(),
      }));
      dispatch(updateOffers(data as Offer));
      dispatch(updateNearByOffers(data));
      dispatch(updateFavoriteOffers(data));
      dispatch(updateSelectedOffer(data));
      return data;
    } catch {
      toast.warn('Unable to change favorites status');
    }
    throw new Error();
  }
);


export const checkAuthAction = createAsyncThunk<UserData, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<UserData>(APIRoute.Login);
      if (data) {
        dispatch(fetchFavoriteOffersAction());
      }
      return data;
    } catch {
      toast.warn('You are not authorized. Please log in');
    }
    throw new Error();
  },
);

export const loginAction = createAsyncThunk<UserData | null, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    try {
      const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
      saveToken(data.token);
      dispatch(redirectBack());
      return data;
    } catch {
      toast.warn('Unable to login, please try later');
    }
    throw new Error();

  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'use/logout',
  async (_arg, { extra: api}) => {
    try {
      await api.delete(APIRoute.Logout);
      dropToken();
    }
    catch (err) {
      toast.warn('Unable to logout, please try later');
    }
  },
);


