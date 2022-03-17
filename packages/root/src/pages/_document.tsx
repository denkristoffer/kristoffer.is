import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

export default class DocumentWithLang extends Document {
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" sizes="32x32" href="/favicon-32.png" />
          <link rel="apple-touch-icon" href="/favicon-180.png" />
          <link rel="mask-icon" href="/favicon.svg" color="#ff6c6c" />
          <link rel="manifest" href="/manifest.webmanifest" />

          <meta
            name="description"
            content="Personal website of Kristoffer Sachse."
          />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
