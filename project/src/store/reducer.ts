import { createReducer } from '@reduxjs/toolkit';
import { DEFAULT_CITY } from '../const';
import { offers } from '../mocks/offers';
import { City, Offers } from '../types/offer';
import { setCity } from './action';

type InitialState ={
  city: City;
  offers: Offers;
}

const initialState: InitialState = {
  city: DEFAULT_CITY,
  offers: offers,
};

const reducer = createReducer (initialState, (builder) => {
  builder.addCase(setCity, (state, action) =>{
    state.city = action.payload;
  });
});


export {reducer};
