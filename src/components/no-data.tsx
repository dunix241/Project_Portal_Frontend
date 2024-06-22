import { Box, Button, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

type NoDataProps = {
  containerProps: any,
  imageProps: any,
  resourceName?: string,
  onRetry: () => any,
}

const Container = styled(Paper)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxWidth: '100%',
  padding: 24
})

const Image = styled(Box)({
  width: '150px'
})

const TypographyContainer = styled(Box)({
  marginBottom: '1rem'
})

export default function NoData(props: NoDataProps) {
  const {containerProps, imageProps, resourceName, onRetry = () => {location.reload()}} = props;

  return <Container {...containerProps}>
    <Image
      component={'img'}
      src={'/assets/no-data-img.png'}
      {...imageProps}
    />
    <TypographyContainer>
      <Typography variant={'subtitle1'}>SORRY!</Typography>
      <Typography>We haven't found any <Typography component={'span'} fontWeight={'bold'}>{resourceName || 'data'}</Typography></Typography>
    </TypographyContainer>
    {onRetry &&
      <Button variant={'outlined'} color={'error'} onClick={onRetry}>Retry</Button>
    }
  </Container>
}