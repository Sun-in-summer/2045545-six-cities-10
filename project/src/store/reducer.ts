import { createReducer } from '@reduxjs/toolkit';
import { DEFAULT_CITY, SORT_OPTIONS, AuthorizationStatus} from '../const';
import { City, Offers } from '../types/offer';
import { setCity, setActiveSortOption, loadOffers, requireAuthorization, setError, setDataLoadedStatus} from './action';

type InitialState ={
  city: City;
  offers: Offers;
  activeSortOption: string;
  authorizationStatus: AuthorizationStatus;
  isDataLoaded: boolean;
  error: string | null;
}

const initialState: InitialState = {
  city: DEFAULT_CITY,
  offers: [],
  activeSortOption: SORT_OPTIONS.POPULAR,
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
  error: null,
};

const reducer = createReducer (initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) =>{
      state.city = action.payload;
    })
    .addCase(setActiveSortOption, (state, action) =>{
      state.activeSortOption = action.payload;
    })
    .addCase(loadOffers, (state, action)=> {
      state.offers = action.payload;
    })
    .addCase(requireAuthorization, (state, action) =>{
      state.authorizationStatus = action.payload;
    })
    .addCase(setDataLoadedStatus, (state, action)=> {
      state.isDataLoaded = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });

});


export {reducer};
