/* 
* @author Ruchi Shinde
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
import AppButton from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import baseURL from '../../config';
import PasswordTextBox from '../../components/TextBox/PasswordTextBox';
import { Link } from 'react-router-dom';
import loginImage from '../../assets/pictures/cropped-login-image.jpg';

const Login = () => {
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [isLoginValid, setIsLoginValid] = useState(true);
    let navigate = useNavigate();

    const handleLogin = (emailId, password) => {
        const url = baseURL + "/users/login";
        let userJson = {
            "email": emailId,
            "password": password
        }
        axios.post(url, userJson).then(
            res => {
                console.log(res);
                if (res.status === 200) {
                    console.log("Logged in");
                    localStorage.setItem("emailId",emailId);
                    if(res.data.userType == "customer"){
                        navigate("/home");
                    } 
                    else if(res.data.userType == "admin"){
                        navigate("/admin");
                    }
                    else if(res.data.userType=="supplier"){
                        navigate("/supplier");
                    }
                } else {
                    console.log("sets invalid login")
                    setIsLoginValid(false);
                }
            }
        ) .catch(
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



    console.log("isLoginValid", isLoginValid);

    return (
        <PageWrapper>
            <Navbar hideButtons={true} />
            <Container>
                <ContentWrapper>
                    <FormWrapper>
                        <Title>Login</Title>
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
                            <PasswordTextBox 
                                onChange={(event) => handlePasswordChange(event)}
                                value={password}
                                >
                                Password
                            </PasswordTextBox>
                            <Link to="/forgotPassword" style={linkStyles}>Forgot password?</Link>
                            <Row />
                            <AppButton
                                color="secondary"
                                onClick={() => handleLogin(emailId, password)}
                            >
                                Log In
                            </AppButton>
                            {
                                !isLoginValid && (
                                    <Error>Invalid username or password!</Error>
                                )
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

export default Login