import { NameSpace} from '../../const';
import { Reviews } from '../../types/reviews';
import { State } from '../../types/state';


export const getReviewsData = (state: State): Reviews => state[NameSpace.Reviews].reviews;
