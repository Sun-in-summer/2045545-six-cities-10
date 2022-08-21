import {createSlice} from '@reduxjs/toolkit';
import {NameSpace } from '../../const';
import { Offer, Offers } from '../../types/offer';
import { Reviews } from '../../types/reviews';
import { changeFavoriteStatusAction, fetchFavoriteOffersAction, fetchNearByOffersAction, fetchOffersAction, fetchReviewsAction, fetchSelectedOfferAction, sendReviewAction} from '../api-actions';
import {updateFavoriteOffers, updateSelectedOffer, updateOffers} from '../action';
import {replaceOffer} from '../../utils/utils';


type DataProcess = {
  offers: Offers ,
  isOffersLoading: boolean,
  error: string | null,
  favoriteOffers: Offers,
  isFavoriteOffersLoading: boolean,
  reviews: Reviews,
  isReviewsLoaded: boolean,
  isReviewSent: boolean,
  nearByOffers: Offers,
  isNearByOffersLoaded: boolean
  selectedOffer : Offer,
  isSelectedOfferLoading : boolean,
};

const initialState: DataProcess = {
  offers: [],
  favoriteOffers: [],
  reviews: [],
  nearByOffers: [],
  selectedOffer : {} as Offer,
  error: null,
  isOffersLoading: false,
  isFavoriteOffersLoading: false,
  isReviewsLoaded: false,
  isReviewSent: false,
  isNearByOffersLoaded: false,
  isSelectedOfferLoading : false,
};

export const dataProcess = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state)=> {
        state.isOffersLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action)=> {
        state.offers = action.payload;
        state.isOffersLoading = false;
      })
      .addCase(fetchOffersAction.rejected, (state, )=> {
        state.isOffersLoading = false;
      })
      .addCase(fetchFavoriteOffersAction.pending, (state)=> {
        state.isFavoriteOffersLoading = true;
      })
      .addCase(fetchFavoriteOffersAction.fulfilled, (state, action)=> {
        state.favoriteOffers = action.payload;
        state.isFavoriteOffersLoading = false;
      })
      .addCase(fetchFavoriteOffersAction.rejected, (state, )=> {
        state.isFavoriteOffersLoading = false;
      })
      .addCase(fetchReviewsAction.pending, (state)=> {
        state.isReviewsLoaded = true;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action)=> {
        state.reviews = action.payload;
        state.isReviewsLoaded = false;
      })
      .addCase(fetchReviewsAction.rejected, (state, )=> {
        state.isReviewsLoaded = false;
      })
      .addCase(sendReviewAction.pending, (state)=> {
        state.isReviewSent = true;
      })
      .addCase(sendReviewAction.fulfilled, (state, action)=> {
        state.reviews = action.payload;
        state.isReviewSent = false;
      })
      .addCase(sendReviewAction.rejected, (state, )=> {
        state.isReviewSent = false;
      })
      .addCase(fetchNearByOffersAction.pending, (state)=> {
        state.isNearByOffersLoaded = true;
      })
      .addCase(fetchNearByOffersAction.fulfilled, (state, action)=> {
        state.nearByOffers = action.payload;
        state.isNearByOffersLoaded = false;
      })
      .addCase(fetchNearByOffersAction.rejected, (state, )=> {
        state.isNearByOffersLoaded = false;
      })
      .addCase(fetchSelectedOfferAction.pending, (state)=> {
        state.isSelectedOfferLoading = true;
      })
      .addCase(fetchSelectedOfferAction.fulfilled, (state, action)=> {
        console.log(action.payload);
        state.selectedOffer = action.payload;
        state.isSelectedOfferLoading = false;
      })
      .addCase(fetchSelectedOfferAction.rejected, (state, )=> {
        state.isSelectedOfferLoading = false;
      })
      .addCase(updateSelectedOffer, (state, action) => {
        console.log('+');
        if (state.selectedOffer !== undefined && state.selectedOffer.id === action.payload.id) {
          state.selectedOffer = action.payload;
        }
      })
      .addCase(updateFavoriteOffers, (state, action) => {
        if (state.isFavoriteOffersLoading) {
          if (action.payload.isFavorite === true) {
            state.favoriteOffers = [...state.favoriteOffers, action.payload];
          } else {
            state.favoriteOffers = state.favoriteOffers.filter((offer) => offer.id !== action.payload.id);
          }
        }
      })
      .addCase(updateOffers, (state, action) => {
        if (state.offers !== undefined && state.isOffersLoading) {
          state.offers = replaceOffer(state.offers, action.payload);
        }
      })
      .addCase(changeFavoriteStatusAction.fulfilled, (state, action) => {

        if (action.payload.isFavorite === true) {
          state.favoriteOffers = [...state.favoriteOffers, action.payload];
        } else {
          state.favoriteOffers = state.favoriteOffers.filter((offer) => offer.id !== action.payload.id);
        }
      });
  }});

