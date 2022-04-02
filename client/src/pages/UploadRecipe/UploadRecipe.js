/**
 * @author Vibhor Bhatnagar
 */

import React, { useState, useEffect } from 'react'
import { UploadRecipeForm, Title, MainFormContainer, FormInputFields, FormLabel, FormInput, FormInputTextArea, Footer, PageWrapper } from './UploadRecipe.style'
import Navbar from '../../components/Navbar/NavUser'
import { FooterContainer } from '../../components/Footer/FooterContainer'
import uploadRecipeImg from '../../assets/pictures/uploadRecipeBg.png'
import AppButton from '../../components/Button/Button'
import { Modal, Box, Typography } from '@mui/material'
import baseURL from '../../config'
import axios from 'axios'

function UploadRecipe() {

  const initialState = { recipeTitle:"", ingredients:"", cookingTime: "",portionSize: "", description: ""};
  const[formValues, setFormValues] = useState(initialState);
  const[errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [requestId, setRequestId] = useState("");
  const url = baseURL + '/uploadRecipe/requestForm';

  const handleChange = (e) => {
    const { name,value } = e.target;
    setFormValues({...formValues, 
        [name]: value
      }); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateForm(formValues));
    setIsSubmit(true);
    if(Object.keys(errors).length === 0) {
      axios.post(url,{
        "recipeTitle": formValues.recipeTitle,
        "ingredients": formValues.ingredients,
        "cookingTime": formValues.cookingTime,
        "portionSize": formValues.portionSize,
        "description": formValues.description
      }).then(
        res=> {
          setRequestId(res.data.requestId);
        }, (error) => {
          console.log(error);
        });
    }
  };

  useEffect( (e) => {
    if(Object.keys(errors).length === 0 && isSubmit) {
      setModalIsOpen(true);
    };
  }, [errors, isSubmit])

  const validateForm = (value) => {
    const errors = {}
    if(!value.recipeTitle.trim()) {
        errors.recipeTitle = "Recipe Title is mandatory";
    }
    if(!value.ingredients.trim()) {
        errors.ingredients = "Ingredients are mandatory";
    }
    if(!value.cookingTime.trim()) {
        errors.cookingTime = "Cooking time cannot be blank !";
    }
    if(!value.portionSize.trim()) {
        errors.portionSize = "Portion Size cannot be blank !";
    }
    if(!value.description.trim()){
      errors.description = "Description cannot be empty !";
    }
    return errors;
};

  return (
    <PageWrapper style={{backgroundImage: `url(${uploadRecipeImg})`}}>
   <Navbar />
   <Title>Upload a Recipe</Title>
   <MainFormContainer>
      <UploadRecipeForm method='POST ' onSubmit={handleSubmit}>

        <FormInputFields>
          <FormLabel htmlFor='recipeTitle'>Recipe Title</FormLabel>
          <FormInput
          type='text'
          name='recipeTitle'
          key={'recipeTitle'}
          placeholder='Enter recipe title'
          value={formValues.recipeTitle}
          onChange={handleChange}>
          </FormInput>
          <p>{errors.recipeTitle}</p>
        </FormInputFields>

        <FormInputFields>
          <FormLabel htmlFor='ingredients'>Ingredients</FormLabel>
          <FormInput
          type='text'
          name='ingredients'
          key={'ingredients'}
          placeholder='Enter ingredients'
          value={formValues.ingredients}
          onChange={handleChange}>
          </FormInput>
          <p>{errors.ingredients}</p>
        </FormInputFields>

        <FormInputFields>
          <FormLabel htmlFor='cookingTime'>Cooking Time</FormLabel>
          <FormInput
          type='text'
          name='cookingTime'
          key={'cookingTime'}
          placeholder='Enter cooking time'
          value={formValues.cookingTime}
          onChange={handleChange}>
          </FormInput>
          <p>{errors.cookingTime}</p>
        </FormInputFields>

        <FormInputFields>
          <FormLabel htmlFor='portionSize'>Portion Size</FormLabel>
          <FormInput
          type='text'
          name='portionSize'
          key={'portionSize'}
          placeholder='Enter portion size'
          value={formValues.portionSize}
          onChange={handleChange}>
          </FormInput>
          <p>{errors.portionSize}</p>
        </FormInputFields>

        <FormInputFields>
          <FormLabel htmlFor='description'>Description</FormLabel>
          <FormInputTextArea
          name='description'
          key={'description'}
          placeholder='Enter description'
          value={formValues.description}
          onChange={handleChange}>
          </FormInputTextArea>
          <p>{errors.description}</p>
        </FormInputFields>
        <AppButton color='secondary' type='submit'>SUBMIT</AppButton>
      </UploadRecipeForm>
   </MainFormContainer>
    <Modal
      open={modalIsOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
    <Box sx={{position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: '#1d3124',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,}}>
      <Typography id="modal-modal-title" variant="h6" component="h2" style={{color: "#fdad11", textAlign: 'center'}}>
        <p>Upload request submitted.</p>
        <p>Request Reference number: {requestId}</p>
      </Typography>
      <AppButton color='secondary' type='submit' onClick={() => setModalIsOpen(false)} style={{marginLeft: "160px"}}>Go Back</AppButton>
    </Box>
    </Modal>
   <Footer><FooterContainer /></Footer>
   </PageWrapper>
  )
}

export default UploadRecipe