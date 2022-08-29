import { useAppSelector } from '..';
import { getOffersData } from '../../store/data-process/selector';
import { getSelectedCity } from '../../store/select-city-process/selector';
import { Offers } from '../../types/offer';


function useSelectedCityOffers (): Offers {

  const offers = useAppSelector(getOffersData);
  const selectedCity = useAppSelector(getSelectedCity);
  const selectedCityOffers = offers.filter((offer) => offer.city.name === selectedCity?.name);

  return selectedCityOffers;
}

export default useSelectedCityOffers;
