import { Chart } from 'react-google-charts'

export const PieChart = ({ data }) => {
    return (
        <div
            className='chartWrapper'
            style={{
                display: 'flex',
                width: '90%',
                margin: 'auto',
                justifyContent: 'center',
            }}
        >
            <Chart
                chartType='PieChart'
                data={data}
                options={{
                    title: '# of Winners by Game Mode',
                    animation: {
                        startup: true,
                        easing: 'linear',
                        duration: 1500,
                    },
                }}
                width={'100%'}
                height={'400px'}
            />
        </div>
    )
}
