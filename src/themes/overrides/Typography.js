// ==============================|| OVERRIDES - TYPOGRAPHY ||============================== //

export default function Typography() {
  return {
    MuiTypography: {
      styleOverrides: {
        gutterBottom: {
          marginBottom: 12
        }
      },
      variants: [
        {
          props: { gradient: true },
          style: {
            background: 'linear-gradient(45deg, #2c67f2, #1677FF, #62cff4)',
            backgroundClip: 'text',
            textFillColor: 'transparent'
          }
        }
      ]
    }
  };
}
