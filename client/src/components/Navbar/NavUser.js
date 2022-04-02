/**
 * @author Vibhor Bhatnagar
 */

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Nav,Logo,MenuIcon, Menu, NavLinks } from './NavUser.style'
import React, {useEffect} from 'react'
import { useState } from 'react'
import AccountMenu from '../Dropdown/HomeAccountDropdown';
import axios from 'axios';
import baseURL from '../../config';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import {useNavigate} from 'react-router-dom';

function Navbar() {


  const [isClicked, setIsClicked] = useState(false);

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
        <NavLinks to="/home">Home</NavLinks>
        <NavLinks to="/uploadRecipeNavigation">Upload Recipe</NavLinks>
        <div className="button_container">
            <ShoppingButton />
          <AccountMenu />
        </div>
      </Menu>
        <div className="button_container">
            <ShoppingButton />
          <AccountMenu />
        </div>
    </Nav>
  )
}

const ShoppingButton = () => {

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 23,
      background: '#fdad11',
      padding: '0 4px',
      color: "#000"
    },
  }));


  const [cartQuantity, setCartQuantity] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const emailId = localStorage.getItem("emailId");
    const getCartDataURL = baseURL + '/cart/getAllItemsInCart/' + emailId;
    axios.get(getCartDataURL)
    .then(res => {
        //const data = res.data;
        console.log(emailId, res.data);
        let qty = 0;
        res.data.data.map(recipe => {
          qty += recipe.qty;
          return recipe;
        })
       setCartQuantity(qty);
    })
  });


  return (
  <button className="buttons" onClick={() => navigate("/cart")}>
    <StyledBadge badgeContent={cartQuantity}>
        <ShoppingCartIcon />
    </StyledBadge>
  </button>);
};

export default Navbar