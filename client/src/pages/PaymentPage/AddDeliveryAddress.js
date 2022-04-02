/**
 * @author Meha Desai
 */

import React from "react";
import Navbar from "../../components/Navbar/NavUser";
import { Typography } from "antd";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    HeaderWrapper,
    MainContent,
    PageWrapper,
    BottomContainer,
    Row,
} from "./AddDeliveryAddress.style";
import deliveryMan from "../../assets/pictures/delivery-man.jpeg";
import { FooterContainer } from "../../components/Footer/FooterContainer";
import { TextField, Box, Paper } from "@mui/material";
import AppButton from "../../components/Button/Button";

const { Title } = Typography;

function AddDeliveryAddress() {
    const values = {
        email: "",
        fname: "",
        lname: "",
        address: "",
        apartmentNumber: "",
        city: "",
        province: "",
        postal: "",
        number: "",
        instructions: "",
    };

    const [formErrors, setFormErrors] = useState(values);
    const [formValues, setFormValues] = useState(values);
    const [isSubmit, setIsSubmit] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {


        if (Object.keys(formErrors).length === 0 && isSubmit) {
            navigate("/details", { state: { formValues } });
        }
    }, [formErrors]);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setFormValues(formValues);
        setIsSubmit(true);

        fetch('http://localhost:3001/api/paymentDetails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                formValues
            }),
        })
            .then((res) => res.json())
            .then((result) => setFormValues(result.rows))
            .catch((formErrors) => console.log('error'))

    };

    const REGEX = {
        NAME: /^[a-zA-Z ,.'-]+$/,
        NUMBER: /^([0-9]{10})$/,
        CODE: /^[A-Z]{1}[0-9]{1}[A-Z]{1} [0-9]{1}[A-Z]{1}[0-9]{1}$/,
        EMAIL: /^[a-z0-9.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        APTNO: /^[0-9]+$/,

    };

    const validate = (value) => {
        const errors = {};
        if (!value.fname) {
            errors.fname = "First Name is Required!";
        } else if (!REGEX.NAME.test(value.fname)) {
            errors.fname = "Enter valid First Name";
        }
        if (!value.lname) {
            errors.lname = "Last Name is Required!";
        } else if (!REGEX.NAME.test(value.lname)) {
            errors.lname = "Enter valid Last Name";
        }
        if (!value.email) {
            errors.email = "Email is Required!";
        } else if (!REGEX.EMAIL.test(value.email)) {
            errors.email = "Enter valid email address";
        }
        if (!value.number) {
            errors.number = "Phone Number is Required!";
        } else if (!REGEX.NUMBER.test(value.number)) {
            errors.number = "Enter valid Phone Number";
        }
        if (!value.postal) {
            errors.postal = "Postal Code is Required!";
        } else if (!REGEX.CODE.test(value.postal)) {
            errors.postal = "Enter valid Postal Code";
        }
        if (!value.address) {
            errors.address = "Street Adress is Required!";
        }
        if (!value.apartmentNumber) {
            errors.apartmentNumber = "Apartment Number is Required!";
        } else if (!REGEX.APTNO.test(value.apartmentNumber)) {
            errors.apartmentNumber = "Enter valid Apartment No";
        }
        if (!value.city) {
            errors.city = "City is Required!";
        }
        if (!value.province) {
            errors.province = "Province is Required!";
        }

        return errors;
    };

    return (
        <PageWrapper>
            <HeaderWrapper>
                <Navbar />
            </HeaderWrapper>

            <BottomContainer>
                <MainContent>
                    <img src={deliveryMan} width="100%" height="310px" />
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
                                    marginTop: "30px",
                                    marginBottom: "50px"
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <div>
                                    <Title level={1} className="title">
                                        Add Delivery Address
                                    </Title>
                                    <TextField
                                        fullWidth
                                        required
                                        name="email"
                                        id="outlined-required"
                                        label="Email"
                                        placeholder="Enter Email"
                                        margin="normal"
                                        value={formValues.email}
                                        onChange={handleChange}
                                        error={!!formErrors.email}
                                        helperText={formErrors.email ? formErrors.email : ""}
                                    />
                                    <TextField
                                        fullWidth
                                        required
                                        id="outlined-required"
                                        name="fname"
                                        label="First Name"
                                        placeholder="Enter First Name"
                                        margin="normal"
                                        value={formValues.fname}
                                        onChange={handleChange}
                                        error={!!formErrors.fname}
                                        helperText={formErrors.fname ? formErrors.fname : ""}
                                    />
                                    <TextField
                                        fullWidth
                                        required
                                        id="outlined-required"
                                        name="lname"
                                        label="Last Name"
                                        placeholder="Enter Last Name"
                                        margin="normal"
                                        value={formValues.lname}
                                        onChange={handleChange}
                                        error={!!formErrors.lname}
                                        helperText={formErrors.lname ? formErrors.lname : ""}
                                    />
                                    <TextField
                                        fullWidth
                                        required
                                        id="outlined-required"
                                        name="address"
                                        label="Street Address"
                                        placeholder="Enter Street Address"
                                        margin="normal"
                                        value={formValues.address}
                                        onChange={handleChange}
                                        error={!!formErrors.address}
                                        helperText={formErrors.address ? formErrors.address : ""}
                                    />
                                    <TextField
                                        fullWidth
                                        required
                                        id="outlined-required"
                                        name="apartmentNumber"
                                        label="Apartment No."
                                        placeholder="Enter Apartment No."
                                        margin="normal"
                                        value={formValues.apartmentNumber}
                                        onChange={handleChange}
                                        error={!!formErrors.apartmentNumber}
                                        helperText={formErrors.apartmentNumber ? formErrors.apartmentNumber : ""}
                                    />
                                    <TextField
                                        fullWidth
                                        required
                                        id="outlined-required"
                                        name="city"
                                        label="City"
                                        placeholder="Enter City"
                                        margin="normal"
                                        value={formValues.city}
                                        onChange={handleChange}
                                        error={!!formErrors.city}
                                        helperText={formErrors.city ? formErrors.city : ""}
                                    />
                                    <TextField
                                        fullWidth
                                        required
                                        id="outlined-required"
                                        name="province"
                                        label="Province"
                                        placeholder="Enter Province"
                                        margin="normal"
                                        value={formValues.province}
                                        onChange={handleChange}
                                        error={!!formErrors.province}
                                        helperText={formErrors.province ? formErrors.province : ""}
                                    />
                                    <TextField
                                        fullWidth
                                        required
                                        id="outlined-required"
                                        name="postal"
                                        label="Postal Code"
                                        placeholder="Enter Postal Code"
                                        margin="normal"
                                        value={formValues.postal}
                                        onChange={handleChange}
                                        error={!!formErrors.postal}
                                        helperText={formErrors.postal ? formErrors.postal : ""}
                                    />
                                    <TextField
                                        fullWidth
                                        required
                                        id="outlined-required"
                                        name="number"
                                        label="Phone Number"
                                        placeholder="Enter Phone Number"
                                        margin="normal"
                                        value={formValues.number}
                                        onChange={handleChange}
                                        error={!!formErrors.number}
                                        helperText={formErrors.number ? formErrors.number : ""}
                                    />
                                    <TextField
                                        fullWidth
                                        id="outlined-multiline-static"
                                        name="instructions"
                                        label="Instructions for Delivery"
                                        multiline
                                        rows={4}
                                        placeholder="Enter Descriptions"
                                        margin="normal"
                                        value={formValues.instructions}
                                        onChange={handleChange}
                                    />

                                </div>
                                <div>
                                    <AppButton color="secondary"
                                        onClick={handleSubmit} >
                                        Submit
                                    </AppButton>
                                </div>
                            </Box>
                        </Paper>
                    </Row>
                </MainContent>
                <FooterContainer />
            </BottomContainer>
        </PageWrapper>
    );
}

export default AddDeliveryAddress;
