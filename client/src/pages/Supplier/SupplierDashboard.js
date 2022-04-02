/**
 * @author Sumadhur Vaidyula
 */


import React from 'react'
import Navbar from "../../components/Navbar/NavSupplier";
import { useNavigate } from "react-router-dom";
import { HeaderWrapper, MainContent, PageWrapper, BottomContainer, Row,
    Column, FooterWrapper,Image } from "../LandingPage/LandingPage.style";
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';
import { FooterContainer } from '../../components/Footer/FooterContainer';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';    
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';

const styles = {
	fullHeightCard: {
		height: "100%",
	},
}



export default function Supplier() {
let navigate = useNavigate();
const routeChange = () =>{ 
    let path = '/supplier/orders'; 
    navigate(path);
  }

  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      
     <Navbar/>
     
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Supplier Dashboard
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" component="p">
          View orders and manage exceptions
        </Typography>
      </Container>
     

      <Container maxWidth >
        <Grid container spacing={5} >
          
            <Grid
              item
              
              xs={20}
              md={4}
            >
              <Card className={styles.fullHeightCard}>
                <CardHeader
                  title="Current Orders"
                  
                  titleTypographyProps={{ align: 'center' }}

                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      mb: 5,
                    }}
                  >
                   
                  </Box>
                
                </CardContent>
                <CardActions>
                
                  <Button  fullWidth variant="outlined" onClick={routeChange} >  
                    View Orders
                  </Button>
                  
                </CardActions>
              </Card>
            </Grid>
            <Grid
              item
              
              xs={20}
              md={4}
            >
              <Card className={styles.fullHeightCard}>
                <CardHeader
                  title="Pantry"
                  
                  titleTypographyProps={{ align: 'center' }}

                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      mb: 5,
                    }}
                  >
                   
                  </Box>
                
                </CardContent>
                <CardActions>
                  <Button fullWidth variant="outlined">
                    View Pantry
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid
              item
              
              xs={20}
              md={4}
            >
              <Card className={styles.fullHeightCard}>
                <CardHeader
                  title="Get Substitutions"
                  
                  titleTypographyProps={{ align: 'center' }}

                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      mb: 5,
                    }}
                  >
                   
                  </Box>
                
                </CardContent>
                <CardActions>
                  <Button fullWidth variant="outlined">
                    View Substitutions
                  </Button>
                </CardActions>
              </Card>
            </Grid>
         
         
        </Grid>
      </Container>
      
     <FooterContainer/>




     
      {/* End footer */}
    </React.Fragment>
  );
}



