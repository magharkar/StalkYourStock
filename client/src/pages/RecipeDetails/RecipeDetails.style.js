/**
 * @author Mugdha Agharkar
 */

import styled from "styled-components";

const Container = styled.div`
   // height: 100vh;
   // background-color: #C3F1A9; 
`;

const FlexContainer = styled.div`
    display: flex;
    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

const ContentContainer = styled.div`
    padding: 60px;
    @media (min-width: 1365px) {
        width: 1305px;
    margin: auto;
    }
    @media (max-width: 478px) {
        background-color: #FFF;
        padding: 0;
    }
`;

const ImageIngredientsContainer = styled.div`
    padding: 24px; 
    min-width: 256px;
    width: 30%;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    @media (max-width: 478px) {
        padding: 0;
    }
`;

const RecipeName = styled.h1`
    width: fit-content;
    margin: auto;
`;

const DescriptionContainer = styled.div`
`;

const Directions = styled.div`
    padding: 24px;
`;

const ImageContainer = styled.div`
    width: fit-content;    
    margin: 0 auto;
`;

const IngredientsContainer = styled.div`
    padding: 8px;
    width: fit-content;    
    margin: 0 auto;
`;

const SubHeader = styled.div`
    width: fit-content;
    margin: auto;
    margin-bottom: 8px;
`;

const DirectionsText = styled.div`
    font-weight: 700;
`;

const Row = styled.div`
    font-weight: 700;
    display: flex;
`;

const Key = styled.div``;

const Value = styled.div`
    margin-left: 8px;
`;

const OrderInfo = styled.div`
    padding-top: 24px;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 16px;
`;

const CountDropdown = styled.select`
    width: 68px;
    margin-right: 16px;
    position: relative;
`;

const Heading = styled.div``;

const CardContainer = styled.div`
    background-color: #FFF; 
    padding: 32px;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
`;

const List = styled.li`
    padding-top: 6px;
`;

const ImageWrapper = styled.div``;

export {Container, FlexContainer, ContentContainer, ImageIngredientsContainer, Directions, OrderInfo,
    ImageContainer, IngredientsContainer, RecipeName, DescriptionContainer, SubHeader, DirectionsText, Row,
Key, Value, ButtonContainer, CountDropdown, Heading, CardContainer, List, ImageWrapper};