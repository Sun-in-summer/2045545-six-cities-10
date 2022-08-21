import {createSlice} from '@reduxjs/toolkit';
import {NameSpace } from '../../const';
import { Offer, Offers } from '../../types/offer';
import { Reviews } from '../../types/reviews';
import { fetchFavoriteOffersAction, fetchNearByOffersAction, fetchOffersAction, fetchReviewsAction, fetchSelectedOfferAction, sendReviewAction} from '../api-actions';


type DataProcess = {
  offers: Offers ,
  isOffersLoading: boolean,
  error: string | null,
  favoriteOffers: Offers,
  isFavoriteOffersLoaded: boolean,
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
  isOffersLoading: false,
  error: null,
  favoriteOffers: [],
  isFavoriteOffersLoaded: false,
  reviews: [],
  isReviewsLoaded: false,
  isReviewSent: false,
  nearByOffers: [],
  isNearByOffersLoaded: false,
  selectedOffer : {} as Offer,
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
        state.isFavoriteOffersLoaded = true;
      })
      .addCase(fetchFavoriteOffersAction.fulfilled, (state, action)=> {
        state.favoriteOffers = action.payload;
        state.isFavoriteOffersLoaded = false;
      })
      .addCase(fetchFavoriteOffersAction.rejected, (state, )=> {
        state.isFavoriteOffersLoaded = false;
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
        state.selectedOffer = action.payload;
        state.isSelectedOfferLoading = false;
      })
      .addCase(fetchSelectedOfferAction.rejected, (state, )=> {
        state.isSelectedOfferLoading = false;
      });


  }
});
