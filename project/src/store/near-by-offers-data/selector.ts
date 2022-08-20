import { NameSpace} from '../../const';
import { Offers } from '../../types/offer';
import { State } from '../../types/state';


export const getNearByOffersData = (state: State): Offers => state[NameSpace.NearByOffers].nearByOffers;
