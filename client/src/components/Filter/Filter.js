/**
 * @author Mugdha Agharkar
 */

import React, {useState, useEffect} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Container, FilterText, ButtonContainer} from './Filter.style';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '../Checkbox/Checkbox';
import AppButton from '../Button/Button';
import MaterialUIForm from 'react-material-ui-form'
import JssProvider from 'react-jss/lib/JssProvider';
import axios from 'axios';
import baseURL from '../../config';

function Filter(props) {
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const handleSubmit = (values, pristineValues) => {
      console.log(values, pristineValues);
    }

    const applyFilters = () => {
      props.getSelectedFilters(selectedFilters);
    }

    useEffect(() => {
      const getFilterDataURL = baseURL + '/recipes/getFilterValues';
      axios.get(getFilterDataURL)
      .then(res => {
          const data = res.data;
          setFilterData(data);
          console.log(data);
      })
    },[]);

    useEffect(() => {
      console.log("HELLO THERE");
    });

    function handleCheckbox(event, isChecked, value) {
      const selection = event.target.name;
      let currentlySelectedFilters = selectedFilters;
      if(currentlySelectedFilters.includes(selection)) {
        const id = currentlySelectedFilters.indexOf(selection);
        currentlySelectedFilters.splice(id, 1);
      } else {
        currentlySelectedFilters.push(selection);
      }
      
      setSelectedFilters(currentlySelectedFilters);
    }
    console.log(selectedFilters);
    const {isMobileView} = props;

    return (
        <Container isMobileView={isMobileView}>
            <FilterText>Filters</FilterText>
            <JssProvider>
                <MaterialUIForm onSubmit={handleSubmit} onValuesChange={handleSubmit}>
                    {
                      filterData.map(data => {
                        console.log(data.key);
                        return (
                          <Accordion sx={{backgroundColor: isMobileView ? "#EFEFEF" : "#355c43"}} defaultExpanded>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                              sx={{color: isMobileView ? "#355c43" : "#FDAD11"}}
                            >
                              <Typography 
                                  style={{textTransform:"capitalize"}}
                              >
                                  {data.filterKey === "mealTypes" ? "Meal Types" : data.filterKey}
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails
                                sx={{color: isMobileView ? "#000" : "#FFF"}}  
                            >
                                <FormGroup>
                                  {
                                    data.filterValues.map(value => (
                                        <FormControlLabel 
                                            control={<Checkbox 
                                                        onChange={(event) => handleCheckbox(event)} 
                                                        category={data.filterKey}
                                                        name={value}
                                                        isMobileView={isMobileView}
                                                    />} 
                                            label={value} />
                                    ))
                                  }
                                </FormGroup>
                            </AccordionDetails>
                          </Accordion>
                        )
                      })
                    }
                    <ButtonContainer>
                        <AppButton color="secondary" type="submit" onClick={applyFilters}>Apply</AppButton>
                    </ButtonContainer>
                </MaterialUIForm>
            </JssProvider>
</Container>
     
    );
  }
  
  export default Filter;