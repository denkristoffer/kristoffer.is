import React from "react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";

import { A } from "../components/text";

type NextHref = NextLinkProps["href"];
type UrlObject = Exclude<NextHref, string>;

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: NextHref;
};

const isUrlObject = (toTest: NextHref): toTest is UrlObject => {
  return (toTest as UrlObject).pathname !== undefined;
};

export default function Link({ href, ...props }: LinkProps) {
  if (isUrlObject(href) || href.startsWith("/") || href.startsWith("#")) {
    return (
      <NextLink href={href} passHref>
        <A {...props} />
      </NextLink>
    );
  }

  return <A href={href} {...props} />;
}
