import { Logo as LogoBase } from './Logoparts'
import svgLogo from './graphcommerce.svg'

export function Logo() {
  return (
    <LogoBase
    sx={(theme) => ({
        '& .GcLogo-logo': {
          height: '60px',
          width: 'max-content',
          


 
 
        
          pointerEvents: 'all',
          filter: (theme) => (theme.palette.mode === 'dark' ?  'none' : 'invert(100%)'),
        },



        
})}
      image={{ alt: 'GraphCommerce Logo', src: svgLogo, unoptimized: true }}
    />
  )
}
