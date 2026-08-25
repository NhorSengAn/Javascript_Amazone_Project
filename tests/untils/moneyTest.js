import { formatCurrency } from "../../scripts/untils/money.js";

describe(" test suite : formatCurrency", () => {
  it("converts cents into dollars", () => {
    expect(formatCurrency(2095)).toEqual("20.95");
  });

  it("work with 0", () => {
    expect(formatCurrency(0)).toEqual("0.00");
  });

  it("rounds up to the nearest cent", () => {
    expect(formatCurrency(2000.5)).toEqual("20.01");
  });
  it("round down to nearest cent", () => {
    expect(formatCurrency(2000.4)).toEqual("20.00");
  });

  it("round down to nearest cent", () => {
    expect(formatCurrency(-500)).toEqual("-5.00");
  });
});
