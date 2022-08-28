import Header from '../../components/header/header';
import MainBlock from '../../components/main-block/main-block';


function MainScreen(): JSX.Element {


  return (
    <div className="page page--gray page--main">
      <Header />
      <MainBlock />
    </div>
  );
}

export default MainScreen;
