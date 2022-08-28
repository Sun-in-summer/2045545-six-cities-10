import { createMockOffer } from '../../mock';
import { fetchOffersAction } from '../api-actions';
import {dataProcess, DataProcess} from '../data-process/data-process';


const mockOffers = Array.from({length: 3}, ()=> createMockOffer());

describe('ExtraReducer: data-process', () => {
  let state: DataProcess;

  beforeEach(()=> {
    state = {
      offers: [],
      favoriteOffers: [],
      reviews: [],
      nearByOffers: [],
      selectedOffer : undefined,
      error: null,
      isOffersLoading: false,
      isFavoriteOffersLoading: false,
      isReviewsLoaded: false,
      isReviewSent: false,
      isNearByOffersLoading: false,
      isSelectedOfferLoading : false,
      isErrorLoading: false,
      activeCardId: undefined,
    };
  });

  describe ('fetchOffersAction' , ()=> {
    it ('should return offers if fetchOffers is fulfilled', ()=>
      expect(dataProcess.reducer(state, {type: fetchOffersAction.fulfilled.type, payload: mockOffers}))
        .toEqual({...state, isOffersLoading: false, offers: mockOffers }));
    it ('should return __ if fetchOffers is rejected', ()=>
      expect(dataProcess.reducer(state, {type: fetchOffersAction.rejected.type}))
        .toEqual({...state, isOffersLoading: false}));
  });

});

