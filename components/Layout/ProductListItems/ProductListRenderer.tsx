import { ProductListItem } from './ProductListItem'
import { ProductListItemRenderer } from './ProductListItemRenderer'
import {
  AddProductsToCartFab
} from '@graphcommerce/magento-product'
import { ProductListItemBundle } from '@graphcommerce/magento-product-bundle'
import { ProductListItemConfigurable } from '@graphcommerce/magento-product-configurable'
import { ProductListItemDownloadable } from '@graphcommerce/magento-product-downloadable'
import { ProductListItemGrouped } from '@graphcommerce/magento-product-grouped'
import { ProductListItemSimple } from './ProductListItemSimple'
import { ProductListItemVirtual } from '@graphcommerce/magento-product-virtual'
import { ProductReviewSummary } from '@graphcommerce/magento-review'
import { ProductWishlistChip } from '@graphcommerce/magento-wishlist'

export const ProductListRenderer: ProductListItemRenderer = {
  Skeleton: (props) => <ProductListItem {...props} aspectRatio={[0.8, 1]} />,
  SimpleProduct: (props) => {
    const { sku } = props
    return (
      <ProductListItemSimple
        {...props}
        aspectRatio={[4, 5]}
        bottomLeft={<ProductReviewSummary {...props} />}
        topRight={<ProductWishlistChip {...props} />}
        bottomRight={<AddProductsToCartFab sku={sku} />}
      />
    )
  },
  ConfigurableProduct: (props) => (
    <ProductListItemConfigurable
      {...props}
      aspectRatio={[4, 5]}
      swatchLocations={{
        topLeft: [],
        topRight: [],
        bottomLeft: [],
        bottomRight: [],
      }}
      bottomLeft={<ProductReviewSummary {...props} />}
      topRight={<ProductWishlistChip {...props} />}
    />
  ),
  BundleProduct: (props) => (
    <ProductListItemBundle
      {...props}
      aspectRatio={[4, 5]}
      bottomLeft={<ProductReviewSummary {...props} />}
      topRight={<ProductWishlistChip {...props} />}
    />
  ),
  VirtualProduct: (props) => {
    const { sku } = props
    return (
      <ProductListItemVirtual
        {...props}
        aspectRatio={[4, 5]}
        bottomLeft={<ProductReviewSummary {...props} />}
        topRight={<ProductWishlistChip {...props} />}
        bottomRight={<AddProductsToCartFab sku={sku} />}
      />
    )
  },
  DownloadableProduct: (props) => (
    <ProductListItemDownloadable
      {...props}
      aspectRatio={[4, 5]}
      bottomLeft={<ProductReviewSummary {...props} />}
      topRight={<ProductWishlistChip {...props} />}
    />
  ),
  GroupedProduct: (props) => (
    <ProductListItemGrouped
      {...props}
      aspectRatio={[4, 5]}
      bottomLeft={<ProductReviewSummary {...props} />}
      topRight={<ProductWishlistChip {...props} />}
    />
  ),
  // // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // // @ts-ignore GiftCardProduct is only available in Commerce
  // GiftCardProduct: (props) => (
  //   <ProductListItem {...props} aspectRatio={[1, 1]} />
  // ),
}
