import { Card, CardContent } from '@mui/material';
import { Fragment } from 'react';
import { Skeleton } from '@mui/lab';
import { styled } from '@mui/material/styles';

type CardSkeletonProps = {
  cardProps: any
}

const Container = styled(Card)({
  borderRadius: 16
})

export default function CardSkeleton(props) {
  const {cardProps} = props
  return <Card {...cardProps}>
    <Skeleton sx={{ height: 150 }} animation="wave" variant="rectangular"/>
    <CardContent
      sx={{ height: 95 }}
    >
      <Fragment>
        <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }}/>
        <Skeleton animation="wave" height={10} width="80%"/>
      </Fragment>
    </CardContent>
  </Card>;
}