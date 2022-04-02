import React from 'react'
import { Container } from './AdminHomepage.style'
import Navbar from '../../components/Navbar/NavAdmin'
import { FooterContainer } from '../../components/Footer/FooterContainer'

function AdminHomepage() {
  return (
    <Container>
      <Navbar />
      <FooterContainer />
    </Container>    
  )
}

export default AdminHomepage