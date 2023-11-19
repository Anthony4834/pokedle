import { Chart } from "react-google-charts";

export const PieChart = ({data}) => {
    return (
        <div className="pieChartWrapper" style={{display: 'flex', width: '90%', margin: 'auto', border: '1px solid', justifyContent: 'center'}} >
             <Chart
                chartType="PieChart"
                data={data}
                options={{title: 'Weekly # of Winners by Game Mode'}}
                width={'100%'}
                height={"400px"}
                />   
        </div>
          
      );
}