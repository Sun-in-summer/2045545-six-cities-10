import react from 'react';

import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import LoadingScreen from './loading-screen';
import { act } from "react-dom/test-utils";


describe('Component: LoadingScreen', () => {
  it('should render LoadingScreen', () => {

    let container = null;
    beforeEach(() => {
      // подготавливаем DOM-элемент, куда будем рендерить
      container = document.createElement("div");
      document.body.appendChild(container);
    });

    act(() => {
    render(<LoadingScreen />, container);
    });


    const h1Element = screen.getByText('Loading...');

    expect(h1Element).toBeInTheDocument();
  });
});
