import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Salary Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Jack',
      data: labels.map(() => Math.round(Math.random()*5000)),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Bryan',
      data: labels.map(() => Math.round(Math.random()*5000)),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
      label: 'David',
      data: labels.map(() => Math.round(Math.random()*5000)),
      borderColor: 'rgb(162, 235, 53)',
      backgroundColor: 'rgba(162, 235, 53, 0.5)',
    },
  ],
};

const Chart = () => {
  return (
    <div className="page">
      <Line options={options} data={data}/>
    </div>
  );
}

export default Chart;
