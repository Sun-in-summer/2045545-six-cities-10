import { createAction } from '@reduxjs/toolkit';
import { AppRoute } from '../const';
import { Offer } from '../types/offer';

export const redirectToRoute = createAction <AppRoute>('main/redirectToRoute');
export const updateSelectedOffer = createAction<Offer>('room/updateCurrentOffer');
export const updateFavoriteOffers = createAction<Offer>('favorite/updateFavoriteOffers');
export const updateOffers = createAction<Offer>('main/updateOffers');

