import { Logo as LogoBase } from './Logoparts'
import svgLogo from './graphcommerce.svg'

export function Logo() {
  return (
    <LogoBase
    href='/'
    sx={(theme) => ({
        '& .GcLogo-logo': {
          minHeight: '30px',
          maxHeight: '50px',
          minWidth: '100px',
          maxWidth: 'max-content',
          


 
 
        
          pointerEvents: 'all',
          filter: (theme) => (theme.palette.mode === 'dark' ?  'none' : 'invert(100%)'),
        },



        
})}
      image={{ alt: 'GraphCommerce Logo', src: svgLogo, unoptimized: true }}
    />
  )
}
