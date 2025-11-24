import '@testing-library/jest-dom';
import { beforeAll, afterAll, vi } from 'vitest';
import {mockAuctions} from "@data/mockAuctions.ts";

// Ignore specific React Router warning during tests
beforeAll(() => {
  window.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockAuctions),
      } as Response)
  ) as unknown as typeof fetch;
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
  vi.clearAllMocks();
});
