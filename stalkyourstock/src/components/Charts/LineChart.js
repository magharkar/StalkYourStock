import React from "react";
import ReactApexChart from "react-apexcharts";
    
class ApexChart extends React.Component {
    constructor(props) {
        super(props);
        const { index, x_axis, y_axis, description, width } = props;
        console.log(index, x_axis,y_axis, description);
        this.state = {
        series: [{
            name: index,
            data: y_axis,
        }],
        options: {
            chart: {
            height: 350,
            type: 'line',
            zoom: {
                enabled: false
            }
            },
            dataLabels: {
            enabled: false
            },
            stroke: {
            curve: 'straight'
            },
            title: {
            text: description,
            align: 'left'
            },
            grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            },
            },
            xaxis: {
            categories: x_axis,
            }
        },
        
        
        };
    }

    componentDidMount() {
        const { index, x_axis, y_axis, description } = this.props;
        this.setState({
          series: [{
            name: index,
            data: y_axis,
        }],
        options: {
            chart: {
            height: 350,
            type: 'line',
            zoom: {
                enabled: false
            }
            },
            dataLabels: {
            enabled: false
            },
            stroke: {
            curve: 'straight'
            },
            title: {
            text: description,
            align: 'left'
            },
            grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            },
            },
            xaxis: {
            categories: x_axis,
            }
        },
        });
      }
    

    

    render() {
        return (
        <div id="chart" style={{margin: "auto"}}>
                <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={350} width={this.props.width} />
        </div>
        );
    }
}

export default ApexChart;
