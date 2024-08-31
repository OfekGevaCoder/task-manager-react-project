import './App.css';
import Dashboard from './pages/Dashboard';
import Modal from './Modals/AddTaskForm';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './layouts/Layout';
import NotFound from './NotFound';

function App() {
  return (
    <Router> {/* Ensure Router wraps around the entire application */}
      <Layout>
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>

          {/* <Route path="/tasks">
            <Tasks />
          </Route>

          <Route path="/to-do">
            <Todo />
          </Route>

          <Route path="/in-progress">
            <InProgress />
          </Route>

          <Route path="/completed">
            <Completed />
          </Route> */}

          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
