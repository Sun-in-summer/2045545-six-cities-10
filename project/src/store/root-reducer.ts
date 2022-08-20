import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const';
import {userProcess} from './user-process/user-process';
import { offersData } from './offers-data/offers-data';
import { reviewsData } from './reviews-data/reviews-data';
import { nearByOffersData } from './near-by-offers-data/near-by-offers-data';
import { selectCityProcess } from './select-city-process/select-city-process';
import { selectSortOptionProcess } from './select-sort-option-process/select-sort-option-process';
import { selectedOfferData } from './selected-offer-data/selected-offer-data';


export const rootReducer = combineReducers({
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Offers]: offersData.reducer,
  [NameSpace.Reviews]: reviewsData.reducer,
  [NameSpace.NearByOffers]: nearByOffersData.reducer,
  [NameSpace.SelectedCity]: selectCityProcess.reducer,
  [NameSpace.SortOption]: selectSortOptionProcess.reducer,
  [NameSpace.SelectedOffer]: selectedOfferData.reducer,
});
