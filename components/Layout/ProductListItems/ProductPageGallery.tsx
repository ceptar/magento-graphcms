import {
  nonNullable,
  TypeRenderer,
} from '@graphcommerce/next-ui'
import {
  SidebarGallery,
  SidebarGalleryProps
} from './SidebarGallery'
import { ProductPageGalleryFragment } from '@graphcommerce/magento-product/components/ProductPageGallery/ProductPageGallery.gql'

export type ProductPageGalleryRenderers = TypeRenderer<
  NonNullable<NonNullable<ProductPageGalleryFragment['media_gallery']>[0]>
>

export type ProductPageGalleryProps = Omit<SidebarGalleryProps, 'sidebar' | 'images'> & {
  product: ProductPageGalleryFragment
  children?: React.ReactNode
}

export function ProductPageGallery(props: ProductPageGalleryProps) {
  const { product, children, aspectRatio: [width, height] = [0.8, 1], ...sidebarProps } = props
  const { media_gallery } = product

  const images =
    media_gallery
      ?.filter(nonNullable)
      .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
      .map((item) => {
        if (item.__typename === 'ProductImage')
          return { src: item.url ?? '', alt: item.label || undefined, width, height }
        return {
          src: '',
          alt: `{${item.__typename} not yet supported}`,
        }
      }) ?? []

  return (
    <SidebarGallery
      {...sidebarProps}
      sidebar={children}
      aspectRatio={[width, height]}
      images={images}
    />
  )
}
