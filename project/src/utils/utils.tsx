import { GroupedOffersByOneCity, Offer, Offers} from '../types/offer';
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

const replaceOffer = (offers: Offers, selectedOffer: Offer) => {
  const index = offers.findIndex((offer) => offer.id === selectedOffer.id);

  const currentOffers = [
    ...offers.slice(0, index),
    selectedOffer,
    ...offers.slice(index + 1),
  ];

  return currentOffers;
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
  replaceOffer
};
