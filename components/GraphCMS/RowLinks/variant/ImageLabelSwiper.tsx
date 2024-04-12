import { Asset, RichText } from '@graphcommerce/graphcms-ui'
import { responsiveVal, VariantImageLabelSwiper } from '@graphcommerce/next-ui'
import { ContainerProps, Box, ButtonBase, Typography, Theme, SxProps } from '@mui/material'
import { RowLinksFragment } from '../RowLinks.gql'

export type RowLinksFragmentVar = RowLinksFragment & ContainerProps & {
  pageLinks: React.ReactNode;
  imageSrc: string; // Update prop name for image source
  children: React.ReactNode;
  sx?: SxProps<Theme>;
};

export function ImageLabelSwiper(props: RowLinksFragmentVar) {
  const { title, rowLinksCopy, pageLinks, sx = [], ...containerProps  } = props

  return (
    <VariantImageLabelSwiper
      title={title}
      copy={rowLinksCopy && <RichText {...rowLinksCopy} />}
      sx={{ '& .Scroller-root': { alignItems: 'start' } }}
    >
      {pageLinks.map((pageLink) => (
        <ButtonBase
          href={pageLink.url}
          key={pageLink.id}
          sx={(theme) => ({
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
            rowGap: theme.spacings.xs,
            '& img': { display: 'block' },
          })}
        >
          {pageLink?.asset && (
            <Asset
              asset={pageLink.asset}
              sx={(theme) => ({
                width: responsiveVal(120, 200),
                maxWidth: responsiveVal(120, 200),
                borderRadius: responsiveVal(theme.shape.borderRadius * 2, theme.shape.borderRadius * 3),
              })}
              sizes={responsiveVal(120, 200)}
            />
          )}
          <Box sx={{ maxWidth: responsiveVal(120, 200) }}>
            <Typography variant='h6' component='h3'>
              {pageLink.title}
            </Typography>
            {pageLink?.description && <RichText {...pageLink.description} />}
          </Box>
        </ButtonBase>
      ))}
    </VariantImageLabelSwiper>
  )
}
