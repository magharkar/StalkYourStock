/**
 * @author Mugdha Agharkar
 */

import styled from "styled-components";

const FlexContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 24px;
`;

const Title = styled.div`
    font-weight: 700;
`;

const TickerWrapper = styled.div`
    width: calc(25% - 24px);
    margin-right: 24px;
    background: #FFF;
    min-height: 96px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
`;

const TickerFlex = styled.div`
    display: flex;
    flex-direction: column;
    margin: 24px 0px 24px 24px;
`;

const Close = styled.div`
    margin-top: 8px;
`;

const Percentage = styled.div`
    margin: 24px;
    color: green;
    font-size: 24px;
    &.negative {
        color: red;
    }
`;

export {FlexContainer, Title, TickerWrapper, TickerFlex, Close, Percentage};