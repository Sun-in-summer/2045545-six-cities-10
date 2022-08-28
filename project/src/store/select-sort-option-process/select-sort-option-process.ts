import {createSlice} from '@reduxjs/toolkit';
import { NameSpace, SORT_OPTIONS } from '../../const';


export type SelectSortOptionProcess = {
  activeSortOption: string
};

const initialState: SelectSortOptionProcess = {
  activeSortOption: SORT_OPTIONS.POPULAR,

};

export const selectSortOptionProcess = createSlice({
  name: NameSpace.SelectedCity,
  initialState,
  reducers: {
    setActiveSortOption: (state, action) => {
      state.activeSortOption = action.payload;
    },
  },
});

export const {setActiveSortOption} = selectSortOptionProcess.actions;
