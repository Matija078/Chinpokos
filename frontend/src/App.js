import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import DataPage from './components/DataPage';
import LoginPage from './components/LoginPage';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Handler for å håndtere pålogging
  const handleLogin = (username) => {
    setLoggedInUser(username);
  };

  // Handler for å håndtere utlogging
  const handleLogout = () => {
    // Perform any necessary logout logic here, such as clearing user data or tokens
    setLoggedInUser(null);
  };

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <LoginPage handleLogin={handleLogin} />
          </Route>
          <Route path="/data">
            <DataPage handleLogout={handleLogout} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
