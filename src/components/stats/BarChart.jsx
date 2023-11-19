import React from 'react'
import { Chart } from 'react-google-charts'
import { formatDate, getDateFromToday } from '../statsModal/stats-utils'

export const options = {
    chart: {
        title: 'Daily ' + formatDate(getDateFromToday(-1, 0, true)).split(' ')[0],
    },
}

export const BarChart = ({ data }) => {
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
