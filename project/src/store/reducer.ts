import { createReducer } from '@reduxjs/toolkit';
import { DEFAULT_CITY } from '../const';
import { offers } from '../mocks/offers';
import { changeCity } from './action';

const initialState = {
  city: DEFAULT_CITY,
  offers: offers,
};
const newCity = {
  name:'Hamburg',
  location:{
    latitude:53.550688,
    longitude: 9.992895,
    zoom:13
  }
};

const reducer = createReducer (initialState, (builder) => {
  builder.addCase(changeCity, (state) =>{
    state.city = newCity;
  });
});


export {reducer};
