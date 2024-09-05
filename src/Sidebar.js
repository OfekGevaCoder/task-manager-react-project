import { NavLink } from "react-router-dom";
import './Sidebar.css';
import { MdTaskAlt } from "react-icons/md";



const Sidebar = () => {

    return(
        <nav className = "sidebar">
            <h1><MdTaskAlt viewBox=" 1 0 30 14" />TaskIt</h1>
            <div className="links">
                <NavLink exact to= "/" activeClassName="active-link">Dashboard</NavLink>
                <NavLink to= "/tasks" activeClassName="active-link">Tasks</NavLink>
                <NavLink to= "/to-do" activeClassName="active-link">To Do</NavLink>
                <NavLink to= "/in-progress" activeClassName="active-link">In Progress</NavLink>
                <NavLink to= "/completed" activeClassName="active-link">Completed</NavLink>
            </div>
        </nav>
    );
}
export default Sidebar;