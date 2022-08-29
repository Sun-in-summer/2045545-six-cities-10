import { GroupedOffersByOneCity, Offer, Offers} from '../types/offer';
import {MAX_COMMENTS_QUANTITY, MULTIPLIER_RATING_TO_PERCENTAGE, SORT_OPTIONS} from '../const';
import { Review, Reviews } from '../types/reviews';


const sortByCity = (offerA: Offer, offerB: Offer) : number =>{
  if (offerA.city.name >= offerB.city.name){
    return 1;
  }
  else {
    return -1;
  }
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
  offers.slice().reduce<GroupedOffersByOneCity>((acc, offer ) => {
    if (!Object.hasOwn(acc, offer.city.name)) {
      acc[offer.city.name] = [];
    }
    acc[offer.city.name].push(offer);
    return acc;
  }, {});


const sortPriceLowToHigh = (offerA: Offer, offerB: Offer) : number => {
  if (offerA.price >= offerB.price){
    return 1;
  }
  else {
    return -1;
  }
};

const sortPriceHighToLow = (offerA: Offer, offerB: Offer) : number => {
  if (offerA.price >= offerB.price){
    return -1;
  }
  else {
    return 1;
  }
};


const sortByRating = (offerA: Offer, offerB: Offer) : number => {
  if ((offerA.rating && offerB.rating) && (offerA.rating <= offerB.rating)){
    return 1;
  }
  else {
    return -1;
  }
};

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
  getRandomId
};
