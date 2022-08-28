import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const';
import {userProcess} from './user-process/user-process';
import { dataProcess } from './data-process/data-process';
import { selectCityProcess } from './select-city-process/select-city-process';
import { selectSortOptionProcess } from './select-sort-option-process/select-sort-option-process';


export const rootReducer = combineReducers({
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Data]: dataProcess.reducer,
  [NameSpace.SelectedCity]: selectCityProcess.reducer,
  [NameSpace.SortOption]: selectSortOptionProcess.reducer,
});
