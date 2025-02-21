import { Layout as UserLayout } from '../layouts/user/layout';
import {
  Box,
  Button,
  Container, Divider,
  Grid, IconButton,
  Input,
  Paper,
  Stack,
  SvgIcon,
  Typography
} from '@mui/material';
import Head from 'next/head';
import Link from 'next/link';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import {
  useDeleteCartDetailsMutation,
  useEditCartDetailsMutation,
  useListCartDetailsQuery
} from '../agent/cartApiSlice';
import { fCurrency } from '../utils/format-number';
import { useEffect, useMemo, useReducer } from 'react';

function Page() {
  const title = 'Cart';

  const [trigger, {isLoading: isEditingCartDetail}] = useEditCartDetailsMutation();
  const [removeCartItem, {isLoading: isRemovingCartItem}] = useDeleteCartDetailsMutation();

  const actions = {
    changeQuantity: 'changeQuantity',
    removeCartItem: 'removeCartItem'
  }
  const cartReducer = (state, action) => {
    const {type, payload} = action;
    if (type === actions.changeQuantity) {
      trigger({productId: payload.cartItem.productId, quantity: payload.quantity + payload.cartItem.quantity})
      return state
    } else if (type === actions.removeCartItem) {
      removeCartItem(payload)
      return state;
    } else {
      return {...state, [type]: payload}
    }
  }
  const [cartState, cartDispatch] = useReducer(cartReducer, {})

  const {data} = useListCartDetailsQuery({});

  const totalPrice = useMemo(() => {
    return data?.reduce((prev, current) => prev + current.product.price * current.quantity, 0) || 0
  }, [data])

  return <>
    <Head>
      <title>{title}</title>
    </Head>

    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Stack spacing={3}>
            <Paper sx={{p: 3}}>
              <Typography variant="h4" sx={{mb: 3}} component={"div"}>
                {title}&nbsp;
                <Typography component={"span"} sx={{color: "neutral.400"}}>
                  ({data?.length || 0} items)
                </Typography>
              </Typography>
              <Stack spacing={2}>
                {data?.map(cartItem => {
                  const {quantity} = cartItem
                  const {id, name, price, discount, stocks} = cartItem.product
                  return (
                    <Stack direction={"row"} justifyContent={"space-between"}>
                      <Stack direction={"row"} spacing={2}>
                        <Box
                          component={"img"}
                          src={"/assets/products/placeholder.png"}
                          sx={{height: 100, border: '1px solid', borderRadius: "16px"}}
                        />
                        <Stack spacing={0.25}>
                          <Typography sx={{fontWeight: 600}}>{name}</Typography>
                          <Typography component={"span"}>
                            <Typography component={"span"} sx={{
                              color: 'text.disabled',
                              textDecoration: 'line-through',
                            }}>
                              {discount ? `${fCurrency(price)} \\` : ''}
                            </Typography>
                            <Typography component={"span"} color={"primary"}>{fCurrency(price - discount)}</Typography>
                            <Stack direction='row'
                                   sx={{alignItems: 'center'}}
                            >
                              <Typography
                                component='span'
                                sx={{lineHeight: '32px'}}
                              >
                                Quantity:&nbsp;
                              </Typography>
                              <Button
                                variant={quantity > 1 && !isEditingCartDetail && 'text' || 'disabled'}
                                size='small'
                                sx={{
                                  height: '32px',
                                  width: '32px',
                                  minWidth: '32px',
                                }}
                                onClick={() => cartDispatch({type: actions.changeQuantity, payload: {quantity: -1, cartItem}})}
                              >-</Button>
                              <Input
                                value={quantity || 0}
                                sx={{
                                  width: '50px',
                                  height: '32px',
                                  '& .MuiInputBase-input': {
                                    textAlign: 'center',
                                  }
                                }}
                              />
                              <Button
                                variant={quantity < stocks & !isEditingCartDetail && 'text' || 'disabled'}
                                size='small'
                                sx={{
                                  height: '32px',
                                  width: '32px',
                                  minWidth: '32px',
                                }}
                                onClick={() => cartDispatch({type: actions.changeQuantity, payload: {quantity: 1, cartItem}})}
                              >+</Button>
                            </Stack>
                          </Typography>
                        </Stack>
                      </Stack>
                      <IconButton
                        variant={"contained"}
                        sx={{
                          fontSize: "14px",
                          width: 24,
                          height: 24,
                          padding: 1,
                          backgroundColor: 'error.main',
                          color: 'white',
                          '&:hover': {
                            backgroundColor: 'error.main'
                          }
                        }}
                        onClick={() => cartDispatch({type: actions.removeCartItem, payload: {productId: cartItem.productId}})}
                      >
                        &#x2715;
                      </IconButton>
                    </Stack>
                  )
                })}
              </Stack>
            </Paper>
            <Typography
              component={Link}
              href={"/"}
              sx={{
                textDecoration: 'none',
                color: 'black',
                fontWeight: 500,
                display: 'flex',
                gap: 1
              }}
            >
              <SvgIcon>
                <ChevronLeftIcon/>
              </SvgIcon>
              Continue Shopping
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} md={5}>
          <Stack spacing={3}>
            <Paper sx={{p: 3}}>
              <Typography variant="h5" sx={{mb: 3}}>
                Order Summary
              </Typography>
              <Stack>
                <Stack spacing={1}>
                  {
                    [
                      [{text: 'Sub Total', props: {color: 'neutral.400'}}, {text: fCurrency(totalPrice), props: {sx: {fontWeight: 600}}}],
                      [{text: 'Discount', props: {color: 'neutral.400'}}, {text: '-', props: {sx: {fontWeight: 600}}}],
                      [{text: 'Shipping', props: {color: 'neutral.400'}}, {text: 'Free', props: {sx: {fontWeight: 600}}}],
                    ].map(([left, right], index) => (
                      <Stack key={index} direction={'row'} justifyContent={'space-between'}>
                        <Typography {...left.props}>{left.text}</Typography>
                        <Typography {...right.props}>{right.text}</Typography>
                      </Stack>
                    ))
                  }
                  <Divider/>
                  {
                    [
                      [{text: 'Total', props: {}}, {text: fCurrency(totalPrice), props: {sx: {color: 'primary.main', fontWeight: 600}, fontSize: 'large'}}],
                    ].map(([left, right], index) => (
                      <Stack key={index} direction={'row'} justifyContent={'space-between'}>
                        <Typography {...left.props}>{left.text}</Typography>
                        <Typography {...right.props}>{right.text}</Typography>
                      </Stack>
                    ))
                  }
                </Stack>
              </Stack>
            </Paper>
            <Button variant={"contained"}>
              Check Out
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Container>
</>
}

Page.getLayout = (page) => (
  <UserLayout>
    {page}
  </UserLayout>
);

export default Page;