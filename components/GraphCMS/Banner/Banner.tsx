import { RichText } from '@graphcommerce/graphcms-ui'
import { breakpointVal } from '@graphcommerce/next-ui'
import { Box, Button } from '@mui/material'
import { BannerFragment } from './Banner.gql'
import { BannerLayout } from './BannerLayout'

export function Banner(props: BannerFragment) {
  const { heroAsset, copy, bannerLink } = props

  return (
    <BannerLayout
      bannerLink={bannerLink.map(({ url, title }) => (
        <Button key={url} href={url} variant='contained' size='large' color='primary'>
          {title}
        </Button>
      ))}
      imageSrc={heroAsset.url}
      sx={(theme) => ({
        '& .BannerLayout-copy': {
          minHeight: { xs: 'min(100%,600px)', md: 'min(100%,1080px)' },
          // height: `calc(100vh - ${theme.appShell.headerHeightMd})`,
          width: '100%',

          [theme.breakpoints.up('sm')]: {
            // display: 'flex', // Apply Flexbox
            // justifyContent: 'flex-end', // Align right
            padding: theme.spacings.xl,
            justifyItems: 'start',
            alignContent: 'center',
            textAlign: 'left',
            width: '50%',
          },
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
            paddingBottom: '5vh',
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
