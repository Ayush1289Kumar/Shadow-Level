// ─────────────────────────────────────────────────────────────────────────────
// setup.ts — Vitest global test setup for Shadow Level
// ─────────────────────────────────────────────────────────────────────────────
import { vi, beforeEach } from "vitest";

// ── localStorage shim ─────────────────────────────────────────────────────────
const store: Record<string, string> = {};

const ls = {
  getItem: (key: string) => store[key] ?? null,
  setItem: (key: string, value: string) => { store[key] = value; },
  removeItem: (key: string) => { delete store[key]; },
  clear: () => { Object.keys(store).forEach((k) => delete store[k]); },
  get length() { return Object.keys(store).length; },
  key: (i: number) => Object.keys(store)[i] ?? null,
};

vi.stubGlobal("localStorage", ls);

// ── Web Crypto shim (SHA-256) ─────────────────────────────────────────────────
vi.stubGlobal("crypto", {
  randomUUID: () => `${Date.now()}-${Math.random().toString(36).slice(2)}`,
  subtle: {
    digest: async (_algo: string, data: BufferSource) => {
      const bytes = new Uint8Array(
        data instanceof ArrayBuffer ? data : (data as any).buffer ?? data,
      );
      const out = new Uint8Array(32);
      bytes.forEach((b, i) => { out[i % 32] ^= b; });
      return out.buffer;
    },
  },
});

// Polyfill TextEncoder if missing
if (typeof globalThis.TextEncoder === "undefined") {
  const { TextEncoder } = await import("util");
  vi.stubGlobal("TextEncoder", TextEncoder);
}

// Clear the store between every test for isolation.
// Do NOT call vi.clearAllMocks() here — that would reset the ls implementations.
beforeEach(() => {
  Object.keys(store).forEach((k) => delete store[k]);
});
