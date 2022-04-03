/**
 * @author Mugdha Agharkar
 */

import styled from "styled-components";

const PageContainer = styled.div`
    min-height: 100vh;
`;

const ContentContainer = styled.div`
    min-height: calc(100vh - 172px);
    background-color: #EFEFEF;
    display: flex;
    justify-content: center;
`;

const Row = styled.div`
    display: flex;
    margin-top: 32px;
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
    width: 518px;
    margin: 16px;
    height: 219px;
    background-color: #EFEFEF;
`;

const FlexContainer = styled.div`
    max-width: 1000px;
    margin: 24px auto;
    background-color: #FFF;
    height: 454px;
    width: calc(100% - 48px);
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
`;

const Title = styled.div`
    font-size: 24px;
    font-weight: 700;
    width: fit-content;
    margin: 24px auto;
`;

const Description = styled.div`
    width: fit-content;
    margin: auto;
    font-weight: 700;
`;

const UserType = styled.div`
    margin: 48px auto 16px auto;

`;

export {PageContainer, ContentContainer, Row, Column, FlexContainer,
    Title, Description, UserType}