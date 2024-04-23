import {
  ProductFiltersPro,
  ProductFiltersProAllFiltersChip,
  ProductFiltersProAllFiltersSidebar,
  ProductFiltersProClearAll,
  ProductListCount,
  ProductListFilters,
  ProductListPagination,
  ProductListParamsProvider,
  ProductListSort,
} from '@graphcommerce/magento-search'

import { Container } from '@mui/material'
import { ProductListFilterLayoutProps } from './CategoryFilterLayout'
import { ProductFiltersProLayoutSidebar } from './ProductFiltersProLayoutSidebar'
import { ProductListFiltersContainer } from './ProductListFiltersContainer'

import { ProductListItemsBase } from './ProductListItemsBase'

import { StickyBelowHeader } from './StickyBelowHeader'
import { ProductListRenderer } from './ProductListRenderer'

export function SearchFilterLayout(props: ProductListFilterLayoutProps) {
  const { params, filters, products, filterTypes, title, id } = props

  if (!(params && products?.items && filterTypes)) return null

  const { total_count, sort_fields, page_info } = products

  const items = (
    <ProductListItemsBase
      renderers={ProductListRenderer}
      items={products.items}
      loadingEager={6}
      title={title}
    />
  )

  if (import.meta.graphCommerce.productFiltersPro) {
    const horizontalFilters = (
      <ProductListFiltersContainer>
        {/* <ProductFiltersProFilterChips />
        <ProductFiltersProSortChip total_count={total_count} sort_fields={sort_fields} />
        <ProductFiltersProLimitChip /> */}
        <ProductFiltersProAllFiltersChip total_count={total_count} sort_fields={sort_fields} />
      </ProductListFiltersContainer>
    )

    return (
      <ProductFiltersPro
        key={id}
        params={params}
        aggregations={filters?.aggregations}
        appliedAggregations={products?.aggregations}
        filterTypes={filterTypes}
      >
        {import.meta.graphCommerce.productFiltersLayout === 'DEFAULT' ? (
          <ProductFiltersProLayoutSidebar
            clearAll={<ProductFiltersProClearAll />}
            horizontalFilters={horizontalFilters}
            sidebarFilters={
              <ProductFiltersProAllFiltersSidebar
                total_count={total_count}
                sort_fields={sort_fields}
              />
            }
            count={<ProductListCount total_count={total_count} />}
            pagination={<ProductListPagination page_info={page_info} params={params} />}
            items={items}
          />
        ) : (
          <>
            <StickyBelowHeader>{horizontalFilters}</StickyBelowHeader>
            <Container>
              <ProductListCount total_count={total_count} />
              {items}
              <ProductListPagination page_info={page_info} params={params} />
            </Container>
          </>
        )}
      </ProductFiltersPro>
    )
  }

  if (!import.meta.graphCommerce.productFiltersPro) {
    return (
      <>
        <StickyBelowHeader>
          <ProductListParamsProvider value={params}>
            <ProductListFiltersContainer>
              <ProductListSort sort_fields={sort_fields} total_count={total_count} />
              <ProductListFilters {...filters} filterTypes={filterTypes} />
            </ProductListFiltersContainer>
          </ProductListParamsProvider>
        </StickyBelowHeader>
        <Container>
          <ProductListCount total_count={total_count} />
          {items}
          <ProductListPagination page_info={page_info} params={params} />
        </Container>
      </>
    )
  }

  return null
}
