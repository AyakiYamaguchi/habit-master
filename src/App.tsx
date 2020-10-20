import React from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HabitList from './pages/HabitList';
import TopPage from './pages/TopPage/TopPage'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={TopPage} />
        <Route exact path="/list" component={HabitList} />
      </Switch>
    </Router>
  );
}

export default App;
