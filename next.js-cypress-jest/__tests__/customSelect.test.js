/**
 * @jest-environment jsdom
 */

// jest.mock('../usersList');

import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import CustomSelect from '../src/components/Form/CustomSelect'
import userEvent from '@testing-library/user-event'

const label = "My Custom Label";
const errorText = "Please select an user";
const users = [
  { label: 'Alex Dan', value: 1 },
  { label: 'Roger Hebrew', value: 2 },
  { label: 'Martin Fowler', value: 3 },
];

describe('CustomSelect', () => {
  test('loads custom select component', async () => {
    render(<CustomSelect options={users} label={label} error={errorText} onChange={() => console.log('testing')} />)
    const items = await screen.findAllByRole('button')
    expect(items).toHaveLength(3)

    expect(screen.getByLabelText(/Martin/i)).toHaveTextContent('Martin Fowler')
    expect(screen.getByText(label)).toBeInTheDocument()
    expect(screen.getByText(errorText)).toBeInTheDocument()
  })

  it("should update state on click", () => {
    render(<CustomSelect options={users} label={label} error={errorText} onChange={() => console.log('testing')} />)

    userEvent.click(screen.getByText('Roger Hebrew'));

    expect(screen.getByText('Roger Hebrew')).toHaveClass('selected');
  });

});
