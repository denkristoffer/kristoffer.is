import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { extractCritical } from "@emotion/server";
import type { EmotionCritical } from "@emotion/server/create-instance";

interface DocumentProps {
  css: EmotionCritical["css"];
  ids: EmotionCritical["ids"];
}

export default class DocumentWithLang extends Document<DocumentProps> {
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <style
            data-emotion-css={this.props.ids.join(" ")}
            dangerouslySetInnerHTML={{ __html: this.props.css }}
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

DocumentWithLang.getInitialProps = async (context) => {
  const initialProps = await Document.getInitialProps(context);
  const page = await context.renderPage();
  const styles = extractCritical(page.html);

  return { ...initialProps, ...page, ...styles };
};
