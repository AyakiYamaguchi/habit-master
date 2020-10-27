import React from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HabitList from './components/Pages/HabitList/HabitList';
import TopPage from './components/Pages/TopPage/TopPage'

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
