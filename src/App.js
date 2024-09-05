import './App.css';
import Tasks from './pages/Tasks';
import Todo from './pages/Todo';
import InProgress from './pages/InProgress';
import Dashboard from './pages/DashBoard/DashBoard';
import Completed from './pages/Completed';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './layouts/Layout';
import NotFound from './NotFound';
function App() {
  return (
    <Router> {/* Ensure Router wraps around the entire application */}
      <Layout>
        <Switch>
          <Route exact path='/'>
            <Dashboard />
          </Route>
          <Route path="/tasks">
            <Tasks />
          </Route>
          <Route path='/to-do'>
            <Todo />
          </Route>
          <Route path='/in-progress'>
            <InProgress />
          </Route>
          <Route path='/Completed'>
            <Completed />
          </Route>
          <Route path='*'>
            <NotFound />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
