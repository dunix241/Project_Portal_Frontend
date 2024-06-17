// ==============================|| OVERRIDES - BUTTON ||============================== //

export default function Button(theme) {
  const disabledStyle = {
    '&.Mui-disabled': {
      backgroundColor: theme.palette.grey[200]
    }
  };

  return {
    MuiButton: {
      defaultProps: {
        disableElevation: true
      },
      styleOverrides: {
        root: {
          fontWeight: 400
        },
        contained: {
          ...disabledStyle
        },
        outlined: {
          ...disabledStyle
        }
      },
      variants: [
        {
          props: { variant: 'gradient' },
          style: {
            color: '#fff',
            background: 'linear-gradient(to right, #2c67f2, #1677FF, #62cff4)',
            backgroundSize: '225% 100%',
            animation: 'anime 6s linear infinite',
            
            // background: 'linear-gradient(-45deg, #FFA63D, #FF3D77, #338AFF, #3CF0C5)',
            // backgroundSize: '600%',
            // animation: 'anime 12s linear infinite',
            
            // background: 'linear-gradient(to right, #25aae1, #40e495, #30dd8a, #2bb673)',
            // boxShadow: '0 4px 15px 0 rgba(49, 196, 190, 0.75)',
            // backgroundSize: '300%',
            // // animation: 'anime 12s linear infinite',
            // '&:hover': {
            //   backgroundPosition: '100% 0',
            //   transition: 'all .4s ease-in-out'
            // },
            
            // background: 'linear-gradient(to right, #25aae1, #40e495, #30dd8a, #2bb673)',
            // boxShadow: '0 4px 15px 0 rgba(49, 196, 190, 0.75)',
            // backgroundSize: '300%',
            // animation: 'anime 12s linear infinite',
            // '&:hover': {
            //   backgroundPosition: '100% 0',
            //   transition: 'all .4s ease-in-out'
            // },
          },
        },
        {
          props: { variant: 'contained', color: 'warning' },
          style: {
            borderColor: theme.palette.primary.main,
            '&:hover': {
              backgroundColor: theme.palette.warning.dark
            }
          }
        }
      ],
    }
  };
}
