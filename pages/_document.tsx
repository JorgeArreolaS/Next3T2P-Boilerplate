import React from 'react'
import Document, { Head, Html, Main, NextScript } from 'next/document'
import { extractCritical } from '@emotion/server'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx)
    const critical = extractCritical(initialProps.html)
    initialProps.html = critical.html
    initialProps.styles = (
      <React.Fragment>
        {initialProps.styles}
        <style
          data-emotion-css={critical.ids.join(' ')}
          dangerouslySetInnerHTML={{ __html: critical.css }}
        />
      </React.Fragment>
    ) as any

    return initialProps
  }

  render(){
    return (
      <Html lang="es" className="dark">
        <Head>

        </Head>
        <body>
          <Main/>
          <NextScript/>
        </body>
      </Html>
    )
  }
}
