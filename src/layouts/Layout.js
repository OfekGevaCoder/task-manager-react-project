import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar';
import SearchBox from './SearchBox';
import './Layout.css';

const Layout = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch tasks from the database when the component mounts
    fetch('http://localhost:8000/tasks')
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error("Error fetching tasks:", error));
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        {/* Pass fetched tasks to the SearchBox */}
        <SearchBox tasks={tasks} onSearch={handleSearch} />
        {/* Pass searchQuery to children components if needed */}
        {React.Children.map(children, child =>
          React.cloneElement(child, { searchQuery, tasks })
        )}
      </div>
    </div>
  );
};

export default Layout;
