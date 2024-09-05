import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpcomingTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [upcomingTasks, setUpcomingTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks from JSON server
    axios.get('http://localhost:8000/tasks')
      .then(response => {
        const allTasks = response.data;
        setTasks(allTasks);

        // Filter tasks that are due in the next 7 days
        const upcoming = allTasks.filter(task => {
          const dueDate = new Date(task.date);
          const today = new Date();
          const nextWeek = new Date(today);
          nextWeek.setDate(today.getDate() + 7); // Set next week's date
          return dueDate >= today && dueDate <= nextWeek;
        });

        setUpcomingTasks(upcoming); // Set the upcoming tasks
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  }, []);

  return (
    <div className="upcoming-tasks">
      <h2>Upcoming Deadlines</h2>
      {upcomingTasks.length > 0 ? (
        <ul className="upcoming-task-list">
          {upcomingTasks.map(task => (
            <li key={task.id}>
              <strong>{task.title}</strong> - Due on {new Date(task.date).toLocaleDateString()}
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks due in the next 7 days.</p>
      )}
    </div>
  );
};

export default UpcomingTasks;
