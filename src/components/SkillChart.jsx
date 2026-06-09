import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function SkillChart({ skills }) {
  if (skills.length === 0) {
    return <p>Aun no hay habilidades para graficar.</p>;
  }

  const data = {
    labels: skills.map((skill) => skill.name),
    datasets: [
      {
        label: 'Nivel de dominio',
        data: skills.map((skill) => Number(skill.level)),
        backgroundColor: '#0b7285',
        borderColor: '#075985',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.parsed.y}/100`,
        },
      },
    },
  };

  return (
    <div className="skill-chart">
      <Bar data={data} options={options} />
    </div>
  );
}

export default SkillChart;
