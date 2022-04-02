/**
 * @author Vibhor Bhatnagar
 */

import React from 'react'
import Navbar from '../../components/Navbar/NavUser'
import { FooterContainer } from '../../components/Footer/FooterContainer'
import { PageWrapper, Row, Column, Card } from './UploadRecipeHero.style'
import AppButton from '../../components/Button/Button'
import { useNavigate } from 'react-router-dom'

function UploadRecipeHero() {
    const navigate = useNavigate();
  return (
      <PageWrapper>
          <Navbar />
          <Row>
              <Column>
                <Card>
                    <h3 style={{marginTop: '30px'}}>REWARD POINTS</h3>
                    <p>Start contributing to the cooking community</p>
                    <p>Upload your first recipe and start earning</p>
                    <AppButton color='secondary' style={{marginTop: '5px'}} onClick={() => {navigate("/uploadRecipe")}}>Upload a Recipe</AppButton>
                </Card>
              </Column>
                
              <Column>
                <Card>
                    <h3 style={{marginTop: '55px'}}>ALREADY UPLOADED?</h3>
                    <p>Check the status of request here</p>
                    <AppButton color='secondary' style={{marginTop: '15px'}} onClick={() => {navigate("/checkReqStat")}}>Check upload request</AppButton>
                </Card>
              </Column>
          </Row>
          <FooterContainer />
      </PageWrapper>
  )
}

export default UploadRecipeHero