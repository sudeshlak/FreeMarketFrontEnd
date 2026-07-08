import '@testing-library/jest-dom';
jest.mock('redux-persist/es/storage', () => ({
    __esModule: true,
    default: {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
    },
  }));