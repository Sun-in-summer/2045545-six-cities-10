import { createAction } from '@reduxjs/toolkit';
import { City } from '../types/offer';


export const setCity = createAction<City>('main/setCity');
