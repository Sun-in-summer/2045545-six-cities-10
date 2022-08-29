import {render, screen} from '@testing-library/react';
import OfferGoods from './offer-goods';
import faker from 'faker';

const mockGood1 = faker.datatype.string();
const mockGood2 = faker.datatype.string();
const mockGoods = [mockGood1].concat(mockGood2);

describe('Component: OfferGoods', () => {
  it('should render correctly', () => {
    render(<OfferGoods goods={mockGoods} />);

    const goodsElement = screen.getByText(mockGood1);

    expect(goodsElement).toBeInTheDocument();
  });
});
