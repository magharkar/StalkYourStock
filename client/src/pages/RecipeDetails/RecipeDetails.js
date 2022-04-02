/**
 * @author Mugdha Agharkar
 */

import React, { useState } from 'react'
import Navbar from '../../components/Navbar/NavUser'
import { FooterContainer } from '../../components/Footer/FooterContainer'
import {useLocation} from 'react-router-dom';
import {Container, FlexContainer, ContentContainer, ImageIngredientsContainer, Directions, DirectionsText, OrderInfo,
    ImageContainer, IngredientsContainer, RecipeName, DescriptionContainer, SubHeader, Row, Key, Value, Heading,
ButtonContainer, CardContainer, List, ImageWrapper} from './RecipeDetails.style';
import AppButton from '../../components/Button/Button';
import axios from 'axios';
import baseURL from '../../config';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import uploadRecipeImg from '../../assets/pictures/uploadRecipeBg.png'


function RecipeDetails() {
    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = React.useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    console.log(location);
    const emailId = localStorage.getItem("emailId");

    const {costPerMeal, cuisine, description, ingredients, mealType, recipeName, s3URL} = location.state;
    const ingredientsArray = ingredients.split(",");
    const descriptionArray = description.split('.');

    const  handleGoBack = () => {
        handleClose();
        navigate("/home");
    }

    const handleGoToCart = () => {
        handleClose();
        navigate('/cart');
    }

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    const handleAddToCart = () => {
        const postUrl = baseURL + "/cart/addToCart";
        console.log(postUrl);
        handleClickOpen();
        axios.post(postUrl, {
            qty: quantity,
            recipeName,
            price: costPerMeal,
            userEmail: emailId,
        })
        .then(function (response) {
        if(response.status === 200) {
            handleClickOpen();
        }
        })
        .catch(function (error) {
          console.log(error);
        });

    }
    
    return (
        <Container>
            <Navbar />
            <ImageWrapper style={{backgroundImage: `url(${uploadRecipeImg})`}}>
                <ContentContainer>
                    <CardContainer>
                    <Heading>
                            <RecipeName>{recipeName}</RecipeName>
                            <SubHeader>Category : {cuisine} {mealType}</SubHeader>
                    </Heading>
                        <FlexContainer>
                                
                            <ImageIngredientsContainer>
                                <ImageContainer>
                                    <img src={s3URL} alt="Food!" height="256px" width="256px" />
                                </ImageContainer>
                                <IngredientsContainer>
                                    <ul>
                                        {
                                            ingredientsArray.map(ingredient => (
                                                <List>{ingredient}</List>
                                            ))
                                        }
                                    </ul>
                                </IngredientsContainer> 
                            </ImageIngredientsContainer>
                            <Directions>   
                                <div>
                                        <DirectionsText>Directions</DirectionsText>
                                        <DescriptionContainer>
                                        <ul>
                                                {
                                                    descriptionArray.map(ingredient => {
                                                        const shouldRender = ingredient.trim() !== "";
                                                        return (
                                                            shouldRender && (
                                                                <List>{ingredient.trim()}</List>
                                                            )
                                                    )})
                                                }
                                            </ul>
                                        </DescriptionContainer>
                                </div>
                                
                                <OrderInfo>
                                    <Row>
                                        <Key>Cost Per Meal: </Key>
                                        <Value>{costPerMeal}</Value>
                                    </Row>
                                    <ButtonContainer>
                                        <FormControl style={{width: "100px", marginRight: "24px"}}>
                                            <InputLabel id="demo-simple-select-label">Quantity</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={quantity}
                                                label="Quantity"
                                                onChange={(event) => setQuantity(event.target.value)}
                                            >
                                                <MenuItem value={1}>1</MenuItem>
                                                <MenuItem value={2}>2</MenuItem>
                                                <MenuItem value={3}>3</MenuItem>
                                                <MenuItem value={4}>4</MenuItem>
                                                <MenuItem value={5}>5</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <AppButton color="secondary" onClick={handleAddToCart}>Add to cart</AppButton>
                                    </ButtonContainer>
                                    
                                </OrderInfo>
                            


                            </Directions>
                        </FlexContainer>
                    </CardContainer>
                    
                </ContentContainer>
            </ImageWrapper>

            <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        
      >
        <DialogTitle id="alert-dialog-title"
            style={{backgroundColor: "#1d3124", color: "#FFF"}}
        >
          {"Successful!"}
        </DialogTitle>
        <DialogContent style={{backgroundColor: "#1d3124", color: "#FFF"}}>
          <DialogContentText id="alert-dialog-description" style={{backgroundColor: "#1d3124", color: "#FFF"}}>
            Your recipe has been successfully added to the cart. 
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{backgroundColor: "#1d3124", color: "#FFF"}}>
          <AppButton onClick={handleGoBack}>Go back to Dashboard</AppButton>
          <AppButton onClick={handleGoToCart} color="secondary" autoFocus>
            Go to Cart
          </AppButton>
        </DialogActions>
      </Dialog>
    </div>
            <FooterContainer />
        </Container>    
    )
}

export default RecipeDetails