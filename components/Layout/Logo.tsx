import { Logo as LogoBase } from '@graphcommerce/next-ui'
import svgLogo from './graphcommerce.svg'

export function Logo() {
  return (
    <LogoBase
      sx={{
        '& .GcLogo-logo': {
          width: 'auto',
          height: { xs: '60px', md: '60px' },
          paddingLeft: { xs: '10px', md: '10px' },
          marginTop: { xs: 0, md: 0 },
          marginLeft: { xs: 0, md: 0 },
          marginRight: { xs: 0, md: 0 },

          // filter: (theme) => (theme.palette.mode === 'dark' ? 'invert(100%)' : 'none'),
        },
      }}
      image={{ alt: 'Logo', src: svgLogo, unoptimized: true }}
    />
  )
}
