import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

const GradientTypography = styled(Typography)(() => ({
  background: 'linear-gradient(45deg, #2c67f2, #1677FF, #62cff4)',
  backgroundClip: 'text',
  textFillColor: 'transparent'
}));

export default GradientTypography;