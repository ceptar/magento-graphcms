import { Logo as LogoBase } from '@graphcommerce/next-ui'
import svgLogo from './graphcommerce.svg'

export function Logo() {
  return (
    <LogoBase
      sx={{
        '& .GcLogo-logo': {
          href: '/',
          minWidth: '150px',
          maxHeight: '60px',
          paddingLeft: { xs: 0, md: 0 },
          marginTop: { xs: 0, md: 0 },
          marginRight: { xs: 'auto', md: 'auto' },
          filter: (theme) => (theme.palette.mode === 'dark' ? 'invert(100%)' : 'none'),
        },
      }}
      image={{ alt: 'GraphCommerce Logo', src: svgLogo, unoptimized: true }}
    />
  )
}
