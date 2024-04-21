import { Image, ImageProps } from '@graphcommerce/image'
import { Box } from '@mui/material'
import { m } from 'framer-motion'
import { forwardRef } from 'react'

export type MotionImageAspectProps = Omit<ImageProps, 'layout' | 'unoptimized'>

/**
 * - Renders an image with the given aspect ratio
 * - Supports framer motion layout transitions
 *
 * Note: We have a fallback for Safari 14 which doesn't yet support aspect-ratio, this causes a
 * problem when the layout is animated. Should be fixed in Safari 15
 */
export const MotionImageAspect = m(
  forwardRef<HTMLImageElement, MotionImageAspectProps>((props, ref) => (
    <Box
      className='MotionImageAspect'
      sx={{
        position: 'relative',

        '& > picture': {
          display: 'block',
        },
        '& > img': {
          display: 'block',
        },
      }}
    >
      <Image
        {...props}
        layout='fill'
        ref={ref}
        className={props.className}
        pictureProps={{
          ...props.pictureProps,
          className: props.pictureProps?.className,
          style: { ...props.style, aspectRatio: `${props.width} / ${props.height}` },
        }}
        sx={{
          justifyContent: 'center',
          objectFit: 'cover',
        }}
      />
    </Box>
  )),
)

MotionImageAspect.displayName = 'MotionImageAspect'
