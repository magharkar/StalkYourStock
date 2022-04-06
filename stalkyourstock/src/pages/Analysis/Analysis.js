/**
 * @author Mugdha Agharkar
 */

import React, { useState, useEffect } from "react";
import baseURL from "../../config";
import axios from "axios";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { PageWrapper, ContentWrapper, SelectWrapper, Row } from "./Analysis.style";
import Navbar from "../../components/Navbar/NavUser";
import ApexChart from "../../components/Charts/LineChart";
import { FooterContainer } from "../../components/Footer/FooterContainer";

const tickerData = [
    "VRTX", "ISRG", "UNH", "TDOC", "BRK-A", "JPM", "V", "MA", "PYPL", "AMZN"
, "MSFT", "AAPL", "INTC", "CSCO", "NFLX", "FB", "GOOG", "TSLA", "F"
];


function Analysis() {
    const [ticker, setTicker] = React.useState("VRTX");
    const [analysisData, setAnalysisData] = useState({});

useEffect(() => {
    const data = getTickerData("VRTX");
    //const {price_array_1, price_array_2, x} = data;
    //updateGraph(price_array_1, price_array_2, x);
    }, []); 

    const getTickerData = (recentTicker) => {
        console.log("so many times");
        const getURL = baseURL + "/get_day_wise_data?ticker=" + recentTicker;
        axios.get(getURL)
            .then(res => {
                const data = res.data;
                    setAnalysisData(data.response);
        setTicker(recentTicker);
                return data;
        })
    }

    return(
        <PageWrapper>
            <Navbar />
            <ContentWrapper>
                <SelectWrapper>
                    <InputLabel for="ticker1" style={{paddingTop: "16px", paddingRight: "16px", color: "#000", fontWeight: 700}}>Choose Ticker</InputLabel>
                    <Select name="ticker1" id="ticker1" defaultValue="VRTX" onClick= {(event)=> (event.preventDefault())} onChange={(event) => {
                        event.preventDefault();
                        getTickerData(event.target.value)}}>
                        {
                            tickerData.map(ticker => (
                                <MenuItem value={ticker}>{ticker}</MenuItem>
                            ))
                        }
                    </Select>
                </SelectWrapper>
                
                    <div key={ticker}>{
                            analysisData.daily_returns && (
                        <div>
                            <Row>
                                <ApexChart 
                                    //key={ticker}
                                    index={"Daily Returns " + ticker} 
                                    x_axis={analysisData.daily_returns.x} 
                                    y_axis={analysisData.daily_returns.returns} 
                                    description={"Daily Returns " + ticker}
                                    width="500px"  
                                />
                                <ApexChart 
                                    //key={ticker}
                                    index={"Closing Price " + ticker}
                                    x_axis={analysisData.monthly_returns[0].x} 
                                    y_axis={analysisData.monthly_returns[0].closing_price} 
                                    description={"Closing Price " + ticker}
                                    width="500px"  
                                />
                            </Row>
                            <Row>
                                <ApexChart
                                   // key={ticker}
                                    index={"Price Data " + ticker}
                                    x_axis={analysisData.price_data.x} 
                                    y_axis={analysisData.price_data.adj_closing_price} 
                                    description={"Price Data " + ticker}
                                    width="500px"  
                                />
                                <ApexChart 
                                    //key={ticker}
                                    index={"Volume data" + ticker}
                                    x_axis={analysisData.volume_data.x} 
                                    y_axis={analysisData.volume_data.volume} 
                                    description={"Volume data " + ticker}
                                    width="500px"  
                                />
                            </Row>
                        </div>
                    )}
                    </div>
               
            </ContentWrapper>
            <FooterContainer />
        </PageWrapper>
    )
}

export default Analysis;
