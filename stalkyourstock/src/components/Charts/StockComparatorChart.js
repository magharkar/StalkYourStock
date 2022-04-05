import React from "react";
import ReactApexChart from "react-apexcharts";

class StockComparatorChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chartData: [],
      chartOptions: {},
    };
  }

  componentDidUpdate() {
      console.log("Updated");
  }

  componentDidMount() {
      console.log("MOUNT!!!!!!!!!!");
    const { stock1Name, stock2Name, stock1Data, stock2Data, xAxisData } = this.props;
    this.setState({
      chartData: [
        {
            name: stock1Name,
            data: stock1Data
        },
        {
            name: stock2Name,
            data: stock2Data
        }
      ],
      chartOptions: {
        chart: {
            height: 350,
            type: "line",
            stacked: false
          },
          dataLabels: {
            enabled: false
          },
          colors: ["#FF1654", "#247BA0"],
          stroke: {
            width: [4, 4]
          },
          plotOptions: {
            bar: {
              columnWidth: "20%"
            }
          },
          xaxis: {
            tickAmount: 12,
            // type: 'datetime',
            labels: {
              formatter: function(value) {
                const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
                const date = new Date(value);
                const monthName = month[date.getMonth()];
                const returnObj = monthName + " " + date.getFullYear().toString();
                return returnObj
              },
            },
            categories:xAxisData
          },
          yaxis: [
            {
              axisTicks: {
                show: true
              },
              axisBorder: {
                show: true,
                color: "#FF1654"
              },
              labels: {
                style: {
                  colors: "#FF1654"
                }
              },
              title: {
                text: "Series A",
                style: {
                  color: "#FF1654"
                }
              }
            },
            {
              opposite: true,
              axisTicks: {
                show: true
              },
              axisBorder: {
                show: true,
                color: "#247BA0"
              },
              labels: {
                style: {
                  colors: "#247BA0"
                }
              },
              title: {
                text: "Series B",
                style: {
                  color: "#247BA0"
                }
              }
            }
          ],
          tooltip: {
            shared: false,
            intersect: true,
            x: {
              show: false
            }
          },
          legend: {
            horizontalAlign: "left",
            offsetX: 40
          }
      },
    });
  }

  render() {
    return (
      <ReactApexChart
        options={this.state.chartOptions}
        series={this.state.chartData}
        type="area"
        width="100%"
        height="100%"
      />
    );
  }
}

export default StockComparatorChart;
