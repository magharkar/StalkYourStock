/**
 * @author Vibhor Bhatnagar
 */

import React, { useState, useEffect } from 'react'
import { PageWrapper, Title, MainFormContainer, UploadRecipeForm, FormInputFields, FormLabel, FormInput, Footer } from './CheckRequestStatus.style'
import Navbar from '../../components/Navbar/NavUser'
import { FooterContainer } from '../../components/Footer/FooterContainer'
import AppButton from '../../components/Button/Button'
import { Modal,Box,Typography } from '@mui/material'
import baseURL from '../../config'
import axios from 'axios'

function CheckRequestStatus() {

    const initialState = { requestId: ""};
    const[formValues, setFormValues] = useState(initialState);
    const[errors, setErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [status, setStatus] = useState("");
    const url = baseURL + "/uploadRecipe/" + formValues.requestId;
  
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
        axios.get(url).then(
          res=> {
            console.log(res.data)
            setStatus(res.data);
          }, (error) => {
            console.log(error);
          });
      }
    };

    const validateForm = (value) => {
        const errors = {}
        if(!value.requestId.trim()) {
            errors.requestId = "Request Id cannot be blank";
        }
        return errors;
    };

    useEffect( (e) => {
        if(Object.keys(errors).length === 0 && isSubmit) {
          setModalIsOpen(true);
        };
      }, [errors, isSubmit])

  return (
    <PageWrapper>
        <Navbar />
        <Title>Check request status</Title>
        <MainFormContainer>
        <UploadRecipeForm method='POST ' onSubmit={handleSubmit}>

        <FormInputFields>
          <FormLabel htmlFor='requestId'>Enter Request ID</FormLabel>
          <FormInput
          type='text'
          name='requestId'
          placeholder='Enter request ID'
          value={formValues.requestId}
          onChange={handleChange}>
          </FormInput>
          <p>{errors.requestId}</p>
        </FormInputFields>

        <AppButton color='secondary' type='submit'>Check status</AppButton>
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
                <p>Status : {status}</p>
            </Typography>
            <AppButton color='secondary' type='submit' onClick={() => setModalIsOpen(false)} style={{marginLeft: "160px"}}>Go Back</AppButton>
            </Box>
        </Modal>
        <Footer><FooterContainer /></Footer>
    </PageWrapper>
  )
}

export default CheckRequestStatus