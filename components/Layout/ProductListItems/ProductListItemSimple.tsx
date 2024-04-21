import { ProductListItem, ProductListItemProps } from './ProductListItem'
import { ProductListItemSimpleFragment } from '@graphcommerce/magento-product-simple/ProductListItemSimple.gql'

export type ProductListItemSimpleProps = ProductListItemSimpleFragment & ProductListItemProps

export function ProductListItemSimple(props: ProductListItemSimpleProps) {
  return <ProductListItem {...props} />
}
