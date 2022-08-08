
type SortOptionProps = {
  sortOption: string;
  activeSortOption: string;
  onSortOptionClick: (option: string) => void;
}

function SortOption({sortOption, activeSortOption, onSortOptionClick}:SortOptionProps): JSX.Element {


  return (
    <li className={`places__option ${activeSortOption && 'places__option--active'}`} tabIndex={0} onClick = {()=> onSortOptionClick(sortOption)} > {sortOption} </li>
  );
}


export default SortOption;
