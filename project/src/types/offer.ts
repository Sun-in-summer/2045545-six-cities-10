
type Location = {
  latitude: number,
  longitude: number,
  zoom: number
}

type City = {
  name: string,
  location: Location,
}

type Host = {
  id: number,
  name:string,
  isPro: boolean,
  avatarUrl?: string,
}


type Offer = {
  city:City,
  previewImage: string,
  images?:string[],
  title?: string,
  isFavorite: boolean,
  isPremium: boolean,
  rating?: number,
  type: string,
  bedrooms: number,
  maxAdults: number,
  price: number,
  goods: string[],
  host: Host,
  description?: string,
  location: Location,
  id: number
}

type Offers = Offer[];

export type GroupedOffersByOneCity = {
  [key: string]: Offers;
}

type OfferStatus = {
  id: number,
  status: boolean,
  isFavorite?: boolean,
}

export type {Offer, Offers, City, Location, OfferStatus, Host};

