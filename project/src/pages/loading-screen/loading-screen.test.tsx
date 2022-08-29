import {render, screen} from '@testing-library/react';
import LoadingScreen from './loading-screen';

describe('Component: LoadingPage', () => {
  it('should render correctly', () => {


    render(

      <LoadingScreen/>

    );

    const h1Element = screen.getByText('Loading...');

    expect(h1Element).toBeInTheDocument();
  });
});


