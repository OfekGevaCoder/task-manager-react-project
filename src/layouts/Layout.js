import React from 'react';
import Sidebar from '../Sidebar'; // Adjust the path according to your project structure
import './Layout.css'; // Create a separate CSS file for Layout

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default Layout;
