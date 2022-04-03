/**
 * @author Mugdha Agharkar
 */

import React from 'react'
import { Nav,Logo } from './NavLanding.style'
function Navbar(props) {
  return (
    <Nav>
        <Logo href="">
            S<span>talk</span>Y<span>our</span>S<span>tock</span>
        </Logo>
    </Nav>
  )
}

export default Navbar;