import { NameSpace} from '../../const';
import { State } from '../../types/state';


export const getActiveSortOption = (state: State): string => state[NameSpace.SortOption].activeSortOption;
