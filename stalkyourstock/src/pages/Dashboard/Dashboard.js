/**
 * @author Mugdha Agharkar
 */

import React from "react";
import {PageWrapper, ContentWrapper, TopMetricesContainer, StockTableContainer,
    Heading} from "./Dashboard.style";
import Navbar from "../../components/Navbar/NavUser";
import { FooterContainer } from "../../components/Footer/FooterContainer";
import TopMetricesGrid from "../../components/TopMetricesGrid/TopMetricesGrid";
import StockTable from "../../components/StockTable/StockTable";

function Dashboard(){
    return(
        <PageWrapper>
            <Navbar />
            <ContentWrapper>
                <TopMetricesContainer>
                <Heading>World Metrices</Heading>
                    <TopMetricesGrid />
                </TopMetricesContainer>
                <StockTableContainer>
                    <StockTable />
                </StockTableContainer>
            </ContentWrapper>
            <FooterContainer />
        </PageWrapper>
    )
}

export default Dashboard;
