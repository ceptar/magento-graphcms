import { useScrollOffset } from '@graphcommerce/framer-next-pages'
import { dvh } from '@graphcommerce/framer-utils'
import { LayoutProvider, SkipLink, extendableComponent, useFabSize } from '@graphcommerce/next-ui'
import { Box, SxProps, Theme } from '@mui/material'
import { useTransform, useScroll } from 'framer-motion'

export type LayoutDefaultProps = {
  className?: string
  beforeHeader?: React.ReactNode
  header: React.ReactNode
  footer: React.ReactNode
  menuFab?: React.ReactNode
  cartFab?: React.ReactNode
  children?: React.ReactNode
  noSticky?: boolean
  sx?: SxProps<Theme>
} & OwnerState

type OwnerState = {
  noSticky?: boolean
}
const parts = ['root', 'fabs', 'header', 'children', 'footer'] as const
const { withState } = extendableComponent<OwnerState, 'LayoutDefault', typeof parts>(
  'LayoutDefault',
  parts,
)

export function LayoutDefault(props: LayoutDefaultProps) {
  const {
    children,
    header,
    beforeHeader,
    footer,
    menuFab,
    cartFab,
    noSticky,
    className,
    sx = [],
  } = props

  const { scrollY } = useScroll()
  const scrollYOffset = useTransform(
    [scrollY, useScrollOffset()],
    ([y, offset]: number[]) => y + offset,
  )

  const classes = withState({ noSticky })

  return (
    <Box
      className={`${classes.root} ${className ?? ''}`}
      sx={[
        (theme) => ({
          // minHeight: dvh(100),
          // '@supports (-webkit-touch-callout: none)': {
          //   minHeight: '-webkit-fill-available',
          // },
          display: 'grid',
          gridTemplateRows: `auto 1fr auto`,
          gridTemplateColumns: '100%',
          background: theme.palette.background.default,
        }),

        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <SkipLink />
      <LayoutProvider scroll={scrollYOffset}>
        {beforeHeader}
        <Box
          component='header'
          className={classes.header}
          sx={(theme) => ({
            zIndex: theme.zIndex.appBar - 1,
            display: 'grid',
            gridTemplateColumns: `auto 1fr auto auto`,
            gap: theme.page.horizontal,
            px: theme.page.horizontal,
            height: theme.appShell.headerHeightMd,

            pointerEvents: 'none',
            '& > *': {
              pointerEvents: 'all',
            },
            [theme.breakpoints.up('md')]: {},
            '&.sticky': {
              [theme.breakpoints.down('md')]: {
                position: 'sticky',
              },
            },
          })}
        >
          {header}
        </Box>
        {/* floating sticky menubuttons */}
        {menuFab || cartFab ? (
          <Box
            className={classes.fabs}
            sx={(theme) => ({
              display: 'grid',
              width: '100%',
              justifyContent: 'flex-end',
              alignItems: 'center',
              // padding: `0 ${theme.page.horizontal}`,
              height: theme.appShell.headerHeightMd,
              zIndex: 'speedDial',
              position: 'sticky',
              top: 0,
              marginTop: `calc(${theme.appShell.headerHeightMd} * -1)`,
              [theme.breakpoints.up('sm')]: {},

              [theme.breakpoints.down('md')]: {},
            })}
          >
            <Box
              sx={(theme) => ({
                display: 'grid',
                gridTemplateColumns: `auto auto`,
                columnGap: theme.spacings.xxs,
                paddingLeft: theme.spacings.sm,
                paddingRight: theme.spacings.sm,
              })}
            >
              {cartFab}
              {menuFab}
            </Box>
            {/* {beforeHeader} */}
          </Box>
        ) : (
          <div />
        )}
        <div className={classes.children}>
          <div id='skip-nav' tabIndex={-1} />
          {children}
        </div>
        <div className={classes.footer}>{footer}</div>
      </LayoutProvider>
    </Box>
  )
}
