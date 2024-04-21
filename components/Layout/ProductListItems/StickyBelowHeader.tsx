import { extendableComponent } from '@graphcommerce/next-ui'
import { Container, SxProps, Theme } from '@mui/material'
import React from 'react'

export type StickyBelowHeaderProps = {
  children: React.ReactNode
  sx?: SxProps<Theme>
}

const { classes } = extendableComponent('StickyBelowHeader', ['root'])

/** - Makes the children sticky to the parent container */
export function StickyBelowHeader(props: StickyBelowHeaderProps) {
  const { sx = [] } = props
  return (
    <Container
      className={classes.root}

      {...props}
      sx={[
        (theme) => ({
          position: 'sticky',
          display: 'flex',
          flexDirection: 'row-reverse',
          top: `calc(${theme.appShell.appBarHeightMd} )`,
          marginLeft: 'auto',
          marginRight: 0,
          maxWidth: 'fit-content',
          width: 'auto',
          paddingRight: theme.spacings.sm,
          // top: `calc(${theme.appShell.appBarHeightMd} / 2)`,
          // marginTop: `calc(${theme.appShell.headerHeightMd} * -1)`,
          zIndex: 96,
          pointerEvents: 'none',
          '& > *': {
            pointerEvents: 'auto',
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  )
}
