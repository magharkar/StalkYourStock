/**
 * @author Sumadhur Vaidyula
 */


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import axios from 'axios';
import { orderAPI } from '../../api/API';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from '../../components/Navbar/NavSupplier';
import { FooterContainer } from '../../components/Footer/FooterContainer'


const theme = createTheme();

export default function Orders() {

  let navigate = useNavigate();




  const [Data, setData] = useState([]);
  const [showdata, setShowData] = useState([]);
  const [isError, setIsError] = useState(false);


  useEffect(() => {
    axios.get(`${orderAPI}orders/`).then((data) => {
      console.log(data);
      if (data.status) {
        setData(data.data)
        setShowData(data.data)
      }
      else {
        setIsError(true)
      }
    });
  }, []);


  const handleCardClick = (id) => {
    navigate(`/supplier/orders/${id}`)
}

  return (
    <ThemeProvider theme={theme}>
      {/* <CssBaseline /> */}
      <Navbar />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}

        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h3"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Current Orders
            </Typography>


          </Container>
        </Box>



        <Box
          sx={{
            bgcolor: '#96e0aa',
            pt: 5,
            pb: 2,
          }}
        >
        <Container container spacing={2} maxWidth="300">
        
        <Grid  bgcolor={"#96e0aa"} padding="4rem" sx={{display:'flex'}}> 
            
            {showdata.map((ele) => (
          
              <Card style={{backgroundColor: "#0d401b"}} sx={{maxWidth:"50%",margin:'5px' }} >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2" color="#cfa911">
                    {ele.orderId}
                  </Typography>

                   <Typography color="#cfa911"  variant={"h6"}>
                   Recipe Name:
                   </Typography>
                  <Typography component={"div"} color="#ffffff" >
                     {ele.recipeName &&
                      `${ele.recipeName.slice(0, 1).toUpperCase()}${ele.recipeName.slice(1, ele.recipeName.length)}. `
                    }
                   
                  </Typography>
                  <Typography color="#cfa911">
                    Username:
                  </Typography>
                  <Typography  color="#ffffff">
                {ele.userId}
                  </Typography>
                  <Typography  color="#ffffff">
                    Status: {ele.status}
                  </Typography>

                </CardContent>
                <CardActions>
                  <Button size="small"  onClick={() => handleCardClick(ele.orderId)} >View</Button>
                  <Button size="small">Cancel</Button>
                </CardActions>
              </Card>

            ))}
          </Grid>
        
     
        </Container>
        </Box>
      </main>
      <FooterContainer />
    </ThemeProvider>


  );
}