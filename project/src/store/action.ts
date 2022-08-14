import { createAction } from '@reduxjs/toolkit';
import { City, Offer, Offers } from '../types/offer';
import { AuthorizationStatus, AppRoute } from '../const';
import { Reviews } from '../types/reviews';


export const setCity = createAction<City>('main/setCity');

export const setActiveSortOption = createAction<string>('main/setActiveSortOption');

export const loadOffers = createAction<Offers>('data/loadOffers');
export const loadSelectedOffer = createAction<Offer>('data/loadSelectedOffer');
export const loadReviews = createAction<Reviews>('data/loadReviews');
export const loadNearByOffers = createAction<Offers>('data/loadNearByOffers');

export const setDataLoadedStatus = createAction<boolean>('data/setDataLoadedStatus');
export const setSelectedOfferLoadedStatus = createAction<boolean>('data/setSelectedOfferLoadedStatus');
export const setReviewsLoadedStatus = createAction<boolean>('data/setReviewsLoadedStatus');
export const setNearByOffersLoadedStatus = createAction<boolean>('data/setNearByOffersLoadedStatus');


export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
export const setUserEmail = createAction<string> ('user/setUserEmail');
export const redirectToRoute = createAction <AppRoute>('main/redirectToRoute');

