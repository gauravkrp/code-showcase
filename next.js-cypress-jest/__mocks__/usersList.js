/* eslint-disable import/no-anonymous-default-export */

const users = [
  { label: 'Alex Dan', value: 1 },
  { label: 'Roger Hebrew', value: 2 },
  { label: 'Martin Fowler', value: 3 },
];

export default {
  getUsers: jest.fn(() => Promise.resolve({ data: {} }))
};
