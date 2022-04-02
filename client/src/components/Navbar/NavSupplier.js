/**
 * @author Sumadhur Vaidyula
 */




import React from 'react'
import { useState } from 'react'
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { Nav,Logo,MenuIcon, Menu, NavLinks } from './NavUser.style';
import Button from '@mui/material/Button';
import AdminMenu from '../Dropdown/AdminAccountDropdown';

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
        <NavLinks to="/supplier">Home</NavLinks>
        <NavLinks to="/supplier/orders">Orders</NavLinks>
        <NavLinks to="/supplier/pantry">Pantry</NavLinks>
        <div className="button_container">
        <AdminMenu />
        </div>
      </Menu>
      <div className="button_container">
      <AdminMenu />
        </div>
    </Nav>
  )
}



export default Navbar