/**
 * @author Mugdha Agharkar
 */

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

 const tableData = [
        {
            "Date": "2022-04-01",
            "High": 20.8600006104,
            "Low": 19.4099998474,
            "Open": 20.6200008392,
            "Volume": 0.0,
            "adj_close": 19.6299991608,
            "id": 7.0,
            "insert_timestamp": "2022-04-02 22:53:28.704765",
            "percentage_change": -4.5233479053,
            "ticker": "^VIX"
        },
        {
            "Date": "2022-04-01",
            "High": 7552.5,
            "Low": 7508.8999023438,
            "Open": 7515.7001953125,
            "Volume": 811395500.0,
            "adj_close": 7537.8999023438,
            "id": 8.0,
            "insert_timestamp": "2022-04-02 22:53:29.194924",
            "percentage_change": 0.2953777619,
            "ticker": "^FTSE"
        },
        {
            "Date": "2022-04-01",
            "High": 17657.759765625,
            "Low": 17465.609375,
            "Open": 17657.759765625,
            "Volume": 3396600.0,
            "adj_close": 17625.58984375,
            "id": 32.0,
            "insert_timestamp": "2022-04-02 22:53:38.154890",
            "percentage_change": -0.3836492032,
            "ticker": "^TWII"
        },
        {
            "Date": "2022-04-01",
            "High": 6708.5600585938,
            "Low": 6635.2700195312,
            "Open": 6672.9799804688,
            "Volume": 65149500.0,
            "adj_close": 6684.3100585938,
            "id": 10.0,
            "insert_timestamp": "2022-04-02 22:53:30.154895",
            "percentage_change": 0.3669732439,
            "ticker": "^FCHI"
        },
        {
            "Date": "2022-04-01",
            "High": 2745.8500976562,
            "Low": 2729.6799316406,
            "Open": 2745.8500976562,
            "Volume": 1305000.0,
            "adj_close": 2739.8500976562,
            "id": 31.0,
            "insert_timestamp": "2022-04-02 22:53:37.685738",
            "percentage_change": 0.0,
            "ticker": "^KS11"
        },
        {
            "Date": "2022-04-01",
            "High": 16797.640625,
            "Low": 16652.689453125,
            "Open": 16670.91015625,
            "Volume": 3828290000.0,
            "adj_close": 16787.75,
            "id": 3.0,
            "insert_timestamp": "2022-04-02 22:53:26.774867",
            "percentage_change": 0.7008606168,
            "ticker": "^NYA"
        },
        {
            "Date": "2022-04-01",
            "High": 5081.8798828125,
            "Low": 4998.41015625,
            "Open": 5052.6000976562,
            "Volume": 0.0,
            "adj_close": 5058.9301757812,
            "id": 38.0,
            "insert_timestamp": "2022-04-02 22:53:40.934966",
            "percentage_change": 0.3829704446,
            "ticker": "^JN0U.JO"
        },
        {
            "Date": "2022-04-01",
            "High": 14306.9404296875,
            "Low": 14131.8095703125,
            "Open": 14269.5302734375,
            "Volume": 4984050000.0,
            "adj_close": 14261.5,
            "id": 2.0,
            "insert_timestamp": "2022-04-02 22:53:26.324782",
            "percentage_change": 0.2881784218,
            "ticker": "^IXIC"
        },
        {
            "Date": "2022-04-01",
            "High": 7514.0,
            "Low": 7476.7001953125,
            "Open": 7509.7001953125,
            "Volume": 653800.0,
            "adj_close": 7493.7998046875,
            "id": 21.0,
            "insert_timestamp": "2022-04-02 22:53:34.854846",
            "percentage_change": -0.0773413634,
            "ticker": "^AXJO"
        },
        {
            "Date": "2022-04-01",
            "High": 2817.7199707031,
            "Low": 2714.6201171875,
            "Open": 2714.6201171875,
            "Volume": 0.0,
            "adj_close": 2759.6398925781,
            "id": 14.0,
            "insert_timestamp": "2022-04-02 22:53:32.054862",
            "percentage_change": 2.0761855,
            "ticker": "IMOEX.ME"
        },
        {
            "Date": "2022-04-01",
            "High": 3287.2299804688,
            "Low": 3226.3000488281,
            "Open": 3234.669921875,
            "Volume": 378200.0,
            "adj_close": 3282.7199707031,
            "id": 18.0,
            "insert_timestamp": "2022-04-02 22:53:33.474865",
            "percentage_change": 0.9384422849,
            "ticker": "000001.SS"
        },
        {
            "Date": "2022-04-01",
            "High": 59396.62109375,
            "Low": 58450.0390625,
            "Open": 58530.73046875,
            "Volume": 6400.0,
            "adj_close": 59276.69140625,
            "id": 25.0,
            "insert_timestamp": "2022-04-02 22:53:35.774927",
            "percentage_change": 1.2091474868,
            "ticker": "^BSESN"
        },
        {
            "Date": "2022-04-01",
            "High": 1279.9300537109,
            "Low": 1266.1500244141,
            "Open": 1272.3599853516,
            "Volume": 157269300.0,
            "adj_close": 1275.2099609375,
            "id": 12.0,
            "insert_timestamp": "2022-04-02 22:53:31.144750",
            "percentage_change": 0.4023293796,
            "ticker": "^N100"
        },
        {
            "Date": "2022-04-01",
            "High": 14506.01953125,
            "Low": 14403.08984375,
            "Open": 14447.7802734375,
            "Volume": 72477600.0,
            "adj_close": 14446.48046875,
            "id": 9.0,
            "insert_timestamp": "2022-04-02 22:53:29.674826",
            "percentage_change": 0.2201250022,
            "ticker": "^GDAXI"
        },
        {
            "Date": "2022-04-01",
            "High": 1602.4100341797,
            "Low": 1582.0899658203,
            "Open": 1588.2900390625,
            "Volume": 165218100.0,
            "adj_close": 1602.4100341797,
            "id": 27.0,
            "insert_timestamp": "2022-04-02 22:53:36.714907",
            "percentage_change": 0.9481181942,
            "ticker": "^KLSE"
        },
        {
            "Date": "2022-04-01",
            "High": 4260.5400390625,
            "Low": 4179.7202148438,
            "Open": 4179.9599609375,
            "Volume": 0.0,
            "adj_close": 4255.8798828125,
            "id": 4.0,
            "insert_timestamp": "2022-04-02 22:53:27.214802",
            "percentage_change": 1.8162834712,
            "ticker": "^XAX"
        },
        {
            "Date": "2022-04-01",
            "High": 7099.3017578125,
            "Low": 7040.4912109375,
            "Open": 7093.69921875,
            "Volume": 157645900.0,
            "adj_close": 7078.759765625,
            "id": 26.0,
            "insert_timestamp": "2022-04-02 22:53:36.214879",
            "percentage_change": 0.1034848508,
            "ticker": "^JKSE"
        },
        {
            "Date": "2022-04-01",
            "High": 4210.3198242188,
            "Low": 4163.2299804688,
            "Open": 4178.3198242188,
            "Volume": 5300.0,
            "adj_close": 4200.009765625,
            "id": 13.0,
            "insert_timestamp": "2022-04-02 22:53:31.574847",
            "percentage_change": 0.9913960969,
            "ticker": "^BFX"
        },
        {
            "Date": "2022-04-01",
            "High": 27738.310546875,
            "Low": 27399.48046875,
            "Open": 27624.109375,
            "Volume": 66800000.0,
            "adj_close": 27665.98046875,
            "id": 16.0,
            "insert_timestamp": "2022-04-02 22:53:32.526038",
            "percentage_change": 0.0,
            "ticker": "^N225"
        },
        {
            "Date": "2022-04-01",
            "High": 22039.55078125,
            "Low": 21558.05078125,
            "Open": 21693.099609375,
            "Volume": 1937497800.0,
            "adj_close": 22039.55078125,
            "id": 17.0,
            "insert_timestamp": "2022-04-02 22:53:32.954803",
            "percentage_change": 0.1941240343,
            "ticker": "^HSI"
        },
        {
            "Date": "2022-04-01",
            "High": 2091.7299804688,
            "Low": 2068.0500488281,
            "Open": 2071.2199707031,
            "Volume": 3828290000.0,
            "adj_close": 2091.1101074219,
            "id": 6.0,
            "insert_timestamp": "2022-04-02 22:53:28.244692",
            "percentage_change": 1.01347383,
            "ticker": "^RUT"
        },
        {
            "Date": "2022-04-01",
            "High": 92571.0234375,
            "Low": 90979.0234375,
            "Open": 90979.0234375,
            "Volume": 0.0,
            "adj_close": 92390.9765625,
            "id": 36.0,
            "insert_timestamp": "2022-04-02 22:53:40.094885",
            "percentage_change": 1.5736468837,
            "ticker": "^MERV"
        },
        {
            "Date": "2022-04-01",
            "High": 3425.3701171875,
            "Low": 3399.4799804688,
            "Open": 3403.9299316406,
            "Volume": 215341000.0,
            "adj_close": 3419.1101074219,
            "id": 20.0,
            "insert_timestamp": "2022-04-02 22:53:34.354859",
            "percentage_change": 0.3106946073,
            "ticker": "^STI"
        },
        {
            "Date": "2022-04-01",
            "High": 12275.080078125,
            "Low": 12009.2099609375,
            "Open": 12040.009765625,
            "Volume": 1418400.0,
            "adj_close": 12227.9296875,
            "id": 19.0,
            "insert_timestamp": "2022-04-02 22:53:33.914899",
            "percentage_change": 0.9050786005,
            "ticker": "399001.SZ"
        },
        {
            "Date": "2022-04-01",
            "High": 22031.69921875,
            "Low": 21840.19921875,
            "Open": 21970.80078125,
            "Volume": 25007370000.0,
            "adj_close": 21953.0,
            "id": 33.0,
            "insert_timestamp": "2022-04-02 22:53:38.674984",
            "percentage_change": 0.2868899484,
            "ticker": "^GSPTSE"
        },
        {
            "Date": "2022-04-01",
            "High": 121579.0,
            "Low": 120001.0,
            "Open": 120001.0,
            "Volume": 13780900.0,
            "adj_close": 121570.0,
            "id": 34.0,
            "insert_timestamp": "2022-04-02 22:53:39.165469",
            "percentage_change": 1.3091775765,
            "ticker": "^BVSP"
        },
        {
            "Date": "2022-04-01",
            "High": 57064.16015625,
            "Low": 56274.78125,
            "Open": 56530.55859375,
            "Volume": 184368800.0,
            "adj_close": 56609.5390625,
            "id": 35.0,
            "insert_timestamp": "2022-04-02 22:53:39.674874",
            "percentage_change": 0.1288709832,
            "ticker": "^MXX"
        },
        {
            "Date": "2022-04-01",
            "High": 34847.91015625,
            "Low": 34538.25,
            "Open": 34740.890625,
            "Volume": 340400000.0,
            "adj_close": 34818.26953125,
            "id": 1.0,
            "insert_timestamp": "2022-04-02 22:53:25.834795",
            "percentage_change": 0.4034735287,
            "ticker": "^DJI"
        },
        {
            "Date": "2022-03-31",
            "High": 2114.1298828125,
            "Low": 2097.1101074219,
            "Open": 2109.669921875,
            "Volume": 0.0,
            "adj_close": 2097.1101074219,
            "id": 37.0,
            "insert_timestamp": "2022-04-02 22:53:40.459173",
            "percentage_change": -0.2259903018,
            "ticker": "^TA125.TA"
        },
        {
            "Date": "2022-04-01",
            "High": 4548.7001953125,
            "Low": 4507.5698242188,
            "Open": 4540.3198242188,
            "Volume": 3828290000.0,
            "adj_close": 4545.8598632812,
            "id": 0.0,
            "insert_timestamp": "2022-04-02 22:53:25.386804",
            "percentage_change": 0.3410222584,
            "ticker": "^GSPC"
        },
        {
            "Date": "2022-04-01",
            "High": 751.5700073242,
            "Low": 747.4000244141,
            "Open": 749.7100219727,
            "Volume": 0.0,
            "adj_close": 750.0,
            "id": 5.0,
            "insert_timestamp": "2022-04-02 22:53:27.734881",
            "percentage_change": 0.0386786916,
            "ticker": "^BUK100P"
        },
        {
            "Date": "2022-04-01",
            "High": 7514.0,
            "Low": 7476.7001953125,
            "Open": 7509.7001953125,
            "Volume": 653800.0,
            "adj_close": 7493.7998046875,
            "id": 22.0,
            "insert_timestamp": "2022-04-02 22:53:34.854846",
            "percentage_change": 0.0,
            "ticker": "^AXJO"
        },
        {
            "Date": "2022-04-01",
            "High": 12110.259765625,
            "Low": 12054.1904296875,
            "Open": 12110.259765625,
            "Volume": 22547900.0,
            "adj_close": 12089.4296875,
            "id": 29.0,
            "insert_timestamp": "2022-04-02 22:53:37.214902",
            "percentage_change": 0.0,
            "ticker": "^NZ50"
        },
        {
            "Date": "2022-04-01",
            "High": 7804.1000976562,
            "Low": 7768.5,
            "Open": 7789.6000976562,
            "Volume": 1416152900.0,
            "adj_close": 7785.8999023438,
            "id": 24.0,
            "insert_timestamp": "2022-04-02 22:53:35.294795",
            "percentage_change": 0.0,
            "ticker": "^AORD"
        },
        {
            "Date": "2022-04-01",
            "High": 7804.1000976562,
            "Low": 7768.5,
            "Open": 7789.6000976562,
            "Volume": 1416152900.0,
            "adj_close": 7785.8999023438,
            "id": 23.0,
            "insert_timestamp": "2022-04-02 22:53:35.294795",
            "percentage_change": -0.0475017365,
            "ticker": "^AORD"
        },
        {
            "Date": "2022-04-01",
            "High": 2745.8500976562,
            "Low": 2729.6799316406,
            "Open": 2745.8500976562,
            "Volume": 1305000.0,
            "adj_close": 2739.8500976562,
            "id": 30.0,
            "insert_timestamp": "2022-04-02 22:53:37.685738",
            "percentage_change": -0.6454700676,
            "ticker": "^KS11"
        },
        {
            "Date": "2022-04-01",
            "High": 27738.310546875,
            "Low": 27399.48046875,
            "Open": 27624.109375,
            "Volume": 66800000.0,
            "adj_close": 27665.98046875,
            "id": 15.0,
            "insert_timestamp": "2022-04-02 22:53:32.526038",
            "percentage_change": -0.5587391464,
            "ticker": "^N225"
        },
        {
            "Date": "2022-04-01",
            "High": 12110.259765625,
            "Low": 12054.1904296875,
            "Open": 12110.259765625,
            "Volume": 22547900.0,
            "adj_close": 12089.4296875,
            "id": 28.0,
            "insert_timestamp": "2022-04-02 22:53:37.214902",
            "percentage_change": -0.1720035617,
            "ticker": "^NZ50"
        },
        {
            "Date": "2022-04-01",
            "High": 3935.7299804688,
            "Low": 3895.6999511719,
            "Open": 3906.5700683594,
            "Volume": 28145300.0,
            "adj_close": 3918.6799316406,
            "id": 11.0,
            "insert_timestamp": "2022-04-02 22:53:30.614760",
            "percentage_change": 0.4140891534,
            "ticker": "^STOXX50E"
        }
    ];

 function StockTable() {
    const [stockData, setStockData] = useState([]);
    const [rows, setRows] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getURL = baseURL + "/get_all_indices";
        axios.get(getURL)
        .then(res => {
            const data = res.data;
            console.log(data.response);
          //  populateData (data.resp)
            setStockData(data.response);
            createTableData(data.response);
            return data;
        })
        //setStockData(tableData);
    },[]); 

    const createTableData = (stockData) => {
        let rowData = [];
        stockData.map(row => {
            //console.log(row);
            const { Date, High, Low, Open, Volume, adj_close, percentage_change, ticker} = row;
            const singleRow = createData(Date, High, Low, Open, Volume, adj_close, percentage_change, ticker);
            rowData.push(singleRow);
            return row;
        })
        //console.log(rowData);
        setRows(rowData);
    }

    const createData = (Date, High, Low, Open, Volume, adj_close, percentage_change, ticker) => {
        return{Date, High, Low, Open, Volume, adj_close, percentage_change, ticker};
    }

     return(
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
                    style={{cursor: "pointer"}}>
                  <Link to={{
                      pathname: "/sector-details/" + row.ticker ,
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
     )
 }
 
 export default StockTable;
 