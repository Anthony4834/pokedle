import React from 'react'
import { Chart } from 'react-google-charts'

export const BarChart = ({ data, header }) => {
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
                    options={{
                        chart: {
                            title: header,
                        },
                        legend: {
                            position: 'none'
                        }

                    }}
                />
            </div>
        </div>
    )
}
