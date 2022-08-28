import {createSlice} from '@reduxjs/toolkit';
import {DEFAULT_CITY, NameSpace } from '../../const';
import {City} from '../../types/offer';


export type SelectCityProcess = {
  selectedCity: City;
};

const initialState: SelectCityProcess = {
  selectedCity: DEFAULT_CITY,

};

export const selectCityProcess = createSlice({
  name: NameSpace.SelectedCity,
  initialState,
  reducers: {
    setSelectedCity: (state, action) => {
      state.selectedCity = action.payload;
    },
  },
});

export const {setSelectedCity} = selectCityProcess.actions;
