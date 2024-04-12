import { Logo as LogoBase } from '@graphcommerce/next-ui'
import svgLogo from './graphcommerce.svg'

export function Logo() {
  return (
    <LogoBase
      sx={{
        '& .GcLogo-logo': {
          width: 'auto',
          height: { xs: '60px', md: '60px' },
          paddingLeft: { xs: '10px', md: 0 },
          marginTop: { xs: 0, md: '-5px' },
          marginLeft: { xs: 0, md: 'auto' },
          marginRight: { xs: 0, md: 'auto' },

          // filter: (theme) => (theme.palette.mode === 'dark' ? 'invert(100%)' : 'none'),
        },
      }
      }
      image={{ alt: 'Logo', src: svgLogo, unoptimized: true }}
    />
  )
}
