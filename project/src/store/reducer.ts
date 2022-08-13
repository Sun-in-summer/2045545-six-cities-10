import { createReducer } from '@reduxjs/toolkit';
import { DEFAULT_CITY, SORT_OPTIONS, AuthorizationStatus} from '../const';
import { City, Offer, Offers } from '../types/offer';
import { Reviews } from '../types/reviews';
import { setCity, setActiveSortOption, loadOffers, requireAuthorization, setDataLoadedStatus, loadSelectedOffer, loadReviews, setReviewsLoadedStatus, setSelectedOfferLoadedStatus} from './action';

type InitialState ={
  city: City;
  offers: Offers;
  selectedOffer: Offer | undefined;
  reviews: Reviews;
  activeSortOption: string;
  authorizationStatus: AuthorizationStatus;
  isDataLoaded: boolean;
  isSelectedOfferLoaded: boolean;
  isReviewsLoaded: boolean;
  error: string | null;
}

const initialState: InitialState = {
  city: DEFAULT_CITY,
  offers: [],
  selectedOffer: undefined,
  reviews: [],
  activeSortOption: SORT_OPTIONS.POPULAR,
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
  isSelectedOfferLoaded: false,
  isReviewsLoaded: false,
  error: null,
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
    });

});


export {reducer};
