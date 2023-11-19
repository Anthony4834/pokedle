import Chart from 'react-google-charts';

export const options = {
    title: 'Weekly Players',
    curveType: 'function',
    legend: { position: 'bottom', className: 'fuck' },
    animation: {
        startup: true,
        easing: 'linear',
        duration: 1500,
    },
}

export const LineChart = ({ data }) => {
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
            <Chart
                chartType='LineChart'
                width='100%'
                height='400px'
                data={data}
                options={options}
            />
        </div>
    )
}
