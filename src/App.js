import './App.css';
import React from "react";
import Home from "./pages/home/components/home";
import Projects from "./pages/projects/components/projects";
import Particles from "react-particles-js";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import NavBar from "./components/navbar/navbar";

function App() {
  return (
      <div>
          <NavBar/>
          <Router>
              <Route  exact path="/" component={Home}/>
              <Route path="/projects" component={Projects}/>
          </Router>
          <Particles
              className="background"
              params={{
                  "particles": {
                      "number": {
                          "value": 150
                      },
                      "size": {
                          "value": 3
                      }
                  },
                  "interactivity": {
                      "events": {
                          "onhover": {
                              "enable": true,
                              "mode": "repulse",
                          }
                      }
                  }
              }} />
      </div>

  );
}

export default App;
