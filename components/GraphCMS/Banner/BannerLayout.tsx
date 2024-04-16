import { clientSize } from '@graphcommerce/framer-utils'
import { useScrollY, extendableComponent, responsiveVal, Row } from '@graphcommerce/next-ui'
import { ContainerProps, Box, styled, Theme, SxProps } from '@mui/material'
import { m, useTransform } from 'framer-motion'
import React from 'react'

export type BannerLayoutProps = ContainerProps & {
  pageLinks: React.ReactNode
  imageSrc: string // Update prop name for image source
  children: React.ReactNode
  sx?: SxProps<Theme>
}

const compName = 'BannerLayout' as const
const parts = ['root', 'wrapper', 'copy', 'asset', 'animated', 'image'] as const // Update part name
const { classes } = extendableComponent(compName, parts)
const MotionImage = styled(m.img)({})
// Create a styled component for the image

export function BannerLayout(props: BannerLayoutProps) {
  const { pageLinks, imageSrc, children, sx = [], ...containerProps } = props
  const scrollY = useScrollY()
  const scale = useTransform([scrollY, clientSize.y], ([scrollYCurr, clientSizeYCurr]: number[]) =>
    clientSizeYCurr ? (scrollYCurr / clientSizeYCurr) * 1.7 + 1 : 1,
  )

  return (
    <Row
      maxWidth={false}
      {...containerProps}
      className={classes.root}
      sx={[{}, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      <Box
        className={classes.wrapper}
        sx={(theme) => ({
          display: 'grid',
          overflow: 'hidden',
          borderRadius: responsiveVal(theme.shape.borderRadius * 2, theme.shape.borderRadius * 3),
          isolation: 'isolate',
        })}
      >
        <Box
          className={classes.copy}
          sx={(theme) => ({
            gridArea: '1 / 1',
            zIndex: 1,
            display: 'grid',
            justifyItems: 'center',
            alignContent: 'center',
            textAlign: 'left',
            p: theme.spacings.md,
            color: theme.palette.secondary.contrastText,
          })}
        >
          {children}
          {pageLinks}
        </Box>
        <Box
          className={classes.asset}
          sx={{
            gridArea: '1 / 1',
            position: 'relative',
          }}
        >
          <MotionImage
            src={imageSrc} // Use the image source prop
            alt='Hero banner image' // Provide an alt attribute for accessibility
            className={classes.image} // Use the new class name
            style={{ scale }}
            // layout='fill'
            sx={{
              position: 'absolute',
              transition: 'transform 0.5s cubic-bezier(0.33, 1, 0.68, 1)',
              objectFit: 'cover',
              width: '100%',
              height: '100%',
            }}
          />
        </Box>
      </Box>
    </Row>
  )
}
