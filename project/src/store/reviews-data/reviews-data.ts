import {createSlice} from '@reduxjs/toolkit';
import {NameSpace } from '../../const';
import { Reviews } from '../../types/reviews';
import { fetchReviewsAction, sendReviewAction } from '../api-actions';


type ReviewsData = {
  reviews: Reviews ,
  isReviewsLoaded: boolean;
  isReviewSent: boolean,
};

const initialState: ReviewsData = {
  reviews: [],
  isReviewsLoaded: false,
  isReviewSent: false,

};

export const reviewsData = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
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
      });
  }
});
