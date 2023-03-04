import { createTheme } from '@mui/material/styles';
import { ukUA } from '@mui/material/locale';
const theme = createTheme(
  {
    typography: {
      useNextVariants: true,
      fontFamily: "'Montserrat', sans-serif !important",
      fontSize: 14,
    },
  },
  ukUA
);

export default theme;