import React, { FC , useEffect , useContext } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import HabitList from './components/Pages/HabitList/HabitList';
import Login from './components/Pages/Login/Login';
import Report from './components/Pages/Report/Report';
import Settings from './components/Pages/Settings/Settings'
import PrivateRoute from './components/PrivateRoute'

const App:FC = () => {
  return (
    <Router>
      <PrivateRoute />
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/list">
          <HabitList />
        </Route>
        <Route exact path="/report">
          <Report />
        </Route>
        <Route exact path="/settings">
          <Settings />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
