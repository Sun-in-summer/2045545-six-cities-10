import {createSlice} from '@reduxjs/toolkit';
import {NameSpace } from '../../const';
import { Offer, Offers } from '../../types/offer';
import { Reviews } from '../../types/reviews';
import {
  fetchFavoriteOffersAction,
  fetchNearByOffersAction,
  fetchOffersAction,
  fetchReviewsAction,
  fetchSelectedOfferAction,
  sendReviewAction
} from '../api-actions';
import {updateSelectedOffer, updateOffers, updateFavoriteOffers, updateNearByOffers, setActiveCardId } from '../action';


export type DataProcess = {
  selectedOffer : Offer | undefined,
  offers: Offers ,
  favoriteOffers: Offers,
  nearByOffers: Offers,
  reviews: Reviews,
  error: string | null,
  isSelectedOfferLoading : boolean,
  isOffersLoading: boolean,
  isFavoriteOffersLoading: boolean,
  isReviewsLoaded: boolean,
  isNearByOffersLoading: boolean
  isReviewSent: boolean,
  isErrorLoading: boolean,
  activeCardId: number | undefined,
  isSendingReviewError: boolean,

};

const initialState: DataProcess = {
  offers: [],
  favoriteOffers: [],
  reviews: [],
  nearByOffers: [],
  selectedOffer : undefined,
  error: null,
  isOffersLoading: false,
  isFavoriteOffersLoading: false,
  isReviewsLoaded: false,
  isReviewSent: false,
  isNearByOffersLoading: false,
  isSelectedOfferLoading : false,
  isErrorLoading: false,
  isSendingReviewError: false,
  activeCardId: undefined,

};

export const dataProcess = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
  },
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
        state.isReviewsLoaded = true;
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
        state.isSendingReviewError = true;
      })
      .addCase(fetchNearByOffersAction.pending, (state)=> {
        state.isNearByOffersLoading = true;
      })
      .addCase(fetchNearByOffersAction.fulfilled, (state, action)=> {
        state.nearByOffers = action.payload;
        state.isNearByOffersLoading = false;
      })
      .addCase(fetchNearByOffersAction.rejected, (state, )=> {
        state.isNearByOffersLoading = false;
      })
      .addCase(fetchSelectedOfferAction.pending, (state)=> {
        state.isSelectedOfferLoading = true;
        state.isErrorLoading = false;
      })
      .addCase(fetchSelectedOfferAction.fulfilled, (state, action)=> {

        state.selectedOffer = action.payload;
        state.isSelectedOfferLoading = false;
      })
      .addCase(fetchSelectedOfferAction.rejected, (state, )=> {
        state.isSelectedOfferLoading = false;
        state.isErrorLoading = true;
      })
      .addCase(updateSelectedOffer, (state, action) => {
        if (state.selectedOffer !== undefined && state.selectedOffer.id === action.payload.id) {
          state.selectedOffer = action.payload;
        }
      })
      .addCase(updateOffers, (state, action) => {
        const index = state.offers.findIndex((offer) => offer.id === action.payload.id);
        const updatedOffers = [
          ...state.offers.slice(0, index),
          action.payload,
          ...state.offers.slice(index + 1)
        ];
        state.offers = updatedOffers;
      })
      .addCase(updateFavoriteOffers, (state, action)=> {

        const updatedFavoriteOffers = state.favoriteOffers.slice();
        const index = updatedFavoriteOffers.findIndex((offer) => offer.id === action.payload.id);
        if(index === -1) {
          updatedFavoriteOffers.push(action.payload);
        } else {
          updatedFavoriteOffers.splice(index, 1);
        }
        state.favoriteOffers = updatedFavoriteOffers;
      })
      .addCase(updateNearByOffers, (state, action) => {

        const index = state.nearByOffers.findIndex((offer) => offer.id === action.payload.id);
        if (index !== -1) {
          const updatedOffers = [
            ...state.nearByOffers.slice(0, index),
            action.payload,
            ...state.nearByOffers.slice(index + 1)
          ];
          state.nearByOffers = updatedOffers;
        }
      })
      .addCase(setActiveCardId, (state, action) =>{
        state.activeCardId = action.payload;
      });


  }
});


