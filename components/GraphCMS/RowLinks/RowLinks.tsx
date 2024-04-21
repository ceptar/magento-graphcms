import { } from '@graphcommerce/graphcms-ui'
import { RowLinksFragment } from './RowLinks.gql'
import { ImageLabelSwiper, LogoSwiper, Inline, Usps } from './variant'

type VariantRenderer = Record<
  NonNullable<RowLinksFragment['linksVariant']>,
  React.FunctionComponent<RowLinksFragment>
>

export type RowLinksProps = RowLinksFragment & {
  renderer?: Partial<VariantRenderer>
}

const defaultRenderer: Partial<VariantRenderer> = {
  ImageLabelSwiper,
  LogoSwiper,
  Inline,
  Usps
}

export function RowLinks(props: RowLinksProps) {
  const { renderer, linksVariant, ...RowLinksProps } = props
  const mergedRenderer = { ...defaultRenderer, ...renderer } as VariantRenderer

  if (!linksVariant) return null

  const RenderType =
    mergedRenderer?.[linksVariant] ??
    (() => {
      if (process.env.NODE_ENV !== 'production') return <>renderer for {linksVariant} not found</>
      return null
    })

  return <RenderType {...RowLinksProps} />
}
