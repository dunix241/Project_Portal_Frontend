import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

const GradientButton = (component) => styled(component)(() => ({
  background: 'linear-gradient(45deg, #2c67f2, #1677FF, #62cff4, #62cff4)',
  backgroundSize: '450%',
  animation: 'anime 16s linear infinite'
}));

export default GradientButton;