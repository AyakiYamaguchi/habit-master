import React, { FC } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HabitList from './components/pages/HabitList/HabitList';
import Login from './components/pages/Login/Login';
import Report from './components/pages/Report/Report';
import Settings from './components/pages/Settings/Settings'
import PrivateRoute from './components/PrivateRoute'
import SetGoal from './components/pages/SetGoal/SetGoal'
import CreateHabitList from './components/pages/CreateHabitList'

const App:FC = () => {
  return (
    <Router>
      <PrivateRoute />
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/set_goal">
          <SetGoal />
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
        <Route exact path="/create_habitlist">
          <CreateHabitList />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
