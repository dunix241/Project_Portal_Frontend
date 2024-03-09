// @mui
import { Grid } from '@mui/material';
import { ShopProductCard } from './product-card';

// ----------------------------------------------------------------------

export const ProductList = ({products, ...other}) => (
  <Grid container spacing={3} {...other}>
    {products?.map((product, index) => (
      <Grid key={index} item xs={12} sm={6} md={3}>
        <ShopProductCard product={product}/>
      </Grid>
    ))}
  </Grid>
)
