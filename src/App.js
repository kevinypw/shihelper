import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Footer, Home, About, Editor } from "./components";

function App() {
    return (
      <div className="App">
        <Router>
          <Navigation />
          <Switch>
            <Route path="/" exact component={() => <Home />} />
            <Route path="/about" exact component={() => <About />} />
            <Route path="/helper" exact component={() => <Editor />} />
          </Switch>
          <Footer />
        </Router>
      </div>
    );
  }
  
  export default App;