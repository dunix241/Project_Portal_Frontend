import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

export const Logo = (props) => {
  const theme = useTheme();
  const fillColor = theme.palette.primary.main;

  return (
    <Box component={"img"} src={"/assets/logos/logo.svg"} {...props}/>
  );
};
