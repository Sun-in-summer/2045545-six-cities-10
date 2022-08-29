import {render, screen} from '@testing-library/react';
import {createMockReview} from '../../mock';
import Feedback from './feedback';

describe('Component: Feedback', () => {
  it('should render correctly', () => {
    const mockReview = createMockReview();
    render(<Feedback review={mockReview} />);

    const nameElement = screen.getByText(mockReview.user.name);
    const textElement = screen.getByText(mockReview.comment);

    expect(nameElement).toBeInTheDocument();
    expect(textElement).toBeInTheDocument();
  });
});
