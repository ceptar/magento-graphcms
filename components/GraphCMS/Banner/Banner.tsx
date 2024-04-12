import { RichText } from '@graphcommerce/graphcms-ui'
import { breakpointVal } from '@graphcommerce/next-ui'
import { Box, Button } from '@mui/material'
import { BannerFragment } from './Banner.gql'
import { BannerLayout } from './BannerLayout'


export function Banner(props: BannerFragment) {
  const { heroAsset, copy, pageLinks } = props

  return (
    <BannerLayout
      pageLinks={pageLinks.map(({ url, title }) => (
        <Button key={url} href={url} variant='outlined' size='large' color='inherit'>
          {title}
        </Button>
      ))}
      imageSrc={heroAsset.url}
      sx={(theme) => ({
        '& .BannerLayout-copy': {
          minHeight: { xs: 'min(80vh,600px)', md: 'min(80vh,1080px)' },

          [theme.breakpoints.up('sm')]: {
            // display: 'flex', // Apply Flexbox
            // justifyContent: 'flex-end', // Align right
            padding: theme.spacings.xl,
            justifyItems: 'start',
            alignContent: 'center',
            textAlign: 'left',
            width: '50%',
          }
        },
        '& .BannerLayout-image': {
          objectFit: 'cover',
          objectPosition: 'right',
        },
      })}
    >

      <RichText
        {...copy}
        sxRenderer={{

          paragraph: {
            typography: 'overline',
          },
          'heading-one': (theme) => ({
            paddingBottom: '10vh',
            textTransform: 'uppercase',
            mt: 1,
            mb: theme.spacings.sm,
            ...breakpointVal('fontSize', 42, 88, theme.breakpoints.values),
            '& strong': {
              WebkitTextFillColor: 'transparent',
              WebkitTextStroke: `1.2px #fff`,
            },
          }),
        }}
      />
    </BannerLayout>
  )
}
