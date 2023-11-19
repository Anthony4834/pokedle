import React from 'react'
import { Chart } from 'react-google-charts'

export const data = [
    ['City', '2010 Population', '2000 Population'],
    ['New York City, NY', 8175000, 8008000],
    ['Los Angeles, CA', 3792000, 3694000],
    ['Chicago, IL', 2695000, 2896000],
    ['Houston, TX', 2099000, 1953000],
    ['Philadelphia, PA', 1526000, 1517000],
]

export const options = {
    chart: {
        title: 'Daily',
    },
}

export const BarChart = ({ data }) => {
    console.log(data)
    return (
        <div
            className='chartWrapper lineChart'
            style={{
                display: 'flex',
                width: '90%',
                margin: 'auto',
                justifyContent: 'center',
            }}
        >
            <div
                style={{
                    backgroundColor: 'white',
                    padding: '30px 50px',
                    width: '100%',
                }}
            >
                <Chart
                    chartType='Bar'
                    width='100%'
                    height='400px'
                    data={data}
                    options={options}
                />
            </div>
        </div>
    )
}
