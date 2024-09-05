import { useState, useEffect } from 'react';
import axios from 'axios'; 
import TaskStagePieChart from './TaskStagePieChart'; 
import UpcomingTasks from './UpcomingTasks';
import './DashBoard.css'

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from the JSON server
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:8000/tasks');
        setTasks(response.data); 
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className='dashboard'>
      <TaskStagePieChart tasks={tasks} />
      <UpcomingTasks />
    </div>
  );
};

export default Dashboard;
