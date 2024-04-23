import { ProductListItemsBase, ProductItemsGridProps } from './ProductListItemsBase'
import { productListRenderer } from './ProductListRenderer'

export type ProductListItemsProps = Omit<ProductItemsGridProps, 'renderers'>

export function ProductListItems(props: ProductListItemsProps) {
  return <ProductListItemsBase renderers={productListRenderer} {...props} />
}
