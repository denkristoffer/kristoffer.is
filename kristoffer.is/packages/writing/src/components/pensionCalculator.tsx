/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";
import { useCallback, useState } from "react";

import { Text } from "./text";
import CurrencyInput from "./currencyInput";

const ARBEJDSMARKEDSBIDRAG = 0.08;
const YEARLY_TOPSKAT_LIMIT = 531000;
const YEARLY_RATEPENSION_LIMIT = 57200;

const formatter = Intl.NumberFormat("da-DK", {
  currency: "DKK",
  minimumFractionDigits: 0,
  style: "currency",
});

const pensionPaymentFromWage = (monthlyWage: number): number => {
  const yearlyWage = monthlyWage * 12;
  const yearlyWageAfterArbejdsmarkedsbidrag =
    yearlyWage - yearlyWage * ARBEJDSMARKEDSBIDRAG;

  if (yearlyWageAfterArbejdsmarkedsbidrag < YEARLY_TOPSKAT_LIMIT) {
    return 0;
  }

  const difference = Math.abs(
    yearlyWageAfterArbejdsmarkedsbidrag - YEARLY_TOPSKAT_LIMIT,
  );
  const yearlyPensionPaymentUpToLimit = Math.min(
    difference,
    YEARLY_RATEPENSION_LIMIT,
  );

  return yearlyPensionPaymentUpToLimit;
};

const monthlyPensionPayment = (monthlyWage: number): number => {
  return pensionPaymentFromWage(monthlyWage) / 12;
};

const TextSpan = styled(Text.withComponent("span"))`
  padding: 4px 8px;
`;

export default function PensionCalculator(): React.ReactElement {
  const [monthlyWage, setMonthlyWage] = useState<number | undefined>();
  const active = monthlyWage ? monthlyWage.toString().length > 0 : "";
  const pensionPayment = active
    ? formatter.format(monthlyPensionPayment(monthlyWage))
    : "0 kr.";
  console.log("monthlyWage", monthlyWage);
  console.log("active", active);
  console.log("pensionPayment", pensionPayment);
  const handleValueChange = useCallback(
    (value: string) => {
      const number = Number.parseFloat(value);
      setMonthlyWage(number);
    },
    [setMonthlyWage],
  );

  return (
    <>
      <Text>
        Er du i tvivl om du bør indbetale til ratepensionen? Udregn din
        månedlige indbetaling ved at indtaste din månedsløn før skat (men efter
        pensionsindbetalinger)
      </Text>

      <div
        css={css`
          align-items: stretch;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          margin-top: 25px;
          padding: 0 20px;
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: row;
            flex-wrap: no-wrap;
          `}
        >
          <div>
            <div
              css={(theme) => css`
                position: relative;

                input + div::after {
                  background: ${theme.components.input.primary.color};
                  bottom: 0;
                  content: "";
                  display: block;
                  height: 2px;
                  left: 0;
                  position: absolute;
                  transition: width 150ms ease-out;
                  width: 0;

                  @media (prefers-color-scheme: dark) {
                    background: ${theme.dark.color};
                  }
                }

                input:focus + div::after,
                input:not(:placeholder-shown) + div::after {
                  width: 100%;
                }
              `}
            >
              <CurrencyInput
                css={(theme) => css`
                  -moz-appearance: textfield;
                  border: 0;
                  border-bottom-style: dashed;
                  border-bottom-width: 2px;
                  border-color: ${theme.components.input.primary.color};
                  color: ${active
                    ? theme.components.input.primary.color
                    : theme.components.input.primary.placeholder};
                  font-size: 26px;
                  transition: color 300ms ease-in-out;
                  width: 240px;

                  @media (prefers-color-scheme: dark) {
                    border-color: ${theme.dark.color};
                    color: ${active
                      ? theme.dark.color
                      : theme.components.input.primary.placeholder};
                  }

                  &::-webkit-inner-spin-button,
                  &::-webkit-outer-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                  }
                `}
                data-test="currencyInput"
                id="monthlyWage"
                maxLength={7}
                numberFormat={formatter}
                onChange={handleValueChange}
                placeholder="30.000 kr. / md."
                suffix=" / md."
              />
              <div />
            </div>
            <label htmlFor="monthlyWage">
              <TextSpan>Månedsløn før skat</TextSpan>
            </label>
          </div>
          <div
            css={(theme) => css`
              align-self: center;
              color: ${active
                ? theme.components.input.primary.color
                : theme.components.input.primary.placeholder};
              margin: 0 15px;
              padding: 0;
              transition: color 300ms ease-in-out;

              @media (prefers-color-scheme: dark) {
                color: ${active
                  ? theme.dark.color
                  : theme.components.input.primary.placeholder};
              }
            `}
          >
            =
          </div>
        </div>

        <div>
          <div
            css={(theme) => css`
              border-bottom: 2px solid
                ${active
                  ? theme.components.input.primary.color
                  : theme.components.input.primary.placeholder};
              color: ${active
                ? theme.components.input.primary.color
                : theme.components.input.primary.placeholder};
              font-size: 26px;
              padding: 4px 8px;
              transition: color 300ms ease-in-out,
                border-color 300ms ease-in-out;

              @media (prefers-color-scheme: dark) {
                border-color: ${active
                  ? theme.dark.color
                  : theme.components.input.primary.placeholder};
                color: ${active
                  ? theme.dark.color
                  : theme.components.input.primary.placeholder};
              }
            `}
          >
            {pensionPayment} / md.
          </div>

          <TextSpan
            css={(theme) => css`
              color: ${active
                ? theme.components.input.primary.color
                : theme.components.input.primary.placeholder};
              transition: color 300ms ease-in-out;

              @media (prefers-color-scheme: dark) {
                color: ${active
                  ? theme.dark.color
                  : theme.components.input.primary.placeholder};
              }
            `}
          >
            Månedlig indbetaling
          </TextSpan>
        </div>
      </div>
    </>
  );
}
