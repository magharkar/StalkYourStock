/**
 * @author Mugdha Agharkar
 */

import axios from 'axios';
import { useState } from 'react';
import {
    PageWrapper, FormWrapper, ImageWrapper, ContentWrapper,
    Title, ControlContainer, Container, Row, Error
} from './Login.style';
import TextBox from '../../components/TextBox/Textbox';
import Navbar from '../../components/Navbar/NavLanding';
import { FooterContainer } from '../../components/Footer/FooterContainer';
import { useNavigate } from 'react-router-dom';
import PasswordTextBox from '../../components/TextBox/PasswordTextBox';
import { Link } from 'react-router-dom';
import stockImage from '../../assets/pictures/stocks.jpg'
import { Button } from '@mui/material';
import baseURL from '../../config';

function Login(){
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [isLoginValid, setIsLoginValid] = useState(true);
    let navigate = useNavigate();

    const handleLogin = (emailId, password) => {
        const url = baseURL + "/login";
        let userJson = {
            "email": emailId,
            "password": password
        }
        axios.post(url, userJson).then(
            res => {
                if (res.status === 200) {
                    localStorage.setItem("emailId",emailId);
                    navigate('/home');
                } else {
                    setIsLoginValid(false);
                }
            }
        ).catch(
            error => {
               setIsLoginValid(false);
            }
        )
    }
    const linkStyles = {
        paddingTop: "8px",
        textAlign: "right"
      };

    const handlePasswordChange = (event) => {
        let password = event.target.value;
        //if (password.length >= 8) {
            setPassword(password);
        //}

    }




    return (
        <PageWrapper>
            <Navbar hideButtons={true} />
            <Container className='login__page'>
                <ContentWrapper>
                    <FormWrapper>
                        <Title>Login</Title>
                        <ControlContainer>
                            <TextBox
                                onChange={(event) => {
                                    setEmailId(event.target.value)
                                }}
                            >
                                Email
                            </TextBox>
                            <Row />
                            <PasswordTextBox 
                                onChange={(event) => handlePasswordChange(event)}
                                value={password}
                                >
                                Password
                            </PasswordTextBox>
                            <Link to="/forgotPassword" style={linkStyles}>Forgot password?</Link>
                            <Row />
                            <Button
                                variant="outlined"
                                onClick={() => handleLogin(emailId, password)}
                            >
                                Log In
                            </Button>
                            {
                                !isLoginValid && (
                                    <Error>Invalid username or password!</Error>
                                )
                            }
                        </ControlContainer>
                    </FormWrapper>
                    <ImageWrapper className='login__page'>
                        <img src={stockImage} alt="img"/>
                    </ImageWrapper>
                </ContentWrapper>
            </Container>
            <FooterContainer />

        </PageWrapper>
    )
}

export default Login