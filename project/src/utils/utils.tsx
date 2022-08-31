import { GroupedOffersByOneCity, Offer, Offers} from '../types/offer';
import {MAX_COMMENTS_QUANTITY, MULTIPLIER_RATING_TO_PERCENTAGE, SORT_OPTIONS} from '../const';
import { Review, Reviews } from '../types/reviews';


const sortByCity = (offerA: Offer, offerB: Offer) : number =>{
  if (offerA.city.name >= offerB.city.name){
    return 1;
  }
  return -1;
};

const ratingPercentage = (ratingInStars: number | undefined | null) : number =>{
  if (ratingInStars === undefined || ratingInStars === null) {
    return 0;
  }
  return ratingInStars * MULTIPLIER_RATING_TO_PERCENTAGE;
};

const firstLetterToUpperCase = ( word: string | null) : string | null => {
  if (!word) {
    return word;
  }
  return word[0].toUpperCase() + word.slice(1);
};


const groupByCity = (offers: Offers): GroupedOffersByOneCity =>
  offers?.slice().reduce<GroupedOffersByOneCity>((acc, offer ) => {
    if (!Object.hasOwn(acc, offer.city.name)) {
      acc[offer.city.name] = [];
    }
    acc[offer.city.name].push(offer);
    return acc;
  }, {});


const sortPriceLowToHigh = (offerA: Offer, offerB: Offer) : number => offerA.price - offerB.price;

const sortPriceHighToLow = (offerA: Offer, offerB: Offer) : number => offerB.price - offerA.price;


const sortByRating = (offerA: Offer, offerB: Offer) : number => offerB.rating - offerA.rating ;


const getSortedOffers = (sortOption: string, offers: Offers): Offers => {
  switch (sortOption) {
    case SORT_OPTIONS.HIGH_TO_LOW:
      return offers.sort(sortPriceHighToLow);
    case SORT_OPTIONS.LOW_TO_HIGH:
      return offers.sort(sortPriceLowToHigh);
    case SORT_OPTIONS.TOP_RATED:
      return offers.sort(sortByRating);
    case SORT_OPTIONS.POPULAR:
      return offers;
    default:
      return offers;
  }
};


const compareDates = (reviewA: Review, reviewB: Review) => {
  const rankA = reviewA.date ? + new Date(reviewA.date) : 0;
  const rankB = reviewB.date ? + new Date(reviewB?.date) : 0 ;
  return rankB - rankA;
};

const sortReviews = (reviews : Reviews): Reviews=> {
  const sortedReviews = reviews.slice().sort(compareDates).slice(0, MAX_COMMENTS_QUANTITY);
  return sortedReviews;
};

const changeMockOfferFavoriteStatus = (offer : Offer ) : Offer=> {
  const value = offer.isFavorite;
  return ({...offer, isFavorite: !value});
};
const updateFavoriteStatusValue = (offer: Offer, changedFavoriteStatusMockOffer: Offer) : Offer =>{
  if ( offer.id === changedFavoriteStatusMockOffer.id) {
    return changedFavoriteStatusMockOffer;
  }
  return offer;
};


const changeOneItem = ( mockOffers: Offers, changedFavoriteStatusMockOffer: Offer): Offers => {
  const updatedMockOffers = mockOffers.map((offer) => updateFavoriteStatusValue(offer, changedFavoriteStatusMockOffer));
  return updatedMockOffers;
};

const updateFavorites = ( mockOffers: Offers, changedFavoriteStatusMockOffer: Offer): Offers => {
  const updatedFavoriteOffers = mockOffers.slice();
  const index = updatedFavoriteOffers.findIndex((offer) => offer.id === changedFavoriteStatusMockOffer.id);
  if(index === -1) {
    updatedFavoriteOffers.push(changedFavoriteStatusMockOffer);
  } else {
    updatedFavoriteOffers.splice(index, 1);
  }
  return updatedFavoriteOffers;
};

const getRandomId = (min: number, max: number): string => {

  const randomId = Math.floor((Math.random() * (max - min) + min)).toString();
  return randomId;
};


const validateLoginForm = (email: HTMLInputElement, password: HTMLInputElement) => {
  const validPassword = /^.*(?=.{1,})(?=.*[a-zA-Z])(?=.*\d)/;
  const validLogin = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return !!(password.value.match(validPassword) && email.value.match(validLogin));
};


export {
  sortByCity,
  ratingPercentage,
  firstLetterToUpperCase,
  sortByRating,
  sortPriceHighToLow,
  sortPriceLowToHigh,
  getSortedOffers,
  groupByCity,
  sortReviews,
  changeMockOfferFavoriteStatus,
  changeOneItem,
  updateFavorites,
  getRandomId,
  validateLoginForm
};
