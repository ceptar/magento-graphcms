import { normalizeLocale } from '@graphcommerce/lingui-next'
import { withLingui } from '@graphcommerce/lingui-next/document/withLingui'
import type { LinguiDocumentProps } from '@graphcommerce/lingui-next/document/withLingui'
import { EmotionCacheProps, withEmotionCache } from '@graphcommerce/next-ui'
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'

class Document extends NextDocument<EmotionCacheProps & LinguiDocumentProps> {
  render() {
    return (
      <Html lang={normalizeLocale(this.props.locale)}>
        <Head>
        <link
    rel='stylesheet'
    type='text/css'
    media='all'
    href='http://localhost:3000/fonts/_fonts.css'
  />
          {/* Inject MUI styles first to match with the prepend: true configuration. */}
          <meta name='emotion-insertion-point' content='' />
          {this.props.emotionStyleTags}
          {this.props.linguiScriptTag}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default withEmotionCache(withLingui(Document, (locale) => import(`../locales/${locale}.po`)))
