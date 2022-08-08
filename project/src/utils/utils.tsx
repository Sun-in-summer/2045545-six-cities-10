import { Offer, Offers} from '../types/offer';
import {MULTIPLIER_RATING_TO_PERCENTAGE, SORT_OPTIONS} from '../const';


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


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const groupBy = <T extends Record<string, any>, K extends keyof T>(array: T[], key: K | { (obj: T): string }) => {
  const keyFn = key instanceof Function ? key : (obj: T) => obj[key];
  return array.reduce((objectsByKeyValue, obj) => {
    const value = keyFn(obj);
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
    return objectsByKeyValue;
  }, {} as Record<string, T[]>);};


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


export {
  sortByCity,
  ratingPercentage,
  firstLetterToUpperCase,
  groupBy,
  sortByRating,
  sortPriceHighToLow,
  sortPriceLowToHigh,
  getSortedOffers
};
