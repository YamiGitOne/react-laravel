import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Users from './views/Users';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/users" component={Users} />
        {/* Otras rutas de tu aplicación */}
      </Switch>
    </Router>
  );
}
