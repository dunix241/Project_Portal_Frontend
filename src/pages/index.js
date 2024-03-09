import {useEffect, useState} from 'react';
import {Container, Stack, Typography} from '@mui/material';
import {Layout as UserLayout} from 'src/layouts/user/layout';
import Head from "next/head";
import {ProductSort} from "../sections/product/product-sort";
import ProductFilterSidebar from "../sections/product/product-filter-sidebar";
import {useDispatch, useSelector} from "react-redux";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {ProductList} from "../sections/product/product-list";
import {ProductCartWidget} from "../sections/product/product-cart-widget";
import InfiniteScroll from "react-infinite-scroller";
import {useLazyListProductsQuery} from "../agent/productApiSlice";
import { addProduct } from '../store/productsSlice';

const Page = () => {
  const title = 'Products';
  const [openFilter, setOpenFilter] = useState(false);
  const [isLoadingNext, setIsLoadingNext] = useState(false)
  const {products} = useAppSelector(store => store.products);
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   setIsLoadingNext(true);
  //   dispatch(setPagingParams({...initialPagingParams, pageSize: 8}))
  //   dispatch(resetProducts());
  //   dispatch(listAccum());
  //   setIsLoadingNext(false);
  // }, []);

  const [trigger, {data, error, isLoading, isFetching}] = useLazyListProductsQuery();

  useEffect(() => {
    handleGetNext();

  }, []);
  const handleGetNext = () => {
    trigger({page:0, rowsPerPage:10})
      .unwrap()
      .then(response => {
        console.log(response);
        dispatch(addProduct(response.items));
        console.log(data);
        }
  )

    // setIsLoadingNext(true);
    // dispatch(setPagingParams({pageNumber: pagination.currentPage + 1, pageSize: pagination.pageSize}))
    // dispatch(listAccum());
    // setIsLoadingNext(false);
  }

  const hasMore = !isLoadingNext && !isLoading;
  // const hasMore = !isLoadingNext && !isLoading && !!pagination && pagination.currentPage < pagination.totalPages;
  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleActions = (actionType, data) => {

  }

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Container>
        <Typography variant="h4" sx={{mb: 5}}>
          Products
        </Typography>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end"
               sx={{mb: 5}}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{my: 1}}>
            <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort/>
          </Stack>
        </Stack>

        <InfiniteScroll
          pageStart={0}
          hasMore={hasMore}
          loadMore={handleGetNext}
          initialLoad={Boolean(false)}
        >
          <ProductList products={products}/>
        </InfiniteScroll>
      </Container>
    </>
  );
};

Page.getLayout = (page) => (
  <UserLayout>
    {page}
  </UserLayout>
);

export default Page;
