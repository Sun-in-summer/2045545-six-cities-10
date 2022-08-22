import { createAction } from '@reduxjs/toolkit';
import { AppRoute } from '../const';
import {Offer} from '../types/offer';


export const redirectToRoute = createAction <AppRoute>('main/redirectToRoute');

export const updateOffers = createAction<Offer>('main/updateOffers');
export const updateSelectedOffer = createAction<Offer>('main/updateSelectedOffer');
export const updateFavoriteOffers = createAction<Offer>('main/updateFavoriteOffers');
export const updateNearByOffers = createAction<Offer>('main/updateNearByOffers');

