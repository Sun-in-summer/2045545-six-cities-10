import {createSlice} from '@reduxjs/toolkit';
import {NameSpace } from '../../const';
import { Offers } from '../../types/offer';
import { fetchNearByOffersAction} from '../api-actions';


type NearByOffersData = {
  nearByOffers: Offers ,
  isNearByOffersLoaded: boolean;
};

const initialState: NearByOffersData = {
  nearByOffers: [],
  isNearByOffersLoaded: false,
};

export const nearByOffersData = createSlice({
  name: NameSpace.NearByOffers,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchNearByOffersAction.pending, (state)=> {
        state.isNearByOffersLoaded = true;
      })
      .addCase(fetchNearByOffersAction.fulfilled, (state, action)=> {
        state.nearByOffers = action.payload;
        state.isNearByOffersLoaded = false;
      })
      .addCase(fetchNearByOffersAction.rejected, (state, )=> {
        state.isNearByOffersLoaded = false;
      });
  }
});
