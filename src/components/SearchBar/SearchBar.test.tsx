import React from 'react';
import { render } from '@testing-library/react';
import SearchBar from './index';

test('renders SearchBar component', () => {
  const { getByText } = render(<SearchBar />);
  const textElement = getByText(/kotek/i);
  expect(textElement).toBeInTheDocument();
});

