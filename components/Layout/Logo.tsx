import { Logo as LogoBase } from '@graphcommerce/next-ui'
import svgLogo from './graphcommerce.svg'

export function Logo() {
  return (
    <LogoBase
      href='/'
      sx={{
        
        '& .GcLogo-logo': {
          width: 'auto',
          height: '100%',
          paddingLeft: { xs: 0, md: 0 },
          marginTop: { xs: 0, md: 0 },
          marginLeft: { xs: 0, md: 0 },

          minWidth: '150px',
          maxHeight: '60px',
          marginRight: 'auto',

          // filter: (theme) => (theme.palette.mode === 'dark' ? 'invert(100%)' : 'none'),
        },
      }}
      image={{ alt: 'Logo', src: svgLogo, unoptimized: true }}
    />
  )
}
