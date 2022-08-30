import { createMockOffer , createMockReview} from '../../mock';
import { fetchFavoriteOffersAction, fetchNearByOffersAction, fetchOffersAction, fetchReviewsAction, fetchSelectedOfferAction, sendReviewAction } from '../api-actions';
import {dataProcess, DataProcess} from '../data-process/data-process';
import {TEST_ELEMENTS_QUANTITY} from '../../const';
import { setActiveCardId, updateFavoriteOffers, updateNearByOffers, updateOffers, updateSelectedOffer } from '../action';
import {changeMockOfferFavoriteStatus, changeOneItem, updateFavorites} from '../../utils/utils';

const mockOffer = createMockOffer();
const mockOffers = Array.from({length: TEST_ELEMENTS_QUANTITY}, ()=> createMockOffer()).concat(mockOffer);
const mockReviews = Array.from ({length: TEST_ELEMENTS_QUANTITY}, () => createMockReview());
const changedFavoriteStatusMockOffer = changeMockOfferFavoriteStatus(mockOffer);

describe('Reducer: data-process', () => {
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
      isSendingReviewError: false
    };
  });


  afterEach(()=>{
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
      isSendingReviewError: false,
    };
  });


  describe ('fetchOffersAction', ()=> {
    it ('should return offers if fetchOffers is fulfilled', ()=>
      expect(dataProcess.reducer(state, {type: fetchOffersAction.fulfilled.type, payload: mockOffers}))
        .toEqual({...state, isOffersLoading: false, offers: mockOffers }));
    it ('should return isOfferLoading false and state must be unchanged if fetchOffers is rejected', ()=>
      expect(dataProcess.reducer(state, {type: fetchOffersAction.rejected.type}))
        .toEqual({...state, isOffersLoading: false}));
    it ('should return isOfferLoading true and state must be unchanged if fetchOffers is pending', ()=>
      expect(dataProcess.reducer(state, {type: fetchOffersAction.pending.type}))
        .toEqual({...state, isOffersLoading: true}));
  });

  describe ('fetchFavoriteOffersAction' , () =>{
    it ('should return favoriveOffers if fetchFavoriteOffers is fulfilled', ()=>
      expect(dataProcess.reducer(state, {type: fetchFavoriteOffersAction.fulfilled.type, payload: mockOffers}))
        .toEqual({...state, isOffersLoading: false, favoriteOffers: mockOffers }));
    it ('should return favoriveOffersLoadingStatus is false and unchanged state if fetchFavoriteOffers is rejected', ()=>
      expect(dataProcess.reducer(state, {type: fetchFavoriteOffersAction.rejected.type}))
        .toEqual({...state, isFavoriteOffersLoading: false}));
    it ('should return favoriveOffersLoadingStatus is true  and unchanged state  if fetchFavoriteOffers is pending', ()=>
      expect(dataProcess.reducer(state, {type: fetchFavoriteOffersAction.pending.type}))
        .toEqual({...state, isFavoriteOffersLoading: true}));
  });

  describe ('fetchNearByOffersAction' , () =>{
    it ('should return nearByOffers if fetchNearByOffersAction is fulfilled', ()=>
      expect(dataProcess.reducer(state, {type: fetchNearByOffersAction.fulfilled.type, payload: mockOffers}))
        .toEqual({...state, isNearByOffersLoading: false, nearByOffers: mockOffers }));
    it ('should return nearByOffersLoadingStatus is false  if fetchNearByOffersAction is rejected', ()=>
      expect(dataProcess.reducer(state, {type: fetchNearByOffersAction.rejected.type}))
        .toEqual({...state, isNearByOffersLoading: false}));
    it ('should return nearByOffersLoadingStatus is true  if fetchNearByOffersAction is pending', ()=>
      expect(dataProcess.reducer(state, {type: fetchNearByOffersAction.pending.type}))
        .toEqual({...state, isNearByOffersLoading: true}));
  });

  describe ('fetchReviewsAction' , () =>{
    it ('should return reviews if fetchReviewsAction is fulfilled', ()=>
      expect(dataProcess.reducer(state, {type: fetchReviewsAction.fulfilled.type, payload: mockReviews}))
        .toEqual({...state, isReviewsLoaded: true, reviews: mockReviews }));
    it ('should return isReviewsLoaded is false  if fetchReviewsAction is rejected', ()=>
      expect(dataProcess.reducer(state, {type: fetchReviewsAction.rejected.type}))
        .toEqual({...state, isReviewsLoaded: false}));
    it ('should return isReviewsLoaded is false  if fetchReviewsAction is pending', ()=>
      expect(dataProcess.reducer(state, {type: fetchReviewsAction.pending.type}))
        .toEqual({...state, isReviewsLoaded: false}));
  });

  describe ('sendReviewAction' , () =>{
    it ('should return reviews if sendReviewAction is fulfilled', ()=>{
      expect(dataProcess.reducer(state, {type: sendReviewAction.fulfilled.type, payload: mockReviews}))
        .toEqual({...state, isReviewSent: true, reviews: mockReviews });
    }
    );
    it ('should return isReviewSent is false  if sendReviewAction is rejected', ()=>
      expect(dataProcess.reducer(state, {type: sendReviewAction.rejected.type}))
        .toEqual({...state, isReviewSent: false, isSendingReviewError: true}));
    it ('should return isReviewsSent is false  if sendReviewAction is pending', ()=>
      expect(dataProcess.reducer(state, {type: sendReviewAction.pending.type}))
        .toEqual({...state, isReviewSent: false}));
  });

  describe('fetchSelectedOfferAction', () =>{
    it ('should return SelectedOffer if fetchSelectedOffer is fulfilled', () =>
      expect(dataProcess.reducer(state, {type: fetchSelectedOfferAction.fulfilled.type, payload: mockOffer}))
        .toEqual({...state, selectedOffer: mockOffer, isSelectedOfferLoading: false}));
    it ('should return isSelectedOfferLoading is false and isErrorLoading is true  if fetchSelectedOffer is rejected', () =>
      expect(dataProcess.reducer(state, {type: fetchSelectedOfferAction.rejected.type}))
        .toEqual({...state, isSelectedOfferLoading: false, isErrorLoading: true}));
    it ('should return isSelectedOfferLoading is true and isErrorLoading is false  if fetchSelectedOffer is pending', () =>
      expect(dataProcess.reducer(state, {type: fetchSelectedOfferAction.pending.type}))
        .toEqual({...state, isSelectedOfferLoading: true, isErrorLoading: false}));
  });

  describe('updateSelectedOffer', ()=> {
    it ('should  return selectedOffer with opposite isFavorite status', () => {
      state.selectedOffer = mockOffer;
      expect(dataProcess.reducer(state, {type: updateSelectedOffer.type, payload: changedFavoriteStatusMockOffer}))
        .toEqual({...state, selectedOffer: changedFavoriteStatusMockOffer});
    });
  });

  describe('updateOffers', ()=> {
    it ('should return offers with 1 offer with opposite isFavorite status', () => {
      state.offers = mockOffers;
      state.selectedOffer = mockOffer;
      const updatedMockOffers = changeOneItem(mockOffers, changedFavoriteStatusMockOffer);
      expect(dataProcess.reducer(state, {type: updateOffers.type, payload: changedFavoriteStatusMockOffer}))
        .toEqual({...state, offers: updatedMockOffers});
    });
  });

  describe('updateNearByOffers', ()=> {
    it ('should return nearByOffers with 1 offer with opposite isFavorite status', () => {
      state.nearByOffers = mockOffers;
      state.selectedOffer = mockOffer;
      const updatedMockOffers = changeOneItem(mockOffers, changedFavoriteStatusMockOffer);
      expect(dataProcess.reducer(state, {type: updateNearByOffers.type, payload: changedFavoriteStatusMockOffer}))
        .toEqual({...state, nearByOffers: updatedMockOffers});
    });
  });

  describe('updateFavoriteOffers', ()=> {
    it ('should return favoriteOffers with 1 offer with opposite isFavorite status', () => {
      state.favoriteOffers = mockOffers;
      state.selectedOffer = mockOffer;
      const updatedFavoriteMockOffers = updateFavorites(mockOffers, changedFavoriteStatusMockOffer);
      expect(dataProcess.reducer(state, {type: updateFavoriteOffers.type, payload: changedFavoriteStatusMockOffer}))
        .toEqual({...state, selectedOffer: mockOffer, favoriteOffers: updatedFavoriteMockOffers});
    });
  });

  describe('setActiveCardId', ()=> {
    it('should return activeCardId', ()=>
      expect(dataProcess.reducer( state, {type: setActiveCardId.type, payload: mockOffer.id}))
        .toEqual({...state, activeCardId: mockOffer.id}));
  });
});


