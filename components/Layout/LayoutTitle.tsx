import { IconSvg, IconSvgProps, extendableComponent, responsiveVal } from '@graphcommerce/next-ui'
import { Box, SxProps, Theme, Typography, TypographyProps } from '@mui/material'
import React from 'react'

type OwnerState = {
  size?: 'small' | 'medium'
  gutterTop?: boolean
  gutterBottom?: boolean
}

const parts = ['root', 'title', 'icon'] as const
const { withState } = extendableComponent<OwnerState, 'LayoutTitle', typeof parts>(
  'LayoutTitle',
  parts,
)

export type TitleProps = {
  children: React.ReactNode
  icon?: IconSvgProps['src']
  variant?: TypographyProps['variant']
  component?: React.ElementType
  sx?: SxProps<Theme>
} & OwnerState

export const LayoutTitle = React.forwardRef<HTMLDivElement, TitleProps>((props, ref) => {
  const { children, icon, size = 'medium', component, variant, sx = [] } = props

  const gutterTop = !!(props.gutterTop ?? size !== 'small')
  const gutterBottom = !!(props.gutterBottom ?? size !== 'small')

  const classes = withState({ size, gutterBottom, gutterTop })

  return (
    <Box
      className={classes.root}
      sx={[
        (theme) => ({
          display: 'flex',
          // alignItems: 'center',
          gap: `6px`,
          flexFlow: 'unset',
          [theme.breakpoints.up('md')]: {
            flexFlow: 'column',
          },
          '&.sizeSmall': {
            flexFlow: 'unset',
            overflow: 'hidden',
            '& svg': {
              width: responsiveVal(24, 28),
              height: responsiveVal(24, 28),
              strokeWidth: 1.4,
            },
            '& > *': {
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            },
          },
          '&.gutterTop': {
            marginTop: theme.spacings.md,
          },
          '&.gutterBottom': {
            marginBottom: theme.spacings.md,
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {icon && (
        <IconSvg src={icon} size={size === 'small' ? 'large' : 'xl'} className={classes.icon} />
      )}
      <Typography
        ref={ref}
        variant={variant || (size === 'small' ? 'h6' : 'h3')}
        component={component ?? 'h1'}
        className={classes.title}
      >
        {children}
      </Typography>
    </Box>
  )
})
