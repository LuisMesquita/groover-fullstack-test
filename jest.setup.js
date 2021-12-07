
import '@testing-library/jest-dom';
import { server } from './mockServer/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

jest.mock('./src/components/ErrorBoundary', () => {
  const ErrorBoundary = (props) => props.children;
  return { ErrorBoundary };
});



