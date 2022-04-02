/**
 * @author Sumadhur Vaidyula
 */



import React, { useEffect, useState } from 'react';
import { useNavigate,useParams } from 'react-router-dom';
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
  const params = useParams();

  useEffect(() => {
    axios.get(`${orderAPI}orders/${params.id}`).then((data) => {
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
    axios.post(`${orderAPI}/update/${params.id}`).then((data) => {
        console.log(data);
        if (data.status) {
          setIsError(false)
      }
      else {
          setIsError(true)
      }
      });
    
    navigate(`/supplier/orders/fulfilment/${id}`)
}

  return (
   
    <div>
         <Navbar />




<Card>
     
    <Box padding="2rem" bgcolor={"#96e0aa"}>
        <Box mt={2} display="flex"  justifyContent="center"
        >
        
          
            <Box padding="2rem"  width={400}  justifyContent="center">
                <Grid style={{textAlign: "center"}} align = "center"> 
                <Card variant='outlined'style={{backgroundColor: "#0d401b"}} >
                <Typography component={"div"} variant={"h6"} color="#cfa911">
                    Recipe name:
                    {showdata.Recipe_name}
                </Typography>
                <Typography  color="#ffffff"  padding={1} margin={2}>Username: {showdata.user_id}</Typography>
                <Typography color="#ffffff" padding={1} margin={2}> Order id:{showdata.Order_id}</Typography>
                <Typography color="#ffffff" padding={1} margin={2}>Ingredients: {showdata.Ingredients}</Typography>
                <Button variant="contained" align="center"  onClick={() => handleCardClick(showdata.Order_id)} padding={2} margin={2}>Fulfill</Button>
       {/* <Button variant="outlined">Cancel</Button> */}
                </Card>
                </Grid>
            </Box>
        </Box>

     
     
        
       
    </Box>
    </Card>
    <FooterContainer />
</div>
  );
}