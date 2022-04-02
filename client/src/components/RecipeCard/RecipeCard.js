/**
 * @author Mugdha Agharkar
 */

import React from 'react';
import {RecipeCard, Key, Value, Row, Title, ImageContainer, Content,
    ContentContainer, ButtonContainer, FlexContainer} from './RecipeCard.style';
import AppButton from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import placeHolderImage from '../../assets/pictures/placeholder.png';

function RecipeCards(props) {
    const {costPerMeal, s3URL, recipeName, mealType, cuisine, ratings} = props.data;
    const navigate = useNavigate();

    const openDetails = () => {
        navigate('/home/recipe', {state: props.data})
    }

    return (
        <React.Fragment>
            <RecipeCard>
                <ContentContainer>
                <Title>{recipeName}</Title>
                    <FlexContainer>
                        <ImageContainer>
                            <img src={s3URL === "" ? placeHolderImage : s3URL} alt="Food!" height="256px" width="256px" />
                        </ImageContainer>
                        <Content>
                            <Row>
                                <Key>Meal Type: </Key>
                                <Value>{mealType}</Value>
                            </Row>
                            <Row>
                                <Key>Cuisine: </Key>
                                <Value>{cuisine}</Value>
                            </Row>
                            <Row>
                                <Key>Cost Per Serving:</Key>
                                <Value>${costPerMeal}</Value>
                            </Row>
                            <Row>
                                <Key>Ratings:</Key>
                                <Value>{ratings}/5</Value>
                            </Row>
                            <ButtonContainer>
                                <AppButton color="secondary" onClick={openDetails}>View Details</AppButton>
                            </ButtonContainer>
                        </Content>
                    </FlexContainer>
                    
                </ContentContainer>
               
            </RecipeCard>   
        </React.Fragment>
     
    );
  }
  
  export default RecipeCards;