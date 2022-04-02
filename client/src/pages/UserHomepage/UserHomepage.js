/**
 * @author Mugdha Agharkar
 */

import React, { useEffect } from 'react'
import { Container, ContentContainer, Content, CssTextField, SearchBar as SearchBarContainer,
FlexContainer, MainContent, RecipeContainer, NoResults, AccordionContainer, FilterContainer  } from './UserHomepage.style'
import Navbar from '../../components/Navbar/NavUser'
import { FooterContainer } from '../../components/Footer/FooterContainer'
import Filter from '../../components/Filter/Filter'
import IconButton from '@mui/material/IconButton';
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from '@mui/icons-material/Search';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import RecipeCards from '../../components/RecipeCard/RecipeCard';
import axios from 'axios';
import baseURL from '../../config';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { cloneDeep } from 'lodash'

const filterData = [
  {
    filterKey: "mealType",
    filterValues: ["Salads", "Breakfast", "Appetizers", "Soups", "Main Course"]
  },
  {
    filterKey: "cuisine",
    filterValues: ["Mediterranean", "American", "Italian", "Asian", "Mexican", "Indian"]
  },
  {
    filterKey: "ratings",
    filterValues: ["1", "2", "3", "4", "5"]
  }
];

function UserHomepage() {
  const [sortBy, setSortKey] = React.useState('');
  const [recipes, setAllRecipes] = React.useState([]);

    useEffect(() => {
      const getRecipeURL = baseURL + '/recipes/allRecipes';
      axios.get(getRecipeURL)
      .then(res => {
          const data = res.data;
          setAllRecipes(data);
          console.log(data);
      })
    }, []);

    const applyFilters = (selectedFilters) => {
      let filterDataCopy = cloneDeep(filterData);
      console.log(selectedFilters);
      let filterRequest = [];
      if(selectedFilters.length === 0) {
        const getRecipeURL = baseURL + '/recipes/allRecipes';
        axios.get(getRecipeURL)
        .then(res => {
          const data = res.data;
          setAllRecipes(data);
          console.log(data);
      })
        return;
      }
      selectedFilters.map(selectedFilter => {
        filterDataCopy.map(data => {
          if(data.filterValues.includes(selectedFilter)) {
            let keyAlreadyPresent = false;
            filterRequest.map(req => {
              if(req.filterKey === data.filterKey) {
                keyAlreadyPresent = true;
                req.filterValues.push(selectedFilter);
              }
              return req;
            })
            if(!keyAlreadyPresent) {
              let valueArray = [];
              valueArray.push(selectedFilter);
              filterRequest.push({
                filterKey: data.filterKey,
                filterValues: valueArray,
              })
            }
          }
          return data;
        })
        return selectedFilter;
      })

      console.log("filterRequest", filterRequest);
      handleFilterPostRequest(filterRequest);
    }

    const clearAllFilters = () => {
        const getRecipeURL = baseURL + '/recipes/allRecipes';
        axios.get(getRecipeURL)
        .then(res => {
            const data = res.data;
            setAllRecipes(data);
            console.log(data);
        })
    }

    const handleFilterPostRequest = (filterRequest) => {
      const postUrl = baseURL + "/recipes/filterResults";
      axios.post(postUrl, filterRequest)
      .then(function (response) {
        setAllRecipes(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    const handleSortRequest = (key, asc) => {
      const postUrl = baseURL + "/recipes/sort?key=" + key + "&asc=" + asc;
      console.log(postUrl);
      axios.get(postUrl)
      .then(function (response) {
        setAllRecipes(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    const handleChange = (event) => {
      const option = event.target.value;
      setSortKey(option);

      let key="costPerMeal";
      let asc = false;
      if(option === 1) {
        key =  "costPerMeal";
        asc = true;
      } else if(option === 2) {
        key =  "costPerMeal";
        asc = false;
      } else if(option === 3) {
        key =  "ratings";
        asc = true;
      } else {
        key =  "ratings";
        asc = false;
      }
      handleSortRequest(key, asc);
    };

    const handleKeyPress = (event) => {
      if(event.code === "Enter") {
        const searchKey = event.target.value;
        const requestURL = baseURL + "/recipes/search?searchKey=" + searchKey;
        axios.get(requestURL)
        .then(function (response) {
          setAllRecipes(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
      }

    }

  return (
    <Container>
      <Navbar />
      <ContentContainer>
        <FilterContainer>
          <Filter 
              //filterData={filterData} 
              isMobileView={false}
              getSelectedFilters={(selectedFilters) => applyFilters(selectedFilters)}
              clearAllFilters={clearAllFilters}
          />
        </FilterContainer>
            <Content>
            <SearchBarContainer>
              <CssTextField
                style={{width: "40%", minWidth: "267px"}}
                label="What would you like to eat?"
                InputProps={{
                  onKeyPress: (event) => handleKeyPress(event),
                  endAdornment: (
                    <InputAdornment>
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-standard-label">Sort By</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={sortBy}
                    onChange={handleChange}
                    label="Sort By"
                    sx={{
                      borderColor:"red",

                    }}
                    inputProps={{
                      style: {
                        borderColor: "red !important",
                        color: "red !important"
                      }
                    }}
                  >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={1}>Price - low to high</MenuItem>
                      <MenuItem value={2}>Price - high to low</MenuItem>
                      <MenuItem value={3}>Rating - low to high</MenuItem>
                      <MenuItem value={4}>Rating - high to low</MenuItem>
                    </Select>
                </FormControl>

              <AccordionContainer>
                <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                        <Typography>Filters</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Filter 
                        //filterData={filterData} 
                        isMobileView={true}
                        getSelectedFilters={(selectedFilters) => applyFilters(selectedFilters)}
                        clearAllFilters={clearAllFilters}
                    />
                  </AccordionDetails>
                </Accordion>
              </AccordionContainer>
                

            </SearchBarContainer>
            <FlexContainer className={recipes.length === 0 && 'no__results'}>
                <MainContent className="main__content">
                  <RecipeContainer className="recipe__container">
                  {
                    recipes.length === 0 ? (
                      <NoResults>No results found!</NoResults>
                    ) : 
                    recipes.map(cardData => (
                      <RecipeCards data={cardData} />
                    ))                      
                  }
                  </RecipeContainer>
                </MainContent>
              </FlexContainer>
            </Content>
      </ContentContainer>
      <FooterContainer />
    </Container>    
  )
}

export default UserHomepage