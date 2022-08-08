import { useState } from 'react';
import {SORT_OPTIONS} from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setActiveSortOption } from '../../store/action';
import SortOption from '../sort-option/sort-option';

function SortOptionsList(): JSX.Element {

  const activeSortOption = useAppSelector((state) => state.activeSortOption);

  const [isOptionsListOpened, setIsOptionsListOpened] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  return (
    <form className="places__sorting" action="#" method="get" onClick ={()=>setIsOptionsListOpened(!isOptionsListOpened)}>
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex= {0} >
        {activeSortOption}
        <svg className="places__sorting-arrow" width="7" height="4" >
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom${isOptionsListOpened ? 'open' : ''} places__options`} >

        { Object.values(SORT_OPTIONS).map((sortOption)=>< SortOption sortOption ={sortOption} key={sortOption} activeSortOption ={activeSortOption} onSortOptionClick ={(option:string)=> dispatch(setActiveSortOption(option))}/>)}

      </ul>
    </form>
  );
}

export default SortOptionsList;
