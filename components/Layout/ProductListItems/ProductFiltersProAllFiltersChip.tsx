import controlsAltIconTitle from './controls-alt.svg'
import { IconSvg } from '@graphcommerce/next-ui'
import { ChipOverlayOrPopper, ChipOverlayOrPopperProps } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { ProductFilterEqualSection } from '@graphcommerce/magento-product/components/ProductFiltersPro//ProductFilterEqualSection'
import { ProductFilterRangeSection } from '@graphcommerce/magento-product/components/ProductFiltersPro/ProductFilterRangeSection'
import { useProductFiltersPro } from '@graphcommerce/magento-product/components/ProductFiltersPro'

import {
  ProductFiltersProAggregations,
  ProductFiltersProAggregationsProps,
} from '@graphcommerce/magento-product/components/ProductFiltersPro/ProductFiltersProAggregations'
import { ProductFiltersProLimitSection } from '@graphcommerce/magento-product/components/ProductFiltersPro'
import {
  ProductFiltersProSortSection,
  ProductFiltersProSortSectionProps,
} from '@graphcommerce/magento-product/components/ProductFiltersPro/ProductFiltersProSortSection'
import { activeAggregations } from '@graphcommerce/magento-product/components/ProductFiltersPro//activeAggregations'
import { applyAggregationCount } from '@graphcommerce/magento-product/components/ProductFiltersPro//applyAggregationCount'
import { useClearAllFiltersAction } from '@graphcommerce/magento-product/components/ProductFiltersPro//useClearAllFiltersHandler'

export type ProductFiltersProAllFiltersChipProps = ProductFiltersProAggregationsProps &
  ProductFiltersProSortSectionProps &
  Omit<
    ChipOverlayOrPopperProps,
    'label' | 'selected' | 'selectedLabel' | 'onApply' | 'onReset' | 'onClose' | 'children'
  >

const defaultRenderer = {
  FilterRangeTypeInput: ProductFilterRangeSection,
  FilterEqualTypeInput: ProductFilterEqualSection,
}

export function ProductFiltersProAllFiltersChip(props: ProductFiltersProAllFiltersChipProps) {
  const { sort_fields, total_count, renderer, ...rest } = props

  const { submit, params, aggregations, appliedAggregations } = useProductFiltersPro()
  const { sort } = params

  const activeFilters = activeAggregations(
    applyAggregationCount(aggregations, appliedAggregations, params),
    params,
  ).map(({ label }) => label)

  const allFilters = [...activeFilters, sort].filter(Boolean)
  const hasFilters = allFilters.length > 0

  const clearAll = useClearAllFiltersAction()

  return (
    <ChipOverlayOrPopper
      label={<IconSvg src={controlsAltIconTitle} size='large' />}
      chipProps={{ variant: 'outlined' }}
      onApply={submit}
      onReset={hasFilters ? clearAll : undefined}
      onClose={submit}
      selectedLabel={allFilters}
      selected={hasFilters}
      breakpoint={false}
      overlayProps={{ variantMd: 'right', widthMd: '500px' }}
      {...rest}
    >
      {() => (
        <>
          <ProductFiltersProSortSection sort_fields={sort_fields} total_count={total_count} />
          <ProductFiltersProLimitSection />
          <ProductFiltersProAggregations renderer={{ ...defaultRenderer, ...renderer }} />
        </>
      )}
    </ChipOverlayOrPopper>
  )
}
