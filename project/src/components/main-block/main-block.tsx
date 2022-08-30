import CitiesList from '../cities-list/cities-list';
import MainEmpty from '../main-empty/main-empty';
import MainFilled from '../main-filled/main-filled';
import useSelectedCityOffers from '../../hooks/useSelectedCityOffers/useSelectedCityOffers';


function MainBlock(): JSX.Element {


  const selectedCityOffers = useSelectedCityOffers();

  return (
    <main className={`page__main page__main--index ${ selectedCityOffers?.length !== 0 ? '' : 'page__main--index-empty'}`}>
      <h1 className="visually-hidden">Cities</h1>
      < CitiesList />
      <div className="cities">
        {selectedCityOffers.length === 0 ?
          < MainEmpty /> :
          <MainFilled />}
      </div>
    </main>

  );
}

export default MainBlock;
