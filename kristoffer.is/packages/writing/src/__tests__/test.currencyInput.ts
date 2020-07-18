import {
  formatNumberToCurrencyWithFormatter,
  isNumber,
  parseNumber,
} from "../components/currencyInput";

describe("isNumber", () => {
  it("returns true when given an integer", () => {
    const number = 1234;
    const returnValue = isNumber(number);

    expect(returnValue).toBe(true);
  });

  it("returns true when given a float", () => {
    const number = 12.34;
    const returnValue = isNumber(number);

    expect(returnValue).toBe(true);
  });

  it("returns true when given a negative number", () => {
    const number = -12.34;
    const returnValue = isNumber(number);

    expect(returnValue).toBe(true);
  });

  it("returns false when given a string number", () => {
    const number = "1234";
    const returnValue = isNumber(number);

    expect(returnValue).toBe(false);
  });
});

describe("parseNumber", () => {
  it("returns a string with only digits", () => {
    const string = "9.391.573 kr.";
    const digits = parseNumber(string);

    expect(digits).toBe("9391573");
  });

  // @todo
  // it.skip("works with decimals", () => {
  //   const string = "9.391.573,30 kr.";
  //   const digits = parseNumber(string);

  //   expect(digits).toBe("9391573,30");
  // });
});

describe("formatNumberToCurrencyWithFormatter", () => {
  describe("given a 'en' formatter with GBP", () => {
    it("formats the number", () => {
      const formatter = new Intl.NumberFormat("en", {
        currency: "GBP",
        minimumFractionDigits: 0,
        style: "currency",
      });
      const number = 123456;
      const currency = formatNumberToCurrencyWithFormatter(formatter, number);

      expect(currency).toBe("£123,456");
    });
  });
});
