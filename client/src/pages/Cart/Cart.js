/**
 * @author Mugdha Agharkar
 */

import React from "react";
import Navbar from '../../components/Navbar/NavUser'
import { FooterContainer } from '../../components/Footer/FooterContainer'
import {Container, CartContainer} from './Cart.style';

function Cart() {
    let email = localStorage.getItem("emailId");
    console.log(email);
    return(
        <Container>
            <Navbar />
            <CartContainer style={{padding: "100px"}}>
                This will contain all the items in the cart.
                It is still a work in progress.
            </CartContainer>
            <FooterContainer />
        </Container>
    )
}

export default Cart;