// @mui
import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Input,
  Rating,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from '@mui/material';
import {useEffect, useState} from "react";
import {styled} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useDispatch, useSelector} from "react-redux";
import {get, setCurrentImage, setQuantity, setSelectedVariations, slideImageRoll} from "../features/productsSlice";
import {fCurrency} from "../utils/formatNumber";
import {Icon} from "../components/icon/Icon";
import CartWidget from "../sections/@dashboard/products/ProductCartWidget";
import Label from "../components/label";
import {labelColorMapper} from "../features/mappers/productMapper";
import {useRouter} from "next/router";
import {ChevronLeftIcon} from "@heroicons/react/24/outline";
import { Layout as DashboardLayout } from '../../../layouts/dashboard/layout';
import Head from "next/head";

const ChevronButton = styled(IconButton)(({theme}) => ({
  width: '40px',
  height: '40px',
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
}))
function Page(props) {
  const router = useRouter()
  const {id} = router.query;
  const {product, selectedVariations} = useSelector(store => store.products);
  const dispatch = useDispatch();

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

  const {name, label, discount, quantity, description, price, images, variations} = product

  console.log(id)

  const largeScreen = useMediaQuery(theme => theme.breakpoints.up('md'));

  const imageViewerProps = {
    images,
    sx: {
      maxWidth: '450px'
    }
  }

  const Prices = (props) => {
    const {...rootProps} = props;

    const [charge, setCharge] = useState(0)

    useEffect(() => {
      const ans = selectedVariations.reduce(
        (prev, option) => prev + option ? option.charge : 0,
        0
      )
      console.log(ans)
      setCharge(ans)
    }, [selectedVariations])

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
          {fCurrency(price + charge)}
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
          ({(discount / price * 100).toFixed(2)}%)
        </Typography>
      </Typography>
    </Box>
  }
  const Variations = (props) => {
    const {...rootProps} = props;
    const handleChange = (e, variation, variationOption) => {
      dispatch(setSelectedVariations({variation, variationOption}));
    }

    return (
      <Stack spacing={1} {...rootProps}>
        {variations?.map(variation => (
          <Box key={variation.name}>
            <Typography>
              {variation.name}
            </Typography>
            <ToggleButtonGroup
              size='small'
              exclusive
              value={selectedVariations?.find(option => variation.variationOptions.includes(option))}
              color={'primary'}
              onChange={(e, optionId) => handleChange(e, variation, optionId)}
            >
              {variation.variationOptions.map((option, index) => (
                <ToggleButton
                  value={option}
                  key={index}
                >
                  {option.name}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>
        ))}
      </Stack>
    )

  }

  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>

      <Container>
        <CartWidget/>
        <Typography variant="h4" sx={{mb: 5}}>
          Details
        </Typography>
        <Stack
          direction={largeScreen ? 'row' : 'column-reverse'}
          spacing={3}
          sx={{mb: 5}}
        >
          {images?.length > 0 && <ImageViewer {...imageViewerProps}/>}
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
              <Variations/>
              <AddToCart quantity={quantity}/>
            </Stack>
          </Box>
        </Stack>
        {description?.split('\n').map((paragraph, index) => (
          <Typography
            paragraph
            sx={{textIndent: '20px', textAlign: 'justify'}}
            key={index}
          >{paragraph}</Typography>
        ))}
      </Container>
    </>
  );
}

function ImageViewer(props) {
  const {...rootProps} = props;
  const {product: {images, imageRoll}, currentImage} = useSelector(store => store.products);

  const [imgState, setImgState] = useState({
    backgroundImage: `url(${images[currentImage]})`,
    backgroundPosition: '0% 0%'
  });
  const dispatch = useDispatch();

  const changeImageRoll = (val) => {
    dispatch(slideImageRoll(val));
  }

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
      {imageRoll.map(({img, id}) => <Box
          key={id}
          sx={{
            width: '20%',
            margin: '5px',
            border: id === currentImage ? '2px solid' : 'none',
            borderColor: 'primary.main'
          }}
          component='img' src={img}
          onClick={() => dispatch(setCurrentImage(id))}
        />
      )}

      {images.length > imageRoll.length && <ChevronButton
        sx={{left: '10px'}}
        onClick={() => changeImageRoll(-1)}
      >
        <ChevronLeftIcon
          sx={{color: 'white'}}
        />
      </ChevronButton>}
      {images.length > imageRoll.length && <ChevronButton
        sx={{right: '10px'}}
        onClick={() => changeImageRoll(1)}
      >
        <ChevronLeftIcon
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
            }
          }}
        >
          <Box
            component='img' src={images[currentImage]}
          />
        </Box>
      </Box>
      {images.length > 1 && <ImageRoll/>}
    </Stack>
  </>
}

function ProductName(props) {
  const {name, label, ...rootProps} = props;

  return <Stack {...rootProps} direction='row' spacing={2} sx={{alignItems: 'center'}}>
    <Typography variant="h4">
      {name}
    </Typography>
    {label && <Label
      variant="filled"
      color={labelColorMapper(label)}
      sx={{
        textTransform: 'uppercase',
      }}
    >
      {label}
    </Label>}
  </Stack>
}

const AddToCart = (props) => {
  const {...rootProps} = props;
  const {quantity, product} = useSelector(store => store.products);
  const dispatch = useDispatch();
  const largeScreen = useMediaQuery(theme => theme.breakpoints.up('md'));
  const handleChangeQuantity = (val) => {
    dispatch(setQuantity(val))
  }

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
        onClick={() => handleChangeQuantity(-1)}
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
        variant={quantity < product.quantity && 'text' || 'disabled'}
        size='small'
        sx={{
          height: '32px',
          width: '32px',
          minWidth: '32px',
        }}
        onClick={() => handleChangeQuantity(1)}
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
      <Icon
        sx={{
          width: '20px',
          height: '20px',
          marginRight: '10px'
        }}
      >
        ic_cart
      </Icon>
      Add to cart
    </Button>
  </Stack>
}

Page.defaultProps = {
  product: {
    name: 'Nike Air Force 1 NDESTRUKT',
    images: [
      '/assets/images/products/product_1.jpg',
      '/assets/images/products/product_2.jpg',
      '/assets/images/products/product_3.jpg',
      '/assets/images/products/product_4.jpg',
      '/assets/images/products/product_5.jpg',
      '/assets/images/products/product_6.jpg',
      '/assets/images/products/product_7.jpg',
    ],
    price: 64.74,
    discount: 28.05,
    quantity: 10,
    label: {
      name: 'sale',
      color: 'error'
    },
    description: 'The Air Force 1 NDSTRKT blends unbelievable comfort with head-turning style and street-ready toughness to create an \'indestructible\' feel. In a nod to traditional work boots, the timeless silhouette comes covered in rubber reinforcements in high-wear areas. Lace up for tough conditions with this hardy take on a lifestyle classic.\nIntroduced in 1982, the Air Force 1 redefined basketball footwear from the hardwood to the tarmac. It was the first basketball sneaker to house Nike Air, but its innovative nature has since taken a back seat to its status as a street icon. ',
    variations: [
      {
        name: 'Size',
        variationOptions: [
          {
            name: 'Small',
            charge: 15
          },
          {
            name: 'Medium',
            charge: 0
          },
          {
            name: 'Large',
            charge: 30
          }
        ]
      },
      {
        name: 'Color',
        variationOptions: [
          {
            name: 'White',
            charge: 10
          },
          {
            name: 'Black',
            charge: 50
          }
        ]
      },
    ]
  }
}
export default Page

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);