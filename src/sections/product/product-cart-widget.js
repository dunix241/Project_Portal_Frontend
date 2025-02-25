// @mui
import { styled } from '@mui/material/styles';
import { Badge } from '@mui/material';
// component
import {Icon} from "@iconify/react";
import { useCountCartDetailsQuery } from '../../agent/cartApiSlice';
import { useListCategoriesQuery } from '../../agent/categoryApiSlice';
import Link from 'next/link';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  zIndex: 999,
  display: 'flex',
  cursor: 'pointer',
  alignItems: 'center',
  height: theme.spacing(5),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1.25),
  // boxShadow: theme.customShadows.z20,
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  borderTopLeftRadius: Number(theme.shape.borderRadius) * 2,
  borderBottomLeftRadius: Number(theme.shape.borderRadius) * 2,
  transition: theme.transitions.create('opacity'),
  '&:hover': { opacity: 0.72 },
}));

// ----------------------------------------------------------------------

const CartWidget = () => {
  const {data, error, isLoading, isFetching} = useCountCartDetailsQuery()

  return (
    <StyledRoot>
      <Link href={"/cart"} sx={{textDecoration: 'none', color: 'black'}}>
        <Badge showZero badgeContent={data?.count || 0} color="error" max={99}>
          <Icon icon="eva:shopping-cart-fill" width={24} height={24} />
        </Badge>
      </Link>
    </StyledRoot>
  )
}

export default CartWidget;