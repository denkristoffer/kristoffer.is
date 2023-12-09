"use client";

import Image from "next/image";
import { useRouter } from "next/router";
import { css } from "@emotion/react";

export default function Pageview() {
  const { pathname } = useRouter();

  return typeof window !== "undefined" &&
    window.location.host === "kristoffer.is" ? (
    <div
      css={css`
        height: 0;
        width: 0;
      `}
    >
      <Image
        alt=""
        height={0}
        src={`https://kristoffer.goatcounter.com/count?p=${pathname}`}
        width={0}
        unoptimized
      />
    </div>
  ) : null;
}
