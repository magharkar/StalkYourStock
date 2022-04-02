/**
 * @author Mugdha Agharkar
 */

import styled from 'styled-components'
import { withStyles } from '@mui/styles';
import { TextField } from '@mui/material';

const Container = styled.div`
  background: #fff;
  height: 100vh;
`;

const ContentContainer = styled.div`
    position: relative;
    display: flex;
`;

const Content = styled.div`
    width: calc(100vw - 240px );
    @media (max-width: 768px) {
      width: 100%;
    }
`;

const CssTextField = withStyles({
    root: {
      '& label.Mui-focused': {
        color: '#1d3124',
      },
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: "#1d3124 !important",
        '&.Mui-focused': {
          borderColor: "#1d3124",
        }
      },
      '& fieldset.MuiOutlinedInput-notchedOutline.Mui-focused': {
          borderColor: '#1d3124 !important',
      },
    },
  })(TextField);

  const SearchBar = styled.div`
    margin: 24px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const FlexContainer = styled.div`
    display: flex;
    //height: calc(100vh - 68.5px)
    padding-bottom: 24px;
    &.no__results {
      margin: 0px 24px;
    }
    &.no__results .main__content {
      margin: auto;
      width: 100%;
    }
    &.no__results .recipe__container {
      margin: auto;
      width: 100%;
      background: #EFEFEF;
    }
     
`;

const MainContent = styled.div``;

const RecipeContainer = styled.div`
    display: flex;
    flex-wrap: wrap; 
    // gap: 24px;
    margin: 0 32px;
`;

const NoResults = styled.div`
    //background-color: #EFEFEF;
    padding: 24px; 
    margin: auto;
`;

const AccordionContainer = styled.div`
    display: none;
    @media (max-width: 768px) {
      margin-top: 24px;
      display: block;
      width: 100%;
    }
`;

const FilterContainer  = styled.div`
    background-color: #1d3124;
    @media (max-width: 768px) {
      display: none;
    }
`;

export {Container, ContentContainer, Content, SearchBar, FlexContainer, MainContent,
RecipeContainer, CssTextField, NoResults, AccordionContainer, FilterContainer};
