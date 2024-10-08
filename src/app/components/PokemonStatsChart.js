"use client";

import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PokemonStatsBarChart({ pokemonStats }) {
  const labels = pokemonStats.map((stat) => stat.stat.name);
  const data = {
    labels,
    datasets: [
      {
        label: ' Stats ' ,
        data: pokemonStats.map((stat) => stat.base_stat),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, 
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
    animation: {
      duration: 1000, 
    },
  };

  
  const style = {
    width: '300px',  
    height: '300px', 
    margin: '0 auto', 
  };

  return (
    <div style={style}>
      <Pie data={data} options={options} />
    </div>
  );
}
