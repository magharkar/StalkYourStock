/**
 * @author Mugdha Agharkar
 */

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import baseURL from "../../config";
import axios from "axios";
import ApexChart from "../../components/Charts/LineChart";
import Navbar from "../../components/Navbar/NavUser";
import { FooterContainer } from "../../components/Footer/FooterContainer";
import { PageWrapper, ContentWrapper, FlexContainer, TableWrapper, GraphContainer } from "./TickerDetails.style";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Paper } from "@mui/material";
import { TableContainer } from "@mui/material";


 const TickerDetails = () => {
    const { state } = useParams();
    const [ graphData, setGraphData ] = useState({});
    const [companyData, setCompanyData] = useState({});

    useEffect(() => {
        console.log("HERE");
        //const request = state.substring(1);
        //console.log(request);
        const getURL = baseURL + "/get_info_for_single_ticker?ticker=" + state;
        axios.get(getURL)
        .then(res => {
            const data = res.data;
            console.log(res);
            //populateData (data.response)
            // setStockData(data.response);
            // createTableData(data.response);
            setGraphData(data.graph_data);
            setCompanyData(data.response);
            return data;
        })
        //setStockData(tableData);
    },[]); 

    const renderCompanyData = Object.keys(companyData).map(function(key) {
        return (
        // <div value={key}>{key}: {companyData[key]}</div>
        <TableRow>
            <TableCell>{key}</TableCell>
            <TableCell>{companyData[key]}</TableCell>
        </TableRow>
        )
    });

    const sectorDescription = "Sector data for ticker " + graphData.ticker;
     return(
         <PageWrapper>
             <Navbar />
                <ContentWrapper>
                    <FlexContainer style={{display: "flex", padding: "24px"}}>
                        <GraphContainer> 
                            {
                                graphData.adj_close && (
                                    <ApexChart 
                                        index={graphData.ticker} 
                                        x_axis={graphData.x_axis} 
                                        y_axis={graphData.adj_close} 
                                        description={sectorDescription}
                                        width="500px"  
                                    />
                                )
                            }
                        </GraphContainer>
                        <TableWrapper id="details_view">
                            <TableContainer component={Paper}>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell style={{fontWeight: 700}}>Title</TableCell>
                                            <TableCell style={{fontWeight: 700}}>Details</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {renderCompanyData}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </TableWrapper>
                    </FlexContainer>
                </ContentWrapper>
             <FooterContainer />
         </PageWrapper>
         
        
       
     )
 }
 
 export default TickerDetails;
 