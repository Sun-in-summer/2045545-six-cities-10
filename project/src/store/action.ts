import { createAction } from '@reduxjs/toolkit';
import { City, Offers } from '../types/offer';
import { AuthorizationStatus } from '../const';
import { Reviews } from '../types/reviews';


export const setCity = createAction<City>('main/setCity');

export const setActiveSortOption = createAction<string>('main/setActiveSortOption');

export const loadOffers = createAction<Offers>('data/loadOffers');
export const loadReviews = createAction<Reviews>('data/reviews');
export const setDataLoadedStatus = createAction<boolean>('data/setDataLoadedStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
export const setError = createAction<string | null>('main/setError');
