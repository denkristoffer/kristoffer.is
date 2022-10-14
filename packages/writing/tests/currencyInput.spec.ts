import { expect, test } from "@playwright/test";

import {
  formatNumberToCurrencyWithFormatter,
  isNumber,
  parseNumber,
} from "../src/components/currencyInput";

test.describe("isNumber", () => {
  test("returns true when given an integer", () => {
    const number = 1234;
    const returnValue = isNumber(number);

    expect(returnValue).toBe(true);
  });

  test("returns true when given a float", () => {
    const number = 12.34;
    const returnValue = isNumber(number);

    expect(returnValue).toBe(true);
  });

  test("returns true when given a negative number", () => {
    const number = -12.34;
    const returnValue = isNumber(number);

    expect(returnValue).toBe(true);
  });

  test("returns false when given a string number", () => {
    const number = "1234";
    const returnValue = isNumber(number);

    expect(returnValue).toBe(false);
  });
});

test.describe("parseNumber", () => {
  test("returns a string with only digits", () => {
    const string = "9.391.573 kr.";
    const digits = parseNumber(string);

    expect(digits).toBe("9391573");
  });

  // @todo
  // test("works with decimals", () => {
  //   const string = "9.391.573,30 kr.";
  //   const digits = parseNumber(string);

  //   expect(digits).toBe("9391573,30");
  // });
});

test.describe("formatNumberToCurrencyWithFormatter", () => {
  test.describe("given a 'en' formatter with GBP", () => {
    test("formats the number", () => {
      const formatter = new Intl.NumberFormat("en", {
        currency: "GBP",
        minimumFractionDigits: 0,
        style: "currency",
      });
      const number = 123_456;
      const currency = formatNumberToCurrencyWithFormatter(formatter, number);

      expect(currency).toBe("£123,456");
    });
  });
});
