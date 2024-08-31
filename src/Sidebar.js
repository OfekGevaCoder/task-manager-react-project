import { Link } from "react-router-dom";
import './Sidebar.css'; 


const Sidebar = () => {

    return(
        <nav className = "sidebar">
            <h1>TaskIt</h1>
            <div className="links">
                <Link to= "/">Dashboard</Link>
                <Link to= "/tasks">Tasks</Link>
                <Link to= "/to-do">To Do</Link>
                <Link to= "/in-progress">In Progress</Link>
                <Link to= "/completed">Completed</Link>
            </div>
        </nav>
    );
}
export default Sidebar;