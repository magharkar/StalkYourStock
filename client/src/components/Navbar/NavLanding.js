/**
 * @author Vibhor Bhatnagar
 */

import React from 'react'
import { useState } from 'react'
import { Button } from '@mui/material';
import { Nav,Logo,MenuIcon, Menu, NavLinks, ButtonContainer } from './NavLanding.style'
import { useNavigate } from 'react-router-dom';
import AppButton from "../Button/Button";
function Navbar(props) {

  const [isClicked, setIsClicked] = useState(false);
  const { hideButtons } = props;
  const navigate = useNavigate();

  const handleClick = (route) => {
        navigate(route);
  }

  return (
    <Nav>
        <Logo href="">
            E<span>co</span>F<span>resh</span>
        </Logo>

        <MenuIcon onClick={() => setIsClicked(!isClicked)}>
            <span />
            <span />
            <span />
         </MenuIcon>
      
        <Menu isClicked={isClicked}>
            <NavLinks to="/about">About</NavLinks>
            <NavLinks to="/howItWorks">How It Works</NavLinks>
            <NavLinks to="/pricing">Pricing</NavLinks>

            {
                !hideButtons && (
                    <ButtonContainer className = "btn_container" onClick={(event)=> {
                        event.preventDefault();
                    }}>
                        <AppButton onClick={() => handleClick("/login")}>LOGIN</AppButton>
                        <AppButton color="secondary"  onClick={() => handleClick("/register")}>SIGNUP</AppButton>
                    </ButtonContainer>
                )
            }

           
        </Menu>
            {
                !hideButtons && (
                    <ButtonContainer className = "btn_container">
                        <AppButton onClick={() => handleClick("/login")}>LOGIN</AppButton>
                        <AppButton color="secondary" onClick={() => handleClick("/register")}>SIGNUP</AppButton>
                    </ButtonContainer>
                )
            }
    </Nav>
  )
}

export default Navbar;