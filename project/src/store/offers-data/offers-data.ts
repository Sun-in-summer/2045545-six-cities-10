import {createSlice} from '@reduxjs/toolkit';
import {NameSpace } from '../../const';
import { Offers } from '../../types/offer';
import { fetchOffersAction} from '../api-actions';


type OffersData = {
  offers: Offers ,
  isDataLoaded: boolean;
  error: string | null;
};

const initialState: OffersData = {
  offers: [],
  isDataLoaded: false,
  error: null,
};

export const offersData = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state)=> {
        state.isDataLoaded = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action)=> {
        state.offers = action.payload;
        state.isDataLoaded = false;
      })
      .addCase(fetchOffersAction.rejected, (state, )=> {
        state.isDataLoaded = false;
      });


  }
});
