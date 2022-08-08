import { createReducer } from '@reduxjs/toolkit';
import { DEFAULT_CITY, SORT_OPTIONS } from '../const';
import { offers } from '../mocks/offers';
import { City, Offers } from '../types/offer';
import { setCity, setActiveSortOption } from './action';

type InitialState ={
  city: City;
  offers: Offers;
  activeSortOption: string;
}

const initialState: InitialState = {
  city: DEFAULT_CITY,
  offers: offers,
  activeSortOption: SORT_OPTIONS.POPULAR
};

const reducer = createReducer (initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) =>{
      state.city = action.payload;
    })
    .addCase(setActiveSortOption, (state, action) =>{
      state.activeSortOption = action.payload;
    });

});


export {reducer};
