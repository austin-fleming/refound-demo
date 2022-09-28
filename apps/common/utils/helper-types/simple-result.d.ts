export type SimpleResult<T> = { ok: false; result: undefined } | { ok: true; result: T };
