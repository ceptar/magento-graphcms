import { ProductListItemsBase, ProductItemsGridProps } from './ProductListItemsBase'
import { ProductListRenderer } from './ProductListRenderer'

export type ProductListItemsProps = Omit<ProductItemsGridProps, 'renderers'>

export function ProductListItems(props: ProductListItemsProps) {
  return <ProductListItemsBase renderers={ProductListRenderer} {...props} />
}
