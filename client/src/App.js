import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ConfigProvider } from "./context/configContext";

import Books from "./pages/Books";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

function App() {
  return (
    <ConfigProvider>
      <Router>
        <div>
          <Nav />
          <Switch>
            <Route exact path="/" component={Books} />
            <Route exact path="/books" component={Books} />
            <Route exact path="/books/:id" component={Detail} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    </ConfigProvider>
  );
}

export default App;
