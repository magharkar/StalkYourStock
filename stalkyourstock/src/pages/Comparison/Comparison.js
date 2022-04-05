import React, { useState, useRef, useEffect } from "react";
import {Container, SelectWrapper} from './Comparison.style';
import axios from 'axios';
import { price_array_1, price_array_2, x } from "./tempStockData";
import StockComparatorChart from "../../components/Charts/StockComparatorChart";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const tickerData = [
    "VRTX", "ISRG", "UNH", "TDOC", "BRK-A", "JPM", "V", "MA", "PYPL", "AMZN"
, "MSFT", "AAPL", "INTC", "CSCO", "NFLX", "FB", "GOOG", "TSLA", "F"
];


function Comparison() {
    const [ticker1, setTicker1] = React.useState("VRTX");
    const [ticker2, setTicker2] = React.useState("ISRG");
    console.log(ticker1);
    console.log(ticker2);

    useEffect(() => {
        // const data = getTickerData(ticker1, ticker2);
        // const {price_array_1, price_array_2, x} = data;
       // updateGraph(price_array_1, price_array_2, x);
      }); 

    const getTickerData = (ticker1, ticker2) => {
        const getURL = "localhost:5000/get_data_for_tickers?ticker1=" + ticker1 + "&ticker2=" + ticker2;
        axios.get(getURL)
        .then(res => {
            const data = res.data;
            // setListData({
            //     allData: profileList.data,
            //     filteredData: profileList.data,
            // });
            return data;
        })
    }
    console.log("HERE");
    console.log(ticker1, ticker2, price_array_1);
    return(
        <Container onClick={(event)=> {
            event.preventDefault();
        }}>
            <SelectWrapper>
                <InputLabel for="ticker1">Choose first Ticker</InputLabel>
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
                <InputLabel for="ticker2">Choose another ticker</InputLabel>
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
           
            <StockComparatorChart
                stock1Name={ticker1}
                stock1Data={price_array_1}
                stock2Name={ticker2} 
                stock2Data={price_array_2} 
                xAxisData={x} />
        </Container>
    )

}

export default Comparison;
