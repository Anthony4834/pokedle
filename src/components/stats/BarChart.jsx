import React from 'react';
import { Bar, CartesianGrid, Legend, BarChart as LibBarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';


export const BarChart = ({data}) => {
  console.log({data})

   
    return (
      <ResponsiveContainer width={'90%'} height="40%">
        <LibBarChart
          width={500}
          height={300}
          data={data}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis dataKey={'Times Played'}/>
          <Tooltip />
          <Legend />
          <Bar dataKey={'Times Played'} fill={"#82ca9d"}/>
        </LibBarChart>
      </ResponsiveContainer>
    );
}
