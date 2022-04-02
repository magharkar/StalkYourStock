/**
 * @author Vibhor Bhatnagar
 */

import React from "react";
import Navbar from "../../components/Navbar/NavLanding";
import { HeaderWrapper, MainContent, PageWrapper, Row,
  Column, BottomContain, Image } from "./LandingPage.style";
import landingPageImg from '../../assets/pictures/landing-page.png';
import food from '../../assets/pictures/food.png'
import points from '../../assets/pictures/points.png'
import { FooterContainer } from '../../components/Footer/FooterContainer'
import AppButton from '../../components/Button/Button.js'

function LandingPage() {
  return (
    <PageWrapper>
        <HeaderWrapper>
            <Navbar />
        </HeaderWrapper>
            <MainContent>
                <img className="hero_img" src={landingPageImg} alt="hero"/>
                <Row>
                  <Image src={food} width="100%" height="100%"></Image>
                    <Column className="text">
                    <h4>Say 'Yes' to eco-friendly</h4>  
                    <h3>Reduce food wastage</h3>
                    <p>EcoFresh delivers fresh food for the recipes from farmers directly to your doorstep. Only order how much you need and contribute to our goal to be 100% eco-friendly.</p>
                    <div className="mid_button"><AppButton color="secondary">Know more</AppButton></div>
                    </Column>
                </Row>
                <Row className="row2">
                <Image src={points} width="100%" height="100%" style={{objectFit:"contain"}}></Image>
                    <Column className="text">
                    <h4>Earn for your contribution</h4>
                    <h3>Rewards</h3>
                    <p>Now collect reward points for every recipe that you upload on EcoFresh. Redeem these points when checking out during your next purchase from EcoFresh.</p>
                    <div className="mid_button"><AppButton color="secondary">Get Started!</AppButton></div>
                    </Column>
                </Row>
              </MainContent> 
              <BottomContain>
                <FooterContainer />
              </BottomContain>
    </PageWrapper>
  );
}

export default LandingPage;