// @ts-check

/**
 * Docs: https://graphcommerce.org/docs/framework/config
 *
 * @type {import('@graphcommerce/next-config/src/generated/config').GraphCommerceConfig}
 */
const config = {
  hygraphEndpoint: 'https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clv429t5k000008k2918u4csw/master',
  magentoEndpoint: 'https://nonotheresnolimit.xyz/graphql',
  canonicalBaseUrl: 'https://discobabes.store/',
  storefront: [
    { locale: 'en', magentoStoreCode: 'default', defaultLocale: true },
  ],
  productFiltersPro: true,
  productFiltersLayout: 'DEFAULT',
  robotsAllow: false,

  demoMode: true,
  limitSsg: true,
  configurableVariantValues: {
    url: true,
    gallery: true,
    content: true,
  },
}

module.exports = config
