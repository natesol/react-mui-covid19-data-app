import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import numeral from 'numeral';

import { getData } from '../../utility/functions';
import { COVID_URL } from '../../utility/variables';

import './LineChart.css';

const options = {
    responsive: true,
    maintainAspectRatio: true,
    elements: {
        point: {
            radius: 0,
        },

    },
    legend: {
        display: false,
    },
    tooltips: {
        mode: 'index',
        intersect: false,
        callbacks: {
            label: (tooltipItem, data) => numeral(tooltipItem.value).format('+0,0'),
        },
    },
    scales: {
        xAxes: [{
            type: 'time',
            time: {
                parser: 'MM/DD/YYYY',
                tooptipFormat: 'll',
            },
            ticks: {
                fontColor: getComputedStyle(document.documentElement).getPropertyValue('--sheet-txt-c').trim(),
                fontFamily: getComputedStyle(document.documentElement).getPropertyValue('--ff-body').trim(),
            }
        }],
        yAxes: [{
            gridLines: {
                display: false,
            },
            ticks: {
                callback: (value, index, values) => numeral(value).format('0a'),
                fontColor: getComputedStyle(document.documentElement).getPropertyValue('--sheet-txt-c').trim(),
                fontFamily: getComputedStyle(document.documentElement).getPropertyValue('--ff-body').trim(),
            },
        }],
    },
};

const constructChartData = (data, caseType = 'cases') => {
    let chartData = [];
    let lastDataPoint;

    for ( const date in data[caseType] ) {
        if ( lastDataPoint ) {
            const newDataPoint = {
                x: date,
                y: data[caseType][date] - lastDataPoint,
            };
            chartData.push(newDataPoint);
        }
        lastDataPoint = data[caseType][date];
    }
    return chartData;
}
const generateActiveCases = (data) => {
    const active = {};
    for ( const date in data['cases'] ) {
        active[date] = data['cases'][date] - data['recovered'][date] - data['deaths'][date];
    }
    return active;
}

const LineChart = ({ title, caseTypes = 'cases' }) => {
    const [data, setData] = useState({});

    useEffect(() => {
        const setChartData = async () => {
            const data = await getData(`${COVID_URL}/historical/all?lastdays=100`);

            if ( caseTypes === 'activecase' ) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                caseTypes = 'active';
                data[caseTypes] = generateActiveCases(data);
            }
            setData(constructChartData(data, caseTypes));
        };
        setChartData();
    }, [caseTypes]);

    const lineChartColors = {
        cases: {
            borderColor: getComputedStyle(document.documentElement).getPropertyValue('--red').trim(),
            backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--red').trim() + '7d',
        },
        activecase: {
            borderColor: getComputedStyle(document.documentElement).getPropertyValue('--blue').trim(),
            backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--blue').trim() + '7d',
        },
        recovered: {
            borderColor: getComputedStyle(document.documentElement).getPropertyValue('--green').trim(),
            backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--green').trim() + '7d',
        },
        deaths: {
            borderColor: getComputedStyle(document.documentElement).getPropertyValue('--black').trim(),
            backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--black').trim() + '7d',
        },
    };

    return (
        <div className='data-chart'>
            <h3>{title}</h3>

            { data && Object.keys(data).length > 0 && (
                <Line
                    data={{
                        datasets: [{
                                borderColor: { caseTypes } ? lineChartColors[caseTypes].borderColor : lineChartColors['cases'].borderColor,
                                backgroundColor: { caseTypes } ? lineChartColors[caseTypes].backgroundColor : lineChartColors['cases'].backgroundColor,
                                data: data,
                        }],
                    }}
                    options={options}
                />
            ) }
        </div>
    );
};

export default LineChart;
