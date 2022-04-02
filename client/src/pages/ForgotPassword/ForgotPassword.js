/* 
* @author Ruchi Shinde
*/

import axios from 'axios';
import { useState } from 'react';
import {
    PageWrapper, FormWrapper, ImageWrapper, ContentWrapper,
    Title, ControlContainer, Container, Row, TooltipWrapper, TooltipTitle, TooltipRow
} from '../Login/Login.style';
import TextBox from '../../components/TextBox/Textbox';
import Navbar from '../../components/Navbar/NavLanding';
import { FooterContainer } from '../../components/Footer/FooterContainer';
import AppButton from '../../components/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import baseURL from '../../config';
import PasswordTextBox from '../../components/TextBox/PasswordTextBox';
import { Tooltip } from '@mui/material';


const ForgotPassword = () => {

    let navigate = useNavigate();
    const url = baseURL+"/users/updatePassword"

    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isError, setError] = useState(false);

    const requiredInfoString = "Please fill the required information";
    const emailRegEx = /^[a-zA-Z0-9\.-]+@([a-zA-Z0-9-]+\.)+[a-z]{2,6}$/;
    const passwordRegEx = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*?]).{8,}$/;
    let helperTextForEmail = "";
    let helperTextForPassword = "";
    if((!emailId.match(emailRegEx) || emailId == "") && isError) {
        helperTextForEmail = emailId == "" ? requiredInfoString : "Please enter a valid email id";
    }
    if((!password.match(passwordRegEx) || password == "") && isError) {
        helperTextForPassword = password == "" ? requiredInfoString : "Invalid Password";
    }
    if((password.match(passwordRegEx) && password !== confirmPassword) && isError) {
        helperTextForPassword = password == "" ? requiredInfoString : "Passwords don't match";
    }
    
    const handleForgotPassword = (emailId, password) => {
        let isEmailValid = true;
        let isPasswordValid = true;
        let doPasswordsMatch = true;
        let emptyFieldsDetected = false;

        if(emailId == "" || password =="" || confirmPassword == "") {
            emptyFieldsDetected = true
            setError(true);
            //setIsFormSubmitted(true);
        } else {
            if(!emailId.match(emailRegEx)) {
                isEmailValid = false;
            } if(!password.match(passwordRegEx)) {
                isPasswordValid = false;
            } if(password !== confirmPassword) {
                doPasswordsMatch = false;
            }
            setError(true);
        }
        if(!emptyFieldsDetected && isPasswordValid && doPasswordsMatch && isEmailValid) {
            let userJson = {
                "email": emailId,
                "password": password
            };
            axios.post(url, userJson).then( res => {
                console.log("SUCCESS!")
                navigate('/login');
            }).catch(err => {
                alert(err.response.data);
            });
            
        }
    }

    return (<PageWrapper>
        <Navbar hideButtons={true} />
        <Container>
            <ContentWrapper>
                <FormWrapper>
                    <Title style={{width:"189px"}}>Forgot Password</Title>
                    <ControlContainer>
                        <TextBox
                            onChange={(event) => {
                                console.log("Email : " + event.target)
                                setEmailId(event.target.value)
                            }}
                        >
                            Email
                        </TextBox>
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
                                onChange={(event)=> setPassword(event.target.value)}
                                error={isError && helperTextForPassword !== ""}
                                helperText={helperTextForPassword}
                            >
                                New Password
                            </PasswordTextBox>
                        </Tooltip>
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
                                onChange={(event)=> setConfirmPassword(event.target.value)}
                                error={isError && helperTextForPassword !== ""}
                                helperText={helperTextForPassword}
                            >
                               Confirm Password
                            </PasswordTextBox>
                        </Tooltip>
                        <Row />

                        <AppButton
                            color="secondary"
                            onClick={() => handleForgotPassword(emailId, password)}
                        >
                            CHANGE PASSWORD
                        </AppButton>
                        {
                            // !isLoginValid && (
                            //     <Error>Invalid username or password!</Error>
                            // )
                        }
                    </ControlContainer>
                </FormWrapper>
                <ImageWrapper>
                    <img src="https://cdn.pickuplimes.com/cache/22/13/2213b2b794c1b5c3aa3f120c548f9baa.jpg" />
                </ImageWrapper>
            </ContentWrapper>
            <FooterContainer />
        </Container>

    </PageWrapper>
    )
}

export default ForgotPassword;