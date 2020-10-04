import React from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HabitList from './pages/HabitList';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/list" component={HabitList} />
      </Switch>
    </Router>
  );
}

export default App;
