/**
 * @author Mugdha Agharkar
 */

import React, { useState , useEffect } from "react";
import axios from "axios";
import baseURL from "../../config";
import { FlexContainer, Title, TickerWrapper, TickerFlex, Close, Percentage } from "./TopMetricesGrid.style";

function TopMetricesGrid() {
    const [tickerStats, setTickerStats] = useState([]);
    // const dummyTickerStats = [
    //     {
    //         closing_price: "16787.75",
    //         percentage_change: "-0.70",
    //         ticker: "^NYA"
    //     },
    //     {
    //         closing_price: "14261.50",
    //         percentage_change: "0.29",
    //         ticker: "^IXIC"
    //     },
    //     {
        
    //         closing_price: "34818.27",
    //         percentage_change: "0.40",
    //         ticker: "^DJI"
    //     },
    //     {
        
    //         closing_price: "4545.86",
    //         percentage_change: "0.34",
    //         ticker: "^GSPC"
    //     }
    // ]

    useEffect(() => {
        const getURL = baseURL + "/get_best_four_world_indices";
        axios.get(getURL)
        .then(res => {
            const data = res.data;
            setTickerStats(data.response);
            return data;
        })
      }, []); 


      return(
          <FlexContainer> 
          {
            tickerStats.map(ticker => {
                return(
                    <TickerWrapper>
                        <TickerFlex>
                            <Title>{ticker.ticker}</Title>
                            <Close>{ticker.closing_price}</Close>
                        </TickerFlex>
                        <Percentage className={ ticker.percentage_change.charAt(0) === "-" &&  "negative"}>{ticker.percentage_change}</Percentage>
                    </TickerWrapper>
                )
            })
          }
    
          </FlexContainer>
      )

}

export default TopMetricesGrid;