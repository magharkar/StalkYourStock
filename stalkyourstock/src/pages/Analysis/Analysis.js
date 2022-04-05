/**
 * @author Mugdha Agharkar
 */

import React, { useState, useEffect } from "react";
import baseURL from "../../config";
import axios from "axios";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { PageWrapper, ContentWrapper, SelectWrapper } from "./Analysis.style";
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
    const data = getTickerData(ticker);
    //const {price_array_1, price_array_2, x} = data;
    //updateGraph(price_array_1, price_array_2, x);
    }); 

    const getTickerData = (ticker) => {
    const getURL = baseURL + "/get_day_wise_data?ticker=" + ticker;
    axios.get(getURL)
    .then(res => {
        const data = res.data;
        const jsonData = JSON.parse(data);
        setAnalysisData(jsonData);
        return data;
    })
}

    return(
        <PageWrapper>
            <Navbar />
            <ContentWrapper>
                <SelectWrapper>
                    <InputLabel for="ticker1">Choose first Ticker</InputLabel>
                    <Select name="ticker1" id="ticker1" defaultValue="VRTX" onClick= {(event)=> (event.preventDefault())} onChange={(event) => {
                        event.preventDefault();
                        setTicker(event.target.value)}}>
                        {
                            tickerData.map(ticker => (
                                <MenuItem value={ticker}>{ticker}</MenuItem>
                            ))
                        }
                    </Select>
                </SelectWrapper>
                {
                    analysisData.daily_returns && (
                        <div>
                            <ApexChart 
                                index="Daily Returns" 
                                x_axis={analysisData.daily_returns.x} 
                                y_axis={analysisData.daily_returns.returns} 
                                description="Daily Returns"
                                width="500px"  
                            />
                            <ApexChart 
                                index="Closing Price" 
                                x_axis={analysisData.monthly_returns.x} 
                                y_axis={analysisData.monthly_returns.closing_price} 
                                description="Closing Price"
                                width="500px"  
                            />
                            <ApexChart 
                                index="Price Data"
                                x_axis={analysisData.price_data.x} 
                                y_axis={analysisData.price_data.adj_closing_price} 
                                description="Price Data"
                                width="500px"  
                            />
                            <ApexChart 
                                index="Volume data"
                                x_axis={analysisData.volume_data.x} 
                                y_axis={analysisData.volume_data.volume} 
                                description="Volume data"
                                width="500px"  
                            />
                        </div>
                    )
                }
               
            </ContentWrapper>
            <FooterContainer />
        </PageWrapper>
    )
}

export default Analysis;
