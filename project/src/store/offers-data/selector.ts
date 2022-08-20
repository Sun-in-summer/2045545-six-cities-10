import { NameSpace} from '../../const';
import { Offers } from '../../types/offer';
import { State } from '../../types/state';


export const getOffersData = (state: State): Offers => state[NameSpace.Offers].offers;
export const getOffersDataLoadingStatus = (state: State): boolean => state[NameSpace.Offers].isDataLoaded;
export const getErrorInfo = (state: State) : string | null => state[NameSpace.Offers].error;

