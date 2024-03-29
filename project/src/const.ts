import { City } from './types/offer';

const MAX_OFFER_IMAGE_QUANTITY = 6;
const MULTIPLIER_RATING_TO_PERCENTAGE = 20;
const MAP_WIDTH_IN_OFFER = 85;
const DEFAULT_MAP_WIDTH = 100;
const NEAR_ITEMS_QUANTITY = 3;


const URL_MARKER_DEFAULT = 'img/pin.svg';
const URL_MARKER_CURRENT = 'img/pin-active.svg';

const DEFAULT_CITY : City = {
  name: 'Paris',
  location: {
    latitude: 48.85661,
    longitude: 2.351499,
    zoom: 12
  }
};

const CITIES: City[] = [
  {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 12
    }
  },
  {
    name: 'Amsterdam',
    location: {
      latitude: 52.37454,
      longitude: 4.897976,
      zoom: 10
    }
  },
  {
    name: 'Cologne',
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 10
    }
  },
  {
    name: 'Brussels',
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
      zoom: 10
    }
  },
  {
    name: 'Hamburg',
    location: {
      latitude: 53.550341,
      longitude: 10.000654,
      zoom: 10
    }
  },
  {
    name: 'Dusseldorf',
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
      zoom: 10
    }
  }
];

const SORT_OPTIONS = {
  HIGH_TO_LOW: 'Price: high to low',
  LOW_TO_HIGH: 'Price: low to high',
  TOP_RATED: 'Top rated first',
  POPULAR: 'Popular',
};

enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Room = '/offer/:id',
  NotFound = '/not-found'
}


enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

 enum APIRoute {
  Main ='/',
  Offers = '/hotels',
  Offer = 'hotels/:id',
  OffersNearBy = '/hotels/:id/nearby',
  Reviews ='/comments/:id',
  Favorite = '/favorite',
  Login = '/login',
  Logout ='/logout',
}

const RatingTitles = {
  5: 'perfect',
  4: 'good',
  3:'not bad',
  2: 'badly',
  1: 'terribly'
};


export {
  MULTIPLIER_RATING_TO_PERCENTAGE,
  MAX_OFFER_IMAGE_QUANTITY,
  DEFAULT_CITY,
  MAP_WIDTH_IN_OFFER,
  DEFAULT_MAP_WIDTH,
  NEAR_ITEMS_QUANTITY,
  CITIES,
  SORT_OPTIONS,
  URL_MARKER_CURRENT,
  URL_MARKER_DEFAULT,
  RatingTitles,
  APIRoute,
  AppRoute,
  AuthorizationStatus};
