import { NameSpace} from '../../const';
import { City } from '../../types/offer';
import { State } from '../../types/state';


export const getSelectedCity = (state: State): City => state[NameSpace.SelectedCity].selectedCity;
