import { NameSpace} from '../../const';
import { Offers, Offer } from '../../types/offer';
import { Reviews } from '../../types/reviews';
import { State } from '../../types/state';


export const getOffersData = (state: State): Offers => state[NameSpace.Data].offers;
export const getOffersDataLoadingStatus = (state: State): boolean => state[NameSpace.Data].isOffersLoading;
export const getErrorInfo = (state: State) : string | null => state[NameSpace.Data].error;

export const getFavoriteOffersData = (state: State): Offers => state[NameSpace.Data].favoriteOffers;
export const getFavoriteOffersLoadingStatus = (state: State) :boolean => state[NameSpace.Data].isFavoriteOffersLoading;

export const getReviewsData = (state: State): Reviews => state[NameSpace.Data].reviews;
export const getReviewsLoadingStatus = (state: State) : boolean => state[NameSpace.Data].isReviewsLoaded;
export const getNearByOffersData = (state: State): Offers => state[NameSpace.Data].nearByOffers;
export const getNearByOffersLoadingStatus = (state: State) : boolean => state[NameSpace.Data].isNearByOffersLoading;

export const getSelectedOfferData = (state: State): Offer | undefined => state[NameSpace.Data].selectedOffer;
export const getSelectedOfferLoadingStatus = (state: State): boolean => state[NameSpace.Data].isSelectedOfferLoading;
export const getErrorLoadingStatus = (state: State): boolean => state[NameSpace.Data].isErrorLoading;

export const getActiveCardId = (state: State): number | undefined=> state[NameSpace.Data].activeCardId;


