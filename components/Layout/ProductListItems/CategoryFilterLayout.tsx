import {
  ProductFiltersProClearAll,
  FilterTypes,
  ProductFiltersPro,
  ProductFiltersProAllFiltersChip,
  ProductFiltersProAllFiltersSidebar,
  ProductFiltersQuery,
  ProductListCount,
  ProductListFilters,
  ProductListPagination,
  ProductListParams,
  ProductListParamsProvider,
  ProductListQuery,
  ProductListSort,
} from '@graphcommerce/magento-product'
import { Container } from '@mui/material'

import { ProductFiltersProLayoutSidebar } from './ProductFiltersProLayoutSidebar'
import { ProductListFiltersContainer } from './ProductListFiltersContainer'
import { ProductListItems } from './ProductListItems'
import { StickyBelowHeader } from './StickyBelowHeader'

export type ProductListFilterLayoutProps = ProductListQuery &
  ProductFiltersQuery & {
    filterTypes?: FilterTypes
    params?: ProductListParams
    id: string
    title: string
  }

export function CategoryFilterLayout(props: ProductListFilterLayoutProps) {
  const { params, filters, products, filterTypes, title, id } = props

  if (!(params && products?.items && filterTypes)) return null

  const { total_count, sort_fields, page_info } = products

  const items = <ProductListItems items={products.items} loadingEager={6} title={title} />

  if (import.meta.graphCommerce.productFiltersPro) {
    const horizontalFilters = (
      <ProductFiltersProAllFiltersChip total_count={total_count} sort_fields={sort_fields} />
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
