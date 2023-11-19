import Chart from "react-google-charts";

export const options = {
    title: "Daily Players",
    curveType: "function",
    legend: { position: "bottom" },
  };
  
export const LineChart = (data) => {
    console.log({data});
    return (
        <Chart
          chartType="LineChart"
          width="100%"
          height="400px"
          data={data}
          options={options}
        />
    );
}