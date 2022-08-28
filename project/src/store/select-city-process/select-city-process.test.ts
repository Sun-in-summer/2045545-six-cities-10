import {selectCityProcess, SelectCityProcess, setSelectedCity} from './select-city-process';
import {createMockCity} from '../../mock';

describe('Reducer: select-city-process', () => {
  let state: SelectCityProcess;

  const mockCity = createMockCity();


  it ('should return selectedCity if setSelectedCity is applied', ()=>
    expect(selectCityProcess.reducer(state, {type: setSelectedCity.type, payload: mockCity}))
      .toEqual({...state, selectedCity: mockCity }));
});
