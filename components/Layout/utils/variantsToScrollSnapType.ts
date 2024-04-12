import { ScrollerProviderProps } from '@graphcommerce/framer-scroller'
import { LayoutOverlayBaseProps } from '../OverlayBase'

type Variants = Partial<Pick<LayoutOverlayBaseProps, 'variantSm' | 'variantMd'>>

type Return = Required<Pick<ScrollerProviderProps, 'scrollSnapTypeSm' | 'scrollSnapTypeMd'>>

export function variantsToScrollSnapType(variants: Variants): Return {
  const inlineSm = variants.variantSm === 'left' || variants.variantSm === 'right'
  const inlineMd = variants.variantMd === 'left' || variants.variantMd === 'right'

  return {
    scrollSnapTypeSm: inlineSm ? 'inline mandatory' : 'block mandatory',
    scrollSnapTypeMd: inlineMd ? 'inline mandatory' : 'block mandatory',
  }
}
