/**
 * @author Mugdha Agharkar
 */

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          textPrimary: {
            background: "white",
            color: 'black',
            '&:hover': {
                background: "white",
                color: 'black',
            }
          },
          textSecondary: {
            background: "#FDAD11",
            color: 'black',
            '&:hover': {
                background: "#FDAD11",
                color: 'black',
            }
          }
        },
      },
    },
  });

  export default theme;
