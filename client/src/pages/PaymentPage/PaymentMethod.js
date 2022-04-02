/**
 * @author Meha Desai
 */

import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";


import Payment from "./Payment";
import {
    HeaderWrapper,
    MainContent,
    PageWrapper,
    BottomContainer,
    Row,
} from "./AddDeliveryAddress.style";
import { Box, Paper } from "@mui/material";
import cardPayment from "../../assets/pictures/card-payment.png";
import { FooterContainer } from "../../components/Footer/FooterContainer";
import Navbar from "../../components/Navbar/NavUser";


const stripePromise = loadStripe('pk_test_51KhEA9D3pnjAoJfMFmML7iTQCnqznYxc0ANnAzWVVSi2c1hVV7368SDniaQ0iCG5nsulXb9aYgBsaqF5O6YPLUD600zfv6Tf0k');

export default function PaymentMethod() {
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {

        // Create PaymentIntent as soon as the page loads
        fetch("http://localhost:3001/checkout/payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: [{ paymentId: "p1" }] }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, []);

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div className="App">
            <PageWrapper>
                <HeaderWrapper>
                    <Navbar />
                </HeaderWrapper>

                <BottomContainer>
                    <MainContent>
                        <img src={cardPayment} width="100%" height="310px" />
                        <Row>
                            <Paper
                                elevation={3}
                                sx={{
                                    width: "60%",
                                    marginTop: "auto",
                                    marginLeft: "auto",
                                    marginRight: "auto"
                                }}
                            >
                                <Box
                                    textAlign="center"
                                    component="form"
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        width: "70%",
                                        justifyContent: "center",
                                        marginLeft: "auto",
                                        marginRight: "auto",
                                        marginTop: "20px",
                                        marginBottom: "50px"
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    {clientSecret && (
                                        <Elements options={options} stripe={stripePromise}>
                                            <Payment />
                                        </Elements>
                                    )}
                                </Box>
                            </Paper>
                        </Row>
                    </MainContent>
                    <FooterContainer />
                </BottomContainer>
            </PageWrapper>
        </div>
    );
}