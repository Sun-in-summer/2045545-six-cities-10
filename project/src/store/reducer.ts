import { createReducer } from '@reduxjs/toolkit';
import { DEFAULT_CITY, SORT_OPTIONS, AuthorizationStatus} from '../const';
import { City, Offer, Offers } from '../types/offer';
import { Reviews } from '../types/reviews';
import {
  setCity,
  setActiveSortOption,
  requireAuthorization,
  loadOffers,
  loadSelectedOffer,
  loadReviews,
  loadNearByOffers,
  setDataLoadedStatus,
  setReviewsLoadedStatus,
  setSelectedOfferLoadedStatus,
  setNearByOffersLoadedStatus,
  setUserEmail,
} from './action';

type InitialState ={
  city: City;
  offers: Offers;
  selectedOffer: Offer | undefined;
  reviews: Reviews;
  nearByOffers: Offers;
  activeSortOption: string;
  authorizationStatus: AuthorizationStatus;
  isDataLoaded: boolean;
  isSelectedOfferLoaded: boolean;
  isReviewsLoaded: boolean;
  isNearByOffersLoaded: boolean;
  error: string | null;
  userEmail: string | undefined;
}

const initialState: InitialState = {
  city: DEFAULT_CITY,
  offers: [],
  selectedOffer: undefined,
  reviews: [],
  nearByOffers: [],
  activeSortOption: SORT_OPTIONS.POPULAR,
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
  isSelectedOfferLoaded: false,
  isReviewsLoaded: false,
  isNearByOffersLoaded: false,
  error: null,
  userEmail: undefined
};


const reducer = createReducer (initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) =>{
      state.city = action.payload;
    })
    .addCase(setActiveSortOption, (state, action) =>{
      state.activeSortOption = action.payload;
    })
    .addCase(loadOffers, (state, action)=> {
      state.offers = action.payload;
    })
    .addCase(loadSelectedOffer, (state, action) =>{
      state.selectedOffer = action.payload;
    })
    .addCase(loadReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(loadNearByOffers, (state, action)=>{
      state.nearByOffers = action.payload;
    })
    .addCase(requireAuthorization, (state, action) =>{
      state.authorizationStatus = action.payload;
    })
    .addCase(setDataLoadedStatus, (state, action)=> {
      state.isDataLoaded = action.payload;
    })
    .addCase(setSelectedOfferLoadedStatus, (state, action) => {
      state.isSelectedOfferLoaded = action.payload;
    })
    .addCase(setReviewsLoadedStatus, (state, action) => {
      state.isReviewsLoaded = action.payload;
    })
    .addCase(setNearByOffersLoadedStatus, (state, action) =>{
      state.isNearByOffersLoaded = action.payload;
    })
    .addCase(setUserEmail, (state, action) =>{
      state.userEmail = action.payload;
    });

});


export {reducer};
