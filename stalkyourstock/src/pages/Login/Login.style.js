/**
 * @author Mugdha Agharkar
 */

import styled from 'styled-components';

const PageWrapper = styled.div`
    background: #fff;
    height: 100vh;
`;

const FormWrapper = styled.div`
    width: 50%;
    max-height: 540px;
    &.registration__page {
        max-height: 840px;
    }
    margin: auto 0px;
    @media (max-width: 768px) {
        width: 100%;
    }
`;

const  ImageWrapper = styled.div`
    width: 50%;
    &.login__page{
         height: inherit;
    }
    max-height: 560px;
    &.registration__page {
        max-height: 840px;
    }
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    @media (max-width: 768px) {
        display: none;
    }
`;

const  ContentWrapper = styled.div`
    display: flex;
    height: 100%;
`;

const Title = styled.div`
    font-weight: bold;
    font-size: 24px;
    width: 64px;
    margin: 0px auto;
    margin-bottom: 54px;
    &.registration__page {
        width: 140px;
        margin-top: 32px;
    }
    @media (max-width: 768px) {
       margin-top: 32px;
    }
`;

const ControlContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 70%;
    max-width: 400px;
    min-width: 200px;
    margin: 16px auto;
    @media (max-width: 768px) {
        margin-bottom: 40px;
     }
`;

const Container = styled.div`
    min-height: calc(100vh - 172px);
     &.login__page {
        height: calc(100vh - 172px);
     }
`;

const Row = styled.div`
    padding: 16px;
`;

const Error = styled.div`
    color: red;
    width: fit-content;
    margin: 16px auto;
`;

const TooltipWrapper = styled.div`
     background-color: white;
     color: black;
     padding: 16px;
`;

const TooltipTitle = styled.div`
     font-weight: bold;
     padding-bottom: 8px;
`;

const TooltipRow = styled.div`
     padding-bottom: 4px;
`;

const ErrorMail = styled.div`
     padding-top: 4px;
     color: red;
`;

export {PageWrapper, FormWrapper, ImageWrapper, ContentWrapper, ErrorMail,
    Title, ControlContainer, Container, Row, Error, TooltipWrapper, TooltipTitle, TooltipRow};