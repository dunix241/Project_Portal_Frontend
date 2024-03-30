// @mui
import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Input,
  Paper,
  Rating,
  Stack,
  SvgIcon,
  Typography
} from '@mui/material';
import { useEffect, useReducer, useState } from 'react';
import { styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useDispatch } from 'react-redux';
import { fCurrency } from '../../utils/format-number';
import { useRouter } from 'next/router';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { Layout as UserLayout } from '../../layouts/user/layout';
import Head from 'next/head';
import { useGetProductQuery } from '../../agent/productApiSlice';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import { Editor } from '../../components/editor';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { isJson } from '../../utils/isJson';

const ChevronButton = styled(IconButton)(({theme}) => ({
  width: '40px',
  height: '40px',
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
}))
const Page = (props) => {
  const router = useRouter()
  const {id} = router.query;
  console.log(router.query.id);
  const {data: product, isLoading, isSuccess, isError, error} = useGetProductQuery({id});
  // const {product, selectedVariations} = useGetProductQuery();
  const dispatch = useDispatch();
  const selectedVariations = []
  console.log(product);

  useEffect(() => {
    // if (product?.id !== id) {
    console.log('fetching product')
    // dispatch(get(id));
    // }
  }, []);

  useEffect(() => {
    console.log(product)
  }, [product])

  useEffect(() => {
    console.log(selectedVariations)
  }, [selectedVariations])

  if (!product) return null;
  const {name, label, discount, stocks, description, price, images} = product

  console.log(id)

  // const largeScreen = useMediaQuery(theme => theme.breakpoints.up('md'));
  const largeScreen = true;

  const imageViewerProps = {
    images,
    sx: {
      maxWidth: '450px'
    }
  }

  const Prices = (props) => {
    const {...rootProps} = props;

    const [charge, setCharge] = useState(0)

    return <Box {...rootProps}>
      <Typography>
        List price:&nbsp;
        <Typography
          component="span"
          variant="body1"
          sx={{
            color: 'text.disabled',
            textDecoration: 'line-through',
          }}
        >
          {fCurrency(price)}
        </Typography>
      </Typography>
      <Typography>
        Top deal:&nbsp;
        <Typography variant="h5" component='span' sx={{color: 'primary.main'}}>
          &nbsp;
          {fCurrency(price - discount + charge)}
        </Typography>
      </Typography>
      <Typography>
        You save:&nbsp;
        <Typography component='span' sx={{color: 'primary.main'}}>
          &nbsp;
          {fCurrency(discount) || '$0'}
          &nbsp;
          {price ? `(${(discount / price * 100).toFixed(2)}%)` : ''}
        </Typography>
      </Typography>
    </Box>
  }
  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>

      <Container>
        <Typography variant="h4" sx={{mb: 5}}>
          Details
        </Typography>
        <Stack
          direction={largeScreen ? 'row' : 'column-reverse'}
          spacing={3}
          sx={{mb: 5}}
        >
          <ImageViewer {...imageViewerProps}/>
          <Box sx={{flex: 1}}>
            <ProductName {...{label, name}}/>
            <Stack
              direction='row'
              sx={{alignItems: 'center'}}
            >
              <Rating name="read-only" value={product.rating} readOnly/>
              <Typography
                sx={{color: 'text.disabled'}}
              >&nbsp;{product?.ratings?.length || '0'} ratings</Typography>
            </Stack>
            <Divider sx={{mb: 3}}/>
            <Stack spacing={3}>
              <Prices/>
              <AddToCart quantity={stocks} product={product}/>
            </Stack>
          </Box>
        </Stack>
        <Paper
          sx={{
            px: 4,
            py: 2
          }}
        >
          <Typography variant={'h5'} sx={{mb: 2}}>
            Description
          </Typography>
          {description && isJson(description) && <LexicalComposer initialConfig={{readOnly: true, editorState: description, editable: false}}>
            <RichTextPlugin
              contentEditable={
                <ContentEditable />
              }
            />
          </LexicalComposer>}
          {!isJson(description) && description?.split('\n').map((paragraph, index) => (
            <Typography
              paragraph
              sx={{textIndent: '20px', textAlign: 'justify'}}
              key={index}
            >{paragraph}</Typography>
          ))}
        </Paper>
      </Container>
    </>
  );
}

function ImageViewer(props) {
  const {...rootProps} = props;

  const actions = {
    changeImageRoll: 'changeImageRoll',
    setCurrentImage: 'setCurrentImage'
  }
  const imageReducer = (state, action) => {
    const {imageRoll, images} = state;
    const {type, payload} = action;

    if (type === actions.changeImageRoll) {
      if (imageRoll[0] + payload >= 0 && imageRoll[imageRoll.length - 1] + payload < images.length) {
        state.imageRoll = imageRoll.map(img => {
          return {
            id: img + payload,
            img: images[img + payload],
          }
        });
      }
    } else {
      return {...state, [type]: payload}
    }
  }
  const [imageState, imageDispatch] = useReducer(imageReducer, {
    images: rootProps.images || ['/assets/products/placeholder.png'],
    imageRoll: rootProps.images?.map((_, id) => id) ?? [0],
    currentImage: 0
  })
  const {images, imageRoll, currentImage} = imageState;

  const [imgState, setImgState] = useState({
    backgroundImage: `url(${images[currentImage]})`,
    backgroundPosition: '0% 0%'
  });

  useEffect(() => {
    setImgState({
      ...imgState,
      backgroundImage: `url(${images[currentImage]})`,
    })
  }, [currentImage, images])

  const handleMouseMove = e => {
    const {left, top, width, height} = e.target.getBoundingClientRect()
    const x = (e.pageX - left) / width * 100
    const y = (e.pageY - top) / height * 100
    setImgState({...imgState, backgroundPosition: `${x}% ${y}%`})
  }

  const ImageRoll = (props) => {
    return <Stack
      direction='row'
      sx={{
        width: '100%',
        justifyContent: 'center',
        position: 'relative'
      }}
    >
      {imageRoll.map((img, id) => <Box
          key={id}
          sx={{
            width: '20%',
            margin: '5px',
            border: id === currentImage ? '2px solid' : 'none',
            borderColor: 'primary.main'
          }}
          component='img' src={images[img]}
          onClick={() => imageDispatch({type: actions.setCurrentImage, payload: id})}
        />
      )}

      {images.length > imageRoll.length && <ChevronButton
        sx={{left: '10px'}}
        onClick={() => imageDispatch({type: actions.changeImageRoll, payload: -1})}
      >
        <ChevronLeftIcon
          sx={{color: 'white'}}
        />
      </ChevronButton>}
      {images.length > imageRoll.length && <ChevronButton
        sx={{right: '10px'}}
        onClick={() => imageDispatch({type: actions.changeImageRoll, payload: 1})}
      >
        <ChevronRightIcon
          sx={{
            transform: 'rotate(180deg)',
            color: 'white'
          }}
        />
      </ChevronButton>}
    </Stack>
  }

  return <>
    <Stack
      direction="column"
      {...rootProps}
    >
      <Box
        sx={{
          padding: '5px'
        }}
      >
        <Box
          onMouseMove={handleMouseMove}
          sx={{
            ...imgState,
            width: '100%',
            '&:hover *': {
              opacity: 0
            },
            border: '1px solid',
          }}
        >
          <Box
            component='img'
            src={images[currentImage]}
            sx={{maxWidth: '100%'}}
          />
        </Box>
      </Box>
      <ImageRoll/>
    </Stack>
  </>
}

function ProductName(props) {
  const {name, label, ...rootProps} = props;

  return <Stack {...rootProps} direction='row' spacing={2} sx={{alignItems: 'center'}}>
    <Typography variant="h4">
      {name}
    </Typography>
  </Stack>
}

const AddToCart = (props) => {
  const {product, ...rootProps} = props;

  const actions = {
    changeQuantity: 'changeQuantity'
  }
  const cartReducer = (state, action) => {
    const {quantity} = state;
    const {type, payload} = action;
    if (type === actions.changeQuantity) {
      const resultedQuantity = quantity + payload;
      if (resultedQuantity <= product.stocks && resultedQuantity >= 0) {
        return {...state, quantity: resultedQuantity}
      }
    } else {
      return {...state, [type]: payload}
    }
  }
  const [cartState, cartDispatch] = useReducer(cartReducer, {quantity: 0})
  const {quantity} = cartState
  const largeScreen = useMediaQuery(theme => theme.breakpoints.up('md'));

  return <Stack
    {...rootProps}
    direction={largeScreen ? 'row' : 'column'}
    spacing={largeScreen ? 4 : 2}
  >
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
        variant={quantity > 0 && 'text' || 'disabled'}
        size='small'
        sx={{
          height: '32px',
          width: '32px',
          minWidth: '32px',
        }}
        onClick={() => cartDispatch({type: actions.changeQuantity, payload: -1})}
      >-</Button>
      <Input
        value={quantity}
        sx={{
          width: '50px',
          height: '32px',
          '& .MuiInputBase-input': {
            textAlign: 'center',
          }
        }}
      />
      <Button
        variant={quantity < product.stocks && 'text' || 'disabled'}
        size='small'
        sx={{
          height: '32px',
          width: '32px',
          minWidth: '32px',
        }}
        onClick={() => cartDispatch({type: actions.changeQuantity, payload: 1})}
      >+</Button>
    </Stack>

    <Button
      variant={quantity ? 'outlined' : 'disabled'}
      sx={{
        width: '175.8px',
        height: '46px',
        '&.MuiButtonBase-root': {
          marginInline: largeScreen ? 'none' : 'auto'
        }
      }}
    >
      <SvgIcon
        sx={{
          width: '20px',
          height: '20px',
          marginRight: '10px'
        }}
      >
        <ShoppingCartIcon/>
      </SvgIcon>
      Add to cart
    </Button>
  </Stack>
}

export default Page

Page.getLayout = (page) => (
  <UserLayout>
    {page}
  </UserLayout>
);