import {createSlice} from '@reduxjs/toolkit';
import {NameSpace } from '../../const';
import { Offer } from '../../types/offer';
import { fetchSelectedOfferAction } from '../api-actions';


type SelectedOfferData = {
  selectedOffer: Offer | undefined ,
  isSelectedOfferLoaded: boolean;
};

const initialState: SelectedOfferData = {
  selectedOffer: undefined,
  isSelectedOfferLoaded: false,
};

export const selectedOfferData = createSlice({
  name: NameSpace.SelectedOffer,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchSelectedOfferAction.pending, (state)=> {
        state.isSelectedOfferLoaded = true;
      })
      .addCase(fetchSelectedOfferAction.fulfilled, (state, action)=> {
        state.selectedOffer = action.payload;
        state.isSelectedOfferLoaded = false;
      })
      .addCase(fetchSelectedOfferAction.rejected, (state, )=> {
        state.isSelectedOfferLoaded = false;
      });


  }
});
