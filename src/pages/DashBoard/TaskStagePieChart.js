import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const TaskStagePieChart = ({ tasks }) => {
  // Prepare data for the chart by counting tasks in each stage
  const taskStages = tasks.reduce((acc, task) => {
    acc[task.stage] = (acc[task.stage] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(taskStages), // Task stages: 'todo', 'in-progress', 'completed'
    datasets: [
      {
        data: Object.values(taskStages), // Values for each task stage
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], // Colors for each section
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  return (
    <div className='task-stage-pie-chart'>
      <h2>Task Distribution by Stage</h2>
      {tasks.length > 0 ? (
        <Pie data={data} />
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default TaskStagePieChart;
