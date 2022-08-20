import { NameSpace} from '../../const';
import { Offer } from '../../types/offer';
import { State } from '../../types/state';


export const getSelectedOfferData = (state: State): Offer | undefined => state[NameSpace.SelectedOffer].selectedOffer;
export const getSelectedOfferLoadingStatus = (state: State): boolean => state[NameSpace.SelectedOffer].isSelectedOfferLoaded;
