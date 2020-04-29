import React from "react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { UrlObject } from "url";

import { A } from "../components/text";

type LinkProps = NextLinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>;

const isUrlObject = (toTest: NextLinkProps["href"]): toTest is UrlObject => {
  return (toTest as UrlObject).path !== undefined;
};

export default function Link({
  href,
  ...props
}: LinkProps): React.ReactElement {
  if (isUrlObject(href) || href.startsWith("/") || href.startsWith("#")) {
    return (
      <NextLink href={href} passHref>
        <A {...props} />
      </NextLink>
    );
  }

  return <A href={href} {...props} />;
}
