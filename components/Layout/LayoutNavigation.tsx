import { CartFab } from '@graphcommerce/magento-cart'
import { magentoMenuToNavigation } from '@graphcommerce/magento-category'
import { CustomerFab, CustomerMenuFabItem } from '@graphcommerce/magento-customer'
import { WishlistFab, WishlistMenuFabItem } from '@graphcommerce/magento-wishlist'
import {
  DesktopNavActions,
  iconCustomerService,
  iconHeart,
  MenuFabSecondaryItem,
  PlaceholderFab,
  IconSvg,
  DesktopNavItem,
  DarkLightModeMenuSecondaryItem,
  iconChevronDown,
  NavigationProvider,
  useNavigationSelection,
  useMemoDeep,
  LazyHydrate,
  iconSearch,
} from '@graphcommerce/next-ui'

import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Box, Divider, Fab } from '@mui/material'
import PageLink, { LinkProps as PageLinkProps } from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { DesktopNavBar } from './DesktopNavbar'
import { Footer } from './Footer'
import { LayoutQuery } from './Layout.gql'
import { LayoutDefault, LayoutDefaultProps } from './LayoutDefault'
import { Logo } from './Logo'
import { MenuFab } from './MenuFab'
import { NavigationFab } from './NavigationFab'
import { NavigationOverlay } from './NavigationOverlay'
import { SearchLink } from './SearchLink'

export type LayoutNavigationProps = LayoutQuery &
  Omit<LayoutDefaultProps, 'footer' | 'header' | 'cartFab' | 'menuFab'>

export function LayoutNavigation(props: LayoutNavigationProps) {
  const { footer, menu, children, ...uiProps } = props

  const selection = useNavigationSelection()
  const router = useRouter()

  return (
    <>
      <NavigationProvider
        selection={selection}
        items={useMemoDeep(
          () => [
            <SearchLink
              href='/search'
              onClick={() => selection.set(false)}
              sx={(theme) => ({
                width: `calc(100% - ${theme.spacing(4)})`,
                m: 2,
                mb: theme.spacings.xs,
              })}
              aria-label={i18n._(/* i18n */ 'Search...')}
            >
              <Trans id='Search...' />
            </SearchLink>,
            { id: 'home', name: <Trans id='Home' />, href: '/' },

            ...magentoMenuToNavigation(menu, true),
            { id: 'blog', name: 'Blog', href: '/blog' },
            // <Divider sx={(theme) => ({ my: theme.spacings.xs })} />,
            <CustomerMenuFabItem
              onClick={() => selection.set(false)}
              key='account'
              guestHref='/account/signin'
              authHref='/account'
            >
              <Trans id='Account' />
            </CustomerMenuFabItem>,
            <WishlistMenuFabItem
              onClick={() => selection.set(false)}
              key='wishlist'
              icon={<IconSvg src={iconHeart} size='medium' />}
            >
              <Trans id='Wishlist' />
            </WishlistMenuFabItem>,
            <DarkLightModeMenuSecondaryItem key='darkmode' />,
          ],
          [menu, selection],
        )}
      >
        <NavigationOverlay
          stretchColumns={false}
          variantSm='left'
          sizeSm='full'
          justifySm='start'
          itemWidthSm='70vw'
          variantMd='left'
          sizeMd='full'
          justifyMd='start'
          itemWidthMd='30vw'
          mouseEvent='hover'
          itemPadding='md'
        />
      </NavigationProvider>

      <LayoutDefault
        noSticky={router.asPath.split('?')[0] === '/'}
        header={
          <>
            <PageLink href='/'>
              <Logo />
            </PageLink>
            <Box>
              <PlaceholderFab />
            </Box>
            <DesktopNavActions>
              {!router.pathname.startsWith('/search') && (
                <SearchLink href='/search' aria-label={i18n._(/* i18n */ 'Search...')} />
              )}

              <WishlistFab icon={<IconSvg src={iconHeart} size='large' />} />
              <CustomerFab guestHref='/account/signin' authHref='/account' />
              {/* The placeholder exists because the CartFab is sticky but we want to reserve the space for the <CartFab /> */}
              <PlaceholderFab size='large' />
              <PlaceholderFab size='large' />
            </DesktopNavActions>
          </>
        }
        footer={<Footer footer={footer} />}
        cartFab={<CartFab />}
        menuFab={<NavigationFab onClick={() => selection.set([])} />}
      >
        {children}
      </LayoutDefault>
    </>
  )
}
