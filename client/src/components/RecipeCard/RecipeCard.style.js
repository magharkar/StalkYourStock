/**
 * @author Mugdha Agharkar
 */

import styled from 'styled-components';

const RecipeCard = styled.div`
    margin-right: 24px; 
    margin-top: 24px;
    display: flex;
    background-color: #EFEFEF;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    min-width: 312px;
    justify-content: center;
    @media (min-width: 1730px) {
        width: calc(25% - 24px);
    }
    @media (min-width: 1380px) and (max-width: 1729px) {
        width: calc(33% - 24px);
    }
    @media (min-width: 1035px) and (max-width: 1379px) {
        width: calc(50% - 24px);
    }
    @media (max-width: 1034px) {
        width: calc(100% - 24px);
    }
`;
const ImageContainer = styled.div`
    width: 256px;
    height: 256px;
    margin: 8px;
`;
const Content = styled.div`
    margin-top: 16px;
`;

const LeftColumn = styled.div`
    display: flex;
    flex-direction: column;
`;

const RightColumn = styled.div`
    display: flex;
    flex-direction: column;
`;

const Row = styled.div`
    width: 256px;
    display: flex;
    justify-content: space-between;
    padding-bottom: 16px;
    padding-left: 8px;
    font-family:  "Roboto","Helvetica","Arial","sans-serif";
    font-size: 16px;
    word-wrap: break-all;
    &.title {
        font-weight: bold;
    }
`;


const Key = styled.div`
    margin-right: 4px
`;
const Value = styled.div`
    font-weight: 700;
`;
const Title = styled.div`

    font-weight: bold;
    width: fit-content;
    margin: 0px auto 8px auto;
`;

const Description = styled.div`
    margin-bottom: 8px;
`;

const ContentContainer = styled.div`
    margin: 24px;
    @media (min-width: 1035px) {
        margin: 24px auto;
    }
`;

const FlexContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const ButtonContainer = styled.div`
    width: fit-content;
    margin:auto;
`;


export {RecipeCard, ImageContainer, Content, LeftColumn, RightColumn, Key, Value, Row, Title, 
    Description, ContentContainer, ButtonContainer, FlexContainer};