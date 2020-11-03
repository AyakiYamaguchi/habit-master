import React from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HabitList from './components/Pages/HabitList/HabitList';
import TopPage from './components/Pages/TopPage/TopPage';
import Report from './components/Pages/Report/Report';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <TopPage />
        </Route>
        <Route exact path="/list">
          <HabitList />
        </Route>
        <Route exact path="/report">
          <Report />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
