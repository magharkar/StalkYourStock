/**
 * @author Mugdha Agharkar
 */

import styled from "styled-components";

const FlexContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 24px;
`;

const Title = styled.div``;

const TickerWrapper = styled.div`
    width: calc(25% - 24px);
    margin-right: 24px;
    background: yellow;
    min-height: 96px;
`;

export {FlexContainer, Title, TickerWrapper};