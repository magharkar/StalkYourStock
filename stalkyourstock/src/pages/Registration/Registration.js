/**
 * @author Mugdha Agharkar
 */

import axios from 'axios';
import { useState } from 'react';
import {
    PageWrapper, FormWrapper, ImageWrapper, ContentWrapper, ErrorMail,
    Title, ControlContainer, Container, Row, TooltipWrapper, TooltipTitle, TooltipRow
} from '../Login/Login.style';
import TextBox from "../../components/TextBox/Textbox";
import Navbar from '../../components/Navbar/NavLanding';
import { FooterContainer } from '../../components/Footer/FooterContainer';
import { Link, useNavigate } from 'react-router-dom';
//import baseURL from '../../config';
import PasswordTextBox from '../../components/TextBox/PasswordTextBox';
import { Tooltip } from '@mui/material';
import { Button } from '@mui/material';
import stockImage from '../../assets/pictures/stocks.jpg'
import baseURL from '../../config';

const Registration = () => {

    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isError, setError] = useState(false);
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [invalidPassword, setInvalidPassword] = useState(false);
    const [matchingPassword, setMatchingPasswordError] = useState(false);
    const [emailExistsError, setEmailExistsError] = useState(false);

    const requiredInfoString = "Please fill the required information";
    const emailExistsString = "This Email Id already exists"
    const emailRegEx = /^[a-zA-Z0-9\.-]+@([a-zA-Z0-9-]+\.)+[a-z]{2,6}$/;
    const passwordRegEx = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*?]).{8,}$/;
    const url = baseURL + "/register"
    let helperTextForEmail = "";
    let helperTextForPassword = "";
    if ((!emailId.match(emailRegEx) || emailId == "") && isError) {
        helperTextForEmail = emailId == "" ? requiredInfoString : "Please enter a valid email id";
    }
    if ((!password.match(passwordRegEx) || password == "") && isError) {
        helperTextForPassword = password == "" ? requiredInfoString : "Invalid Password";
    }
    if ((password.match(passwordRegEx) && password !== confirmPassword) && isError) {
        helperTextForPassword = password == "" ? requiredInfoString : "Passwords don't match";
    }


    const registrationHandler = (firstName, lastName, emailId, password, confirmPassword) => {
        const emailRegEx = /^[a-zA-Z0-9\.-]+@([a-zA-Z0-9-]+\.)+[a-z]{2,6}$/;
        const passwordRegEx = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*?]).{8,}$/;
        let isEmailValid = true;
        let isPasswordValid = true;
        let doPasswordsMatch = true;
        let emptyFieldsDetected = false;

        if (firstName === "" || lastName === "" || emailId === "" || password === "" || confirmPassword === "") {
            emptyFieldsDetected = true
            setError(true);
            //setIsFormSubmitted(true);
        } else {
            if (!emailId.match(emailRegEx)) {
                isEmailValid = false;
            } if (!password.match(passwordRegEx)) {
                isPasswordValid = false;
            } if (password !== confirmPassword) {
                doPasswordsMatch = false;
            }
            setError(true);
        }
        if (!emptyFieldsDetected && isPasswordValid && doPasswordsMatch && isEmailValid) {
            let userJson = {
                "email": emailId,
                // "firstName": firstName,
                // "lastName": lastName,
                "password": password,
                //"userType": "customer"
            };
            axios.post(url, userJson).then(res => {
                navigate('/home');
            }).catch(err => {
                setEmailExistsError(true);
            });

        }
    }

    const linkStyles = {
        paddingTop: "8px",
        textAlign: "center"
      };

    return (
       
        <PageWrapper>
            <Navbar hideButtons={true} />
            <Container>
                <ContentWrapper>
                    <FormWrapper className="registration__page">
                        <Title className="registration__page">Registration</Title>
                        <ControlContainer>
                            <TextBox
                                required
                                error={firstName === "" && isError}
                                helperText={firstName === "" && isError ? requiredInfoString : ""}
                                onChange={(event) => setFirstName(event.target.value)}
                            >
                                First name
                            </TextBox>
                            <Row />
                            <TextBox
                                required
                                error={lastName === "" && isError}
                                helperText={lastName === "" && isError ? requiredInfoString : ""}
                                onChange={(event) => setLastName(event.target.value)}
                            >
                                Last name
                            </TextBox>
                            <Row />
                            <TextBox
                                required
                                onChange={(event) => setEmailId(event.target.value)}
                                error={(emailId === "" || !emailId.match(emailRegEx)) && isError}
                                helperText={helperTextForEmail}
                            >
                                Email
                            </TextBox>
                            {
                                emailExistsError && (
                                    <ErrorMail>{emailExistsString}</ErrorMail>
                                )
                            }
                            <Row />
                            <Tooltip
                                title={
                                    <TooltipWrapper>
                                        <TooltipTitle>Password Requirements</TooltipTitle>
                                        <TooltipRow>1 Number</TooltipRow>
                                        <TooltipRow>1 Special Character</TooltipRow>
                                        <TooltipRow>1 Uppercase Letter</TooltipRow>
                                        <TooltipRow>1 Lowercase Letter</TooltipRow>
                                        <TooltipRow>Minimum 8 characters</TooltipRow>
                                    </TooltipWrapper>
                                }
                            >
                                <PasswordTextBox
                                    required
                                    onChange={(event) => setPassword(event.target.value)}
                                    error={isError && helperTextForPassword !== ""}
                                    helperText={helperTextForPassword}
                                >
                                    Password
                                </PasswordTextBox>
                            </Tooltip>
                            <Row />
                            <PasswordTextBox
                                required
                                onChange={(event) => setConfirmPassword(event.target.value)}
                                error={isError && helperTextForPassword !== ""}
                                helperText={helperTextForPassword}
                            >
                                Confirm Password
                            </PasswordTextBox>
                            <Row />
                            <Button
                                variant="outlined"
                                onClick={() => registrationHandler(firstName, lastName, emailId, password, confirmPassword)}
                            >
                                Register
                            </Button>
                            <Link to="/login" style={linkStyles}>Already a member? Login here</Link>
                            <Row />
                            
                        </ControlContainer>
                    </FormWrapper>
                    <ImageWrapper className="registration__page">
                        <img src={stockImage} alt="stock Image" />
                    </ImageWrapper>
                </ContentWrapper>
                <FooterContainer />
            </Container>

        </PageWrapper>
    )
}

export default Registration;