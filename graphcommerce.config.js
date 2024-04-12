// @ts-check

/**
 * Docs: https://graphcommerce.org/docs/framework/config
 *
 * @type {import('@graphcommerce/next-config/src/generated/config').GraphCommerceConfig}
 */
const config = {
  hygraphEndpoint: 'https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clumfpeo7000008ky4q0ecrju/master',
  magentoEndpoint: 'https://nonotheresnolimit.xyz/graphql',
  canonicalBaseUrl: 'https://disco-main.vercel.app',
  storefront: [
    { locale: 'en', magentoStoreCode: 'default', defaultLocale: true },
  ],
}

module.exports = config
