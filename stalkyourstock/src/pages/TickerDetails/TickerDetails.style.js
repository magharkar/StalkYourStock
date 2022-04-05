import styled from "styled-components";

const PageWrapper = styled.div`
    background-color: #EFEFEF;
`;

const ContentWrapper = styled.div`
    min-height: calc(100vh - 172px);
`;

const FlexContainer = styled.div`
    display: flex;
    max-width: 1000px;
    margin: auto;
`;

const TableWrapper = styled.div`
    width: 50%;
`;

const GraphContainer = styled.div`
    background-color: #FFF;
    padding-top: 40px;
    padding-left: 40px;
`;

export { PageWrapper, ContentWrapper, FlexContainer, TableWrapper, GraphContainer }
