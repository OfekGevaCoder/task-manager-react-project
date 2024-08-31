// Dashboard.js

import useFetch from "../useFetch.js";
import TaskList from "../TaskList.js";

const Dashboard = () => {
    const { error, isPending, data: tasks } = useFetch('http://localhost:8000/tasks');
    
    return (
        <div className="dashboard">
            { error && <div>{ error }</div> }
            { isPending && <div>Loading...</div> }
            { tasks && <TaskList tasks={tasks} /> }
        </div>
    );
}

export default Dashboard;
