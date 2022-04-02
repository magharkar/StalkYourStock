/**
 * @author Vibhor Bhatnagar
 */

import React from 'react'
import { useState } from 'react'
import { Nav,Logo,MenuIcon, Menu, NavLinks } from './NavUser.style'
import AdminMenu from '../Dropdown/AdminAccountDropdown';
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

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
        <NavLinks to="/admin">Home</NavLinks>
        <NavLinks to="/admin">Analytics</NavLinks>
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