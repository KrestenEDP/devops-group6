import '@testing-library/jest-dom';
import { beforeAll, afterAll, vi } from 'vitest';

// Ignore specific React Router warning during tests
beforeAll(() => {
  vi.spyOn(console, 'warn').mockImplementation((msg, ...args) => {
    if (
      typeof msg === 'string' &&
      msg.includes('Relative route resolution within Splat routes')
    ) {
      return; // ignore
    }
    console.warn(msg, ...args);
  });
});

afterAll(() => {
  vi.restoreAllMocks();
});
