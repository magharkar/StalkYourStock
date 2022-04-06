import React, { useState, useRef, useEffect } from "react";
import {Container, SelectWrapper, PageWrapper, ContentWrapper} from './Comparison.style';
import axios from 'axios';
import { price_array_1, price_array_2, x } from "./tempStockData";
import StockComparatorChart from "../../components/Charts/StockComparatorChart";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import baseURL from "../../config";
import Navbar from "../../components/Navbar/NavUser";
import { FooterContainer } from "../../components/Footer/FooterContainer";

const tickerData = [
    "VRTX", "ISRG", "UNH", "TDOC", "BRK-A", "JPM", "V", "MA", "PYPL", "AMZN"
, "MSFT", "AAPL", "INTC", "CSCO", "NFLX", "FB", "GOOG", "TSLA", "F"
];


function Comparison() {
    const [ticker1, setTicker1] = React.useState("VRTX");
    const [ticker2, setTicker2] = React.useState("ISRG");
    const [chartData, setChartData] = React.useState({});

    useEffect(() => {
        getTickerData(ticker1, ticker2);
      },[ticker1, ticker2]); 

    const getTickerData = (ticker1, ticker2) => {
        console.log("here");
        const getURL = baseURL +  "/compare_two_tickers?ticker1=" + ticker1 + "&ticker2=" + ticker2;
        axios.get(getURL)
        .then(res => {
            const data = res.data;
           // const {price_array_1, price_array_2, x} = data;
           setChartData(data);
            // setListData({
            //     allData: profileList.data,
            //     filteredData: profileList.data,
            // });
            return data;
        })
    }
    return(
        <PageWrapper>
            <Navbar />
                <Container onClick={(event)=> {
                    event.preventDefault();
                }}>
                    <SelectWrapper>
                        <InputLabel for="ticker1" style={{paddingTop: "16px", paddingRight: "16px", color: "#000", fontWeight: 700}}>Choose first Ticker</InputLabel>
                        <Select name="ticker1" id="ticker1" defaultValue="VRTX" onClick= {(event)=> (event.preventDefault())} onChange={(event) => {
                            event.preventDefault();
                            setTicker1(event.target.value)}}>
                            {
                                tickerData.map(ticker => (
                                    <MenuItem value={ticker} disabled={ticker === ticker2}>{ticker}</MenuItem>
                                ))
                            }
                        </Select>
                    </SelectWrapper>
                    
                    <SelectWrapper>
                        <InputLabel for="ticker2" style={{paddingTop: "16px", paddingRight: "16px", color: "#000", fontWeight: 700}}>Choose another ticker</InputLabel>
                        <Select name="ticker2" id="ticker2" defaultValue="ISRG" onClick= {(event)=> (event.preventDefault())}  onChange={(event) => {
                            event.preventDefault();
                            setTicker2(event.target.value)}}>
                            {
                                tickerData.map(ticker => (
                                    <MenuItem value={ticker} disabled={ticker === ticker1 }>{ticker}</MenuItem>
                                ))
                            }
                        </Select>
                    </SelectWrapper>
                
                <div key={Math.random()} style={{height: 500}}>
                    <StockComparatorChart
                            stock1Name={ticker1}
                            stock1Data={chartData.price_array_1}
                            stock2Name={ticker2} 
                            stock2Data={chartData.price_array_2} 
                            xAxisData={chartData.x} />
                </div>
                    
                </Container>
            <FooterContainer />
        </PageWrapper>
       
    )

}

export default Comparison;
