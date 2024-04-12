import { CartFab } from '@graphcommerce/magento-cart'
import { magentoMenuToNavigation } from '@graphcommerce/magento-category'
import { CustomerFab, CustomerMenuFabItem } from '@graphcommerce/magento-customer'
import { SearchLink } from '@graphcommerce/magento-search'
import PageLink, { LinkProps as PageLinkProps } from 'next/link'
import { WishlistFab, WishlistMenuFabItem } from '@graphcommerce/magento-wishlist'
import { LayoutDefault, LayoutDefaultProps } from './LayoutDefault'
import { DesktopNavBar } from './DesktopNavbar'
import { NavigationOverlay } from './NavigationOverlay'
import { NavigationFab } from './NavigationFab'
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
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Footer } from './Footer'
import { LayoutQuery } from './Layout.gql'
import { Logo } from './Logo'

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


            //  cc, nur Lupe ohne Texteingabe
            //   <PageLink href='/search' passHref>
            //   <Fab aria-label={i18n._(/* i18n */ 'Search...')} size='large' color='inherit'>
            //     <IconSvg src={iconSearch} size='large' />
            //   </Fab>
            // </PageLink>,

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
            // {
            //   id: 'manual-item-one',
            //   href: `/${menu?.items?.[0]?.children?.[0]?.url_path}`,
            //   name: menu?.items?.[0]?.children?.[0]?.name ?? '',
            // },
            // {
            //   id: 'manual-item-two',
            //   href: `/${menu?.items?.[0]?.children?.[1]?.url_path}`,
            //   name: menu?.items?.[0]?.children?.[1]?.name ?? '',
            // },
            ...magentoMenuToNavigation(menu, true),
            { id: 'blog', name: 'Blog', href: '/blog' },
            <Divider sx={(theme) => ({ my: theme.spacings.xs })} />,
            <CustomerMenuFabItem
              onClick={() => selection.set(false)}
              key='account'
              guestHref='/account/signin'
              authHref='/account'
            >
              <Trans id='Account' />
            </CustomerMenuFabItem>,
            // Service Var1
            // <MenuFabSecondaryItem
            //   key='service'
            //   icon={<IconSvg src={iconCustomerService} size='medium' />}
            //   href='/service'
            // >
            //   <Trans id='Customer Service' />
            // </MenuFabSecondaryItem>,

            // Service Var2
            //             <PageLink href='/service' passHref>
            //   <Fab size='large' color='inherit'>
            //     <IconSvg src={iconCustomerService} size='large' />
            //     <Trans id='Customer Service' />
            //   </Fab>
            // </PageLink>,
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
          itemWidthMd='400px'
          mouseEvent='hover'
          itemPadding='md'
        />
      </NavigationProvider>

      <LayoutDefault
        {...uiProps}
        noSticky={router.asPath.split('?')[0] === '/'}
        header={
          <>

            {/* <DesktopNavBar> */}
              {/* {menu?.items?.[0]?.children?.slice(0, 2).map((item) => (
                <DesktopNavItem key={item?.uid} href={`/${item?.url_path}`}>
                  {item?.name}
                </DesktopNavItem>
              ))} */}

              {/* <DesktopNavItem
                onClick={() => selection.set([menu?.items?.[0]?.uid || ''])}
                onKeyUp={(evt) => {
                  if (evt.key === 'Enter') {
                    selection.set([menu?.items?.[0]?.uid || ''])
                  }
                }}
                tabIndex={0}
              >
                {menu?.items?.[0]?.name}
                <IconSvg src={iconChevronDown} />
              </DesktopNavItem>

              <DesktopNavItem href='/blog'>
                <Trans id='Blog' />
              </DesktopNavItem>
            </DesktopNavBar> */}
            {/* cc, neu angeordnet*/}
            <Box
              sx={{
                width: '33%',
                display: 'flex',
                justifyContent: 'center',
                justifySelf: 'center',
                pointerEvents: 'none',
                zIndex: '200',
              }}
            >
            </Box>
            <Logo />
            <Box
              sx={{
                width: '33%',
                display: 'flex',
                justifyContent: 'end',
                pointerEvents: 'none',
                zIndex: '200',
              }}
            >
            <DesktopNavActions>
              {!router.pathname.startsWith('/search') && (
                <SearchLink
                  href='/search'
                  aria-label={i18n._(/* i18n */ 'Search...')}
                  breakpoint='lg'
                />
              )}
              {/* cc hier war service link */}
              <WishlistFab icon={<IconSvg src={iconHeart} size='large' />} />
              <CustomerFab guestHref='/account/signin' authHref='/account' />
              {/* The placeholder exists because the CartFab is sticky but we want to reserve the space for the <CartFab /> */}
              <PlaceholderFab />
            </DesktopNavActions>
            </Box>
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
