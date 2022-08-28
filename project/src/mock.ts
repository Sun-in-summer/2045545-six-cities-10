import faker from 'faker';
import { City, Host, Location, Offer } from './types/offer';
import { FeedbackReview, Review, User } from './types/reviews';


const createMockLocation = () : Location =>({
  latitude: Number(faker.address.latitude),
  longitude: Number(faker.address.longitude),
  zoom: faker.datatype.number()
});

export const createMockCity = (): City =>({
  name: faker.address.cityName(),
  location: createMockLocation(),
});

const createMockHost = () : Host =>({
  id: faker.datatype.number(),
  name: faker.internet.userName(),
  isPro: faker.datatype.boolean(),
  avatarUrl: faker.internet.url(),
});


export const createMockOffer = () : Offer => ({
  city: createMockCity(),
  previewImage: faker.internet.url(),
  images:[faker.internet.url()],
  title: faker.datatype.string(),
  isFavorite: faker.datatype.boolean(),
  isPremium: faker.datatype.boolean(),
  rating: faker.datatype.number(),
  type: faker.datatype.string(),
  bedrooms: faker.datatype.number(),
  maxAdults: faker.datatype.number(),
  price: faker.datatype.number(),
  goods: [faker.datatype.string()],
  host: createMockHost(),
  description: faker.commerce.productDescription(),
  location: createMockLocation(),
  id: faker.datatype.number(),
});

const createMockUser = (): User=> ({
  avatarUrl: faker.internet.url(),
  id: faker.datatype.number(),
  isPro: faker.datatype.boolean(),
  name: faker.internet.userName(),
});


export const createMockReview = (): Review => ({
  id: faker.datatype.string(),
  comment: faker.datatype.string(),
  date: faker.datatype.string(),
  rating: faker.datatype.number(),
  user: createMockUser(),
});

export const createMockFeedbackReview = () : FeedbackReview=> ({
  id: faker.datatype.string(),
  comment: faker.datatype.string(),
  date: faker.datatype.string(),
  rating: faker.datatype.number(),
});

