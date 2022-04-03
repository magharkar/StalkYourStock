/**
 * @author Mugdha Agharkar
 */

import React, { useState , useEffect } from "react";
import { FlexContainer, Title, TickerWrapper } from "./TopMetricesGrid.style";

function TopMetricesGrid() {
    const [tickerStats, setTickerStats] = useState([]);
    const dummyTickerStats = [
        {
            Adj_Close: "4631.6000976562",
            percentage_change: "2",
            ticker: "GSPC"
        },
        {
            Adj_Close: "14619.6396484375",
            percentage_change: "2",
            ticker: "IXIC"
        },
        {
            Adj_Close: "4631.6000976562",
            percentage_change: "2",
            ticker: "GSPC"
        },
        {
            Adj_Close: "4631.6000976562",
            percentage_change: "2",
            ticker: "GSPC"
        },
    ]

    useEffect(() => {
        // const getURL = "localhost:5000/get_data_for_tickers?ticker1=" + ticker1 + "&ticker2=" + ticker2;
        // axios.get(getURL)
        // .then(res => {
        //     const data = res.data;
        //     //setTickerStats(data);
        //     return data;
        // })
        setTickerStats(dummyTickerStats);
      }, []); 


      return(
          <FlexContainer> 
          {
            tickerStats.map(ticker => {
                return(
                    <TickerWrapper>
                        {ticker.ticker}
                    </TickerWrapper>
                )
            })
          }
    
          </FlexContainer>
      )

}

export default TopMetricesGrid;