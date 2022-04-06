/**
 * @author Mugdha Agharkar
 */

import Navbar from "../../components/Navbar/NavUser";
import { FooterContainer } from "../../components/Footer/FooterContainer";
import {PageWrapper, ContentWrapper} from './Tickers.style';
import React, {useState, useEffect} from "react";
import axios from "axios";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses }  from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import baseURL from "../../config";

 const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));


 const allTickerData = [
    {
        "Date": "2022-04-01",
        "High": 367.8900146484,
        "Low": 358.1700134277,
        "Open": 359.2200012207,
        "Volume": 3806800.0,
        "adj_close": 363.9700012207,
        "id": 7.0,
        "insert_timestamp": "2022-04-02 22:42:22.983909",
        "percentage_change": 1.8439745503,
        "ticker": "MA"
    },
    {
        "Date": "2022-04-01",
        "High": 118.2399978638,
        "Low": 115.0400009155,
        "Open": 116.0,
        "Volume": 11033300.0,
        "adj_close": 116.6699981689,
        "id": 8.0,
        "insert_timestamp": "2022-04-02 22:42:23.443819",
        "percentage_change": 0.8819685513,
        "ticker": "PYPL"
    },
    {
        "Date": "2022-04-01",
        "High": 310.1300048828,
        "Low": 305.5400085449,
        "Open": 309.3699951172,
        "Volume": 27085100.0,
        "adj_close": 309.4200134277,
        "id": 10.0,
        "insert_timestamp": "2022-04-02 22:42:24.363797",
        "percentage_change": 0.3600323953,
        "ticker": "MSFT"
    },
    {
        "Date": "2022-04-01",
        "High": 75.4300003052,
        "Low": 72.4000015259,
        "Open": 72.8499984741,
        "Volume": 2220500.0,
        "adj_close": 73.7699966431,
        "id": 3.0,
        "insert_timestamp": "2022-04-02 22:42:21.043807",
        "percentage_change": 2.2736717761,
        "ticker": "TDOC"
    },
    {
        "Date": "2022-04-01",
        "High": 514.7800292969,
        "Low": 506.6000061035,
        "Open": 510.6799926758,
        "Volume": 2344100.0,
        "adj_close": 512.5900268555,
        "id": 2.0,
        "insert_timestamp": "2022-04-02 22:42:20.536475",
        "percentage_change": 0.5137607366,
        "ticker": "UNH"
    },
    {
        "Date": "2022-04-01",
        "High": 380.8699951172,
        "Low": 368.5,
        "Open": 376.799987793,
        "Volume": 4639800.0,
        "adj_close": 373.4700012207,
        "id": 14.0,
        "insert_timestamp": "2022-04-02 22:42:26.256210",
        "percentage_change": -0.2989922657,
        "ticker": "NFLX"
    },
    {
        "Date": "2022-04-01",
        "High": 17.1499996185,
        "Low": 16.3400001526,
        "Open": 17.0100002289,
        "Volume": 64519600.0,
        "adj_close": 16.6499996185,
        "id": 18.0,
        "insert_timestamp": "2022-04-02 22:42:28.143877",
        "percentage_change": -1.5375531119,
        "ticker": "F"
    },
    {
        "Date": "2022-04-01",
        "High": 49.9000015259,
        "Low": 47.3300018311,
        "Open": 49.8300018311,
        "Volume": 46586100.0,
        "adj_close": 48.1100006104,
        "id": 12.0,
        "insert_timestamp": "2022-04-02 22:42:25.333668",
        "percentage_change": -2.9257480282,
        "ticker": "INTC"
    },
    {
        "Date": "2022-04-01",
        "High": 3316.5400390625,
        "Low": 3246.3898925781,
        "Open": 3282.9899902344,
        "Volume": 2851800.0,
        "adj_close": 3271.1999511719,
        "id": 9.0,
        "insert_timestamp": "2022-04-02 22:42:23.883783",
        "percentage_change": 0.3450973226,
        "ticker": "AMZN"
    },
    {
        "Date": "2022-04-01",
        "High": 533139.0,
        "Low": 523662.0,
        "Open": 530026.0,
        "Volume": 26.0,
        "adj_close": 527760.0,
        "id": 4.0,
        "insert_timestamp": "2022-04-02 22:42:21.503836",
        "percentage_change": -0.2195034797,
        "ticker": "BRK-A"
    },
    {
        "Date": "2022-04-01",
        "High": 56.1899986267,
        "Low": 54.8899993896,
        "Open": 56.1699981689,
        "Volume": 17464000.0,
        "adj_close": 55.6599998474,
        "id": 13.0,
        "insert_timestamp": "2022-04-02 22:42:25.783649",
        "percentage_change": -0.1793372976,
        "ticker": "CSCO"
    },
    {
        "Date": "2022-04-01",
        "High": 2819.0,
        "Low": 2775.9399414062,
        "Open": 2800.1999511719,
        "Volume": 1173600.0,
        "adj_close": 2814.0,
        "id": 16.0,
        "insert_timestamp": "2022-04-02 22:42:27.203807",
        "percentage_change": 0.7522407828,
        "ticker": "GOOG"
    },
    {
        "Date": "2022-04-01",
        "High": 1094.75,
        "Low": 1066.6400146484,
        "Open": 1081.1500244141,
        "Volume": 18012900.0,
        "adj_close": 1084.5899658203,
        "id": 17.0,
        "insert_timestamp": "2022-04-02 22:42:27.633674",
        "percentage_change": 0.6486628056,
        "ticker": "TSLA"
    },
    {
        "Date": "2022-04-01",
        "High": 226.6300048828,
        "Low": 222.2299957275,
        "Open": 223.0800018311,
        "Volume": 6558900.0,
        "adj_close": 226.3600006104,
        "id": 6.0,
        "insert_timestamp": "2022-04-02 22:42:22.493627",
        "percentage_change": 2.0697101725,
        "ticker": "V"
    },
    {
        "Date": "2022-04-01",
        "High": 306.0700073242,
        "Low": 301.200012207,
        "Open": 304.0,
        "Volume": 1470400.0,
        "adj_close": 305.5400085449,
        "id": 1.0,
        "insert_timestamp": "2022-04-02 22:42:20.003868",
        "percentage_change": 1.2795067498,
        "ticker": "ISRG"
    },
    {
        "Date": "2022-04-01",
        "High": 267.1300048828,
        "Low": 259.0400085449,
        "Open": 261.549987793,
        "Volume": 2120100.0,
        "adj_close": 266.1499938965,
        "id": 0.0,
        "insert_timestamp": "2022-04-02 22:42:19.535679",
        "percentage_change": 1.9848996634,
        "ticker": "VRTX"
    },
    {
        "Date": "2022-04-01",
        "High": 137.4100036621,
        "Low": 133.8000030518,
        "Open": 137.3999938965,
        "Volume": 15715400.0,
        "adj_close": 135.3099975586,
        "id": 5.0,
        "insert_timestamp": "2022-04-02 22:42:22.023848",
        "percentage_change": -0.7409108798,
        "ticker": "JPM"
    },
    {
        "Date": "2022-04-01",
        "High": 227.2799987793,
        "Low": 222.6999969482,
        "Open": 224.5500030518,
        "Volume": 19533300.0,
        "adj_close": 224.8500061035,
        "id": 15.0,
        "insert_timestamp": "2022-04-02 22:42:26.733664",
        "percentage_change": 1.1198081878,
        "ticker": "FB"
    },
    {
        "Date": "2022-04-01",
        "High": 174.8800048828,
        "Low": 171.9400024414,
        "Open": 174.0299987793,
        "Volume": 78699800.0,
        "adj_close": 174.3099975586,
        "id": 11.0,
        "insert_timestamp": "2022-04-02 22:42:24.843844",
        "percentage_change": -0.1718132127,
        "ticker": "AAPL"
    }
];

 function Tickers() {
    const [stockData, setStockData] = useState([]);
    const [rows, setRows] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getURL = baseURL + "/get_all_ticker_data";
        axios.get(getURL)
        .then(res => {
            const data = res.data.response;
            setStockData(data);
            createTableData(data);
            return data;
        })
        //setStockData(allTickerData);
        //createTableData(allTickerData);
    },[]); 

    const createTableData = (stockData) => {
        let rowData = [];
        stockData.map(row => {
            const { Date, High, Low, Open, Volume, adj_close, percentage_change, ticker} = row;
            const singleRow = createData(Date, High, Low, Open, Volume, adj_close, percentage_change, ticker);
            rowData.push(singleRow);
            return row;
        })
        setRows(rowData);
    }

    const createData = (Date, High, Low, Open, Volume, adj_close, percentage_change, ticker) => {
        return{Date, High, Low, Open, Volume, adj_close, percentage_change, ticker};
    }

     return(
        <PageWrapper>
            <Navbar />
            <ContentWrapper>
            <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Ticker</StyledTableCell>
              <StyledTableCell align="left">Date</StyledTableCell>
              <StyledTableCell align="left">High</StyledTableCell>
              <StyledTableCell>Low</StyledTableCell>
              <StyledTableCell align="left">Open</StyledTableCell>
              <StyledTableCell align="left">Volume</StyledTableCell>
              <StyledTableCell>Adj Close</StyledTableCell>
              <StyledTableCell align="left">Percentage Change</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow
                key={row.ticker}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <StyledTableCell 
                    component="th" 
                    scope="row" 
                    align="left" 
                    style={{cursor: "pointer"}}
                    key={row.ticker}
                  >
                  <Link to={{
                      pathname: "/ticker-details/" + row.ticker ,
                  }}>{row.ticker}</Link>
                </StyledTableCell>
                <StyledTableCell align="left">{row.Date}</StyledTableCell>
                <StyledTableCell align="left">{row.High}</StyledTableCell>
                <StyledTableCell align="middle">{row.Low}</StyledTableCell>
                <StyledTableCell align="left">{row.Open}</StyledTableCell>
                <StyledTableCell align="right">{row.Volume}</StyledTableCell>
                <StyledTableCell align="right">{row.adj_close}</StyledTableCell>
                <StyledTableCell align="left" style={{color: row.percentage_change > 0 ? "green" : "red"}}>{row.percentage_change}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
            </ContentWrapper>
        <FooterContainer />
    </PageWrapper>
     )
 }
 
 export default Tickers;
 