import { isNothing } from "./is-nothing";

describe("is nothing", () => {
  it("returns true for undefined or null", () => {
    expect(isNothing(null)).toBe(true);
    expect(isNothing(undefined)).toBe(true);
  });

  it("returns false for all other values", () => {
    expect(isNothing("")).toBe(false);
    expect(isNothing(0)).toBe(false);
    expect(isNothing(-0)).toBe(false);
    // @ts-expect-error: compilation target doesn't matter for 0n
    expect(isNothing(0n)).toBe(false);
    expect(isNothing(NaN)).toBe(false);
    expect(isNothing([])).toBe(false);
    expect(isNothing({})).toBe(false);

    expect(isNothing("hello")).toBe(false);
    expect(isNothing(10)).toBe(false);
  });
});
