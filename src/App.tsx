import React from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HabitList from './components/Pages/HabitList/HabitList';
import TopPage from './components/Pages/TopPage/TopPage';
import Report from './components/Pages/Report/Report';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={TopPage} />
        <Route exact path="/list" component={HabitList} />
        <Route exact path="/report" component={Report} />
      </Switch>
    </Router>
  );
}

export default App;
