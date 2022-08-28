import {SelectSortOptionProcess, selectSortOptionProcess, setActiveSortOption} from './select-sort-option-process';
import faker from 'faker';

describe('Reducer: select-sort-option-process', () => {
  let state: SelectSortOptionProcess;

  const mockSortOption = faker.datatype.string();


  it ('should return selectedSortOption if setSortOption is applied', ()=>
    expect(selectSortOptionProcess.reducer(state, {type: setActiveSortOption.type, payload: mockSortOption}))
      .toEqual({...state, activeSortOption: mockSortOption }));
});
