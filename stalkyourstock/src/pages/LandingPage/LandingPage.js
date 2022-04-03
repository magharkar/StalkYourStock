/**
 * @author Mugdha Agharkar
 */

import React from 'react';
import Navbar from '../../components/Navbar/NavLanding';
import { PageContainer, ContentContainer, Row, Column, FlexContainer, Description, Title, UserType } from './LandingPage.style';
import {FooterContainer} from '../../components/Footer/FooterContainer';
import { Button, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
    const navigate = useNavigate();
    return (
        <PageContainer>
            <Navbar />
            <ContentContainer>
                <FlexContainer>
                    <Title>Welcome to StalkYourStock!</Title>
                    <Description> A one-stop site to get stock info, analysis and comparison.</Description>
                    <Row>
                        <Column>
                            <UserType>New user?</UserType>
                            <Button variant="outlined" style={{width: "fit-content", margin: "16px auto"}} onClick={() => {navigate("/registration")}}>Get Started</Button>
                        </Column>
                        <Divider sx={{backgroound: "#1565c0"}} orientation="vertical" flexItem />
                        <Column>
                            <UserType>Existing user?</UserType>
                            <Button variant="outlined" style={{width: "fit-content", margin: "16px auto"}} onClick={() => {navigate("/login")}}>Welcome back!</Button>
                        </Column>
                    </Row>
                </FlexContainer>
            </ContentContainer>
            <FooterContainer />
        </PageContainer>
    )
}

export default LandingPage;
