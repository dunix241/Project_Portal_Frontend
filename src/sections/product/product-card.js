import PropTypes from 'prop-types';
// @mui
import {Box, Card, Stack, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
import React from "react";
// utils
import {fCurrency} from "../../utils/format-number";
// components
import Label from "../../components/label";
import label from "../../components/label";
import productMapper from './product_mapper';
import Link from 'next/link'
// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
  transition: '0.3s all ease-in-out',
  '&:hover': {
    transform: 'scale(1.25)'
  }
});

// ----------------------------------------------------------------------



export const ShopProductCard = ({product}) => {
  const {name, price, img, discount, id, label} = product;
  return (
    <>
      <Card>
        <Box sx={{pt: '100%', position: 'relative', overflow: 'hidden'}}>
          {label && (
            <Label
              variant="filled"
              color={(label === 'Sale' || label === 'Out of stock' ? 'error' : (label === 'New' ? 'info' : 'warning'))}
              sx={{
                zIndex: 9,
                top: 16,
                right: 16,
                position: 'absolute',
                textTransform: 'uppercase',
              }}
            >
              {label}
            </Label>
          )}
          <StyledProductImg alt={name} src={img || '/assets/products/placeholder.png'}/>
        </Box>

        <Stack spacing={2} sx={{p: 3}}>
          {/* <Link to={`/dashboard/products/details/${id}`} underline="hover"> */}
          <Typography
            variant="subtitle2"
            noWrap
            component={Link}
            href={`/product/${id}`}
            sx={{color: 'black'}}
            underline='hover'
          >
            {name}
          </Typography>
          {/* </Link> */}

          <Stack direction="row" alignItems="center" justifyContent="space-between">
            {/* <ColorPreview colors={colors} /> */}
            <Typography variant="subtitle1">
              <Typography
                component="span"
                variant="body1"
                sx={{
                  color: 'text.disabled',
                  textDecoration: 'line-through',
                }}
              >
                {discount !== 0 && fCurrency(price)}
              </Typography>
              &nbsp;
              {fCurrency(price - discount)}
            </Typography>
          </Stack>
        </Stack>
      </Card>
    </>
  )
}
