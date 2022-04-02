/**
 * @author Meha Desai
 */

import React from 'react'
import Navbar from "../../components/Navbar/NavUser";
import { Typography } from "antd";
import {
    HeaderWrapper,
    MainContent,
    PageWrapper,
    BottomContainer,
    Row,
    Column
} from "./Details.style";
import deliveryMan from "../../assets/pictures/delivery-man.jpeg";
import { FooterContainer } from "../../components/Footer/FooterContainer";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AppButton from "../../components/Button/Button";
import { Paper } from "@mui/material";
import axios from 'axios';

const { Title } = Typography;


export default function Confirmation() {

    const [isSubmit, setIsSubmit] = useState(false);
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const data = localStorage.getItem("formData") ? JSON.parse(localStorage.getItem("formData")) : {}
        // console.log(JSON.parse(data))
        setFormData(data)
        axios.get('http://localhost:3001/api/paymentDetails')
            .then(res => {
                const data = res.data;
                console.log(data);
            })


    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmit(true);
        navigate("/home");
    };

    const { state } = useLocation()
    console.log(state?.formValues)

    return (
        <PageWrapper>
            <HeaderWrapper>
                <Navbar />
            </HeaderWrapper>

            <BottomContainer>
                <MainContent>
                    <img src={deliveryMan} width="100%" height="310px" />
                </MainContent>

                <Paper elevation={3}
                    sx={{
                        width: "50%",
                        marginTop: "auto",
                        marginLeft: "auto",
                        marginRight: "auto"
                    }} >
                    <Box textAlign="left"

                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            width: "90%",
                            justifyContent: "center",
                            marginLeft: "auto",
                            marginRight: "auto",
                            marginTop: "50px",
                            marginBottom: "50px"
                        }}>
                        <Box>
                            <Box textAlign="center" sx={{
                                marginBottom: "50px",
                                marginTop: "30px"
                            }}>
                                <Title level={1} className="title">
                                    Order Confirmation
                                </Title>
                                <Title level={2} className="title">
                                    Payment Successful
                                </Title>
                            </Box>
                            <Row>
                                <Column>
                                    <strong> Order ID: </strong>
                                </Column>
                                <Column>
                                    1234
                                </Column>
                            </Row> <hr />
                            <Row>
                                <Column>
                                    <strong> Delivery Address: </strong>
                                </Column>
                                <Column>
                                    {formData?.apartmentNumber} - {formData?.address}, {formData?.city}, {formData?.province}, {formData?.postal}
                                </Column>
                            </Row>
                            <Row>
                                <Column>
                                    <strong> Instructions for Delivery: </strong>
                                </Column>
                                <Column>
                                    {formData?.instructions}
                                </Column>
                            </Row>
                            <Row>
                                <Column>
                                    <strong> Estimate Delivery Time: </strong>
                                </Column>
                                <Column>
                                    60 Minutes
                                </Column>
                            </Row> <hr />
                            <Row>
                                <Column>
                                    <strong> Your Orders: </strong>
                                </Column>
                                <Column>
                                    1. Chhole Bhature
                                    2. Lasagna
                                </Column>
                            </Row> <hr />
                        </Box>
                        <Box textAlign="center" sx={{
                            marginBottom: "50px",
                            marginTop: "30px"
                        }}>
                            <AppButton color="secondary"
                                onClick={handleSubmit} >
                                Return
                            </AppButton>
                        </Box>
                    </Box>
                </Paper>

                <FooterContainer />
            </BottomContainer>

        </PageWrapper>
    )
}
