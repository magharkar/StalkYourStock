import styled from 'styled-components';

const PageWrapper = styled.div`
`;

const ContentWrapper = styled.div`
    min-height: calc(100vh - 172px);
`;
const Container = styled.div`
    padding: 24px;
    background: biege;
    z-index: 5000;
    border: 1px solid blue;
`;

const SelectWrapper = styled.div`
    display: flex;
    padding-bottom: 16px;
    //width: 60%;
    //justify-content: space-between;
`;

export { Container , SelectWrapper, ContentWrapper, PageWrapper}