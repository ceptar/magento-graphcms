import { AddProductsToCartForm } from '@graphcommerce/magento-product'
import { RelatedProductsFragment } from '@graphcommerce/magento-product/components/ProductRelated/RelatedProducts.gql'
import {
  SidebarSlider,
  RenderType,
  responsiveVal,
  SidebarSliderProps,
} from '@graphcommerce/next-ui'
import { Typography } from '@mui/material'
import { productListRenderer } from '../../../Layout/ProductListItems/ProductListRenderer'
import { RowProductFragment } from '../RowProduct.gql'

type RelatedProps = RowProductFragment & RelatedProductsFragment & Pick<SidebarSliderProps, 'sx'>

export function Related(props: RelatedProps) {
  const { title, related_products, sx } = props

  if (!related_products || related_products.length === 0) return null

  return (
    <AddProductsToCartForm>
      <SidebarSlider sx={sx} sidebar={<Typography variant='h2'>{title}</Typography>}>
        {related_products?.map((item) =>
          item ? (
            <RenderType
              key={item.uid ?? ''}
              renderer={productListRenderer}
              sizes={responsiveVal(200, 400)}
              titleComponent='h3'
              {...item}
            />
          ) : null,
        )}
      </SidebarSlider>
    </AddProductsToCartForm>
  )
}
