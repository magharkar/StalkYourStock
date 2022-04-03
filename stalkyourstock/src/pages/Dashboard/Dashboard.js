/**
 * @author Mugdha Agharkar
 */

import React from "react";
import {PageWrapper, ContentWrapper, TopMetricesContainer, StockTableContainer} from "./Dashboard.style";
import Navbar from "../../components/Navbar/NavUser";
import { FooterContainer } from "../../components/Footer/FooterContainer";
import TopMetricesGrid from "../../components/TopMetricesGrid/TopMetricesGrid";

function Dashboard(){
    return(
        <PageWrapper>
            <Navbar />
            <ContentWrapper>
                <TopMetricesContainer>
                    <TopMetricesGrid />
                </TopMetricesContainer>
                <StockTableContainer>

                </StockTableContainer>
            </ContentWrapper>
            <FooterContainer />
        </PageWrapper>
    )
}

export default Dashboard;
