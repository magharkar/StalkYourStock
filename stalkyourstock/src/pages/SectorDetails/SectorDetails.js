/**
 * @author Mugdha Agharkar
 */

 import React, { useEffect, useState } from "react";
 import { useParams } from "react-router-dom";
 import baseURL from "../../config";
 import axios from "axios";
 import ApexChart from "../../components/Charts/LineChart";
 import { FooterContainer } from "../../components/Footer/FooterContainer";
 import Navbar from "../../components/Navbar/NavUser";
 import { PageWrapper, ContentWrapper } from "./SectorDetails.style";
import { PageContainer } from "../LandingPage/LandingPage.style";

 const SectorDetails = () => {
    const { state } = useParams();
    const [ graphData, setGraphData ] = useState({});

    useEffect(() => {
        const request = state.substring(1);
        const getURL = baseURL + "/get_graph_data_for_indices?index=" + request;
        axios.get(getURL)
        .then(res => {
            const data = res.data;
            //populateData (data.response)
            // setStockData(data.response);
            // createTableData(data.response);
            setGraphData(data);
            return data;
        })
        //setStockData(tableData);
    },[]); 

    const sectorDescription = "Ticker data for one year " + graphData.index;
     return(
         <PageContainer> 
             <Navbar />
             <ContentWrapper>
                {
                    graphData.adj_close && (
                        <div style={{background:"#FFF"}}>
                            <ApexChart 
                                index={graphData.index} 
                                x_axis={graphData.x_axis} 
                                y_axis={graphData.adj_close} 
                                description={sectorDescription}  
                            />
                        </div>
                    )
                }
             </ContentWrapper>
             <FooterContainer />
         </PageContainer>
       
     )
 }
 
 export default SectorDetails;
 