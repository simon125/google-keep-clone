import React from "react";
import { Navigation, Home, Footer, Notes } from "./components";
import { AppContainer } from "./UI/theme";

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
function App() {
  return (
    <Router>
      <AppContainer>
        <Navigation />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/notes" component={Notes} />
        </Switch>
        <Footer />
      </AppContainer>
    </Router>
  );
}

export default App;
