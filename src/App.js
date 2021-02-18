import './App.css';
import React from "react";
import Home from "./pages/home/components/home";
import Projects from "./pages/projects/components/projects";
import About from "./pages/about/components/about";
import Particles from "react-particles-js";
import {
    BrowserRouter as Router,
    Route,
} from "react-router-dom";
import NavBar from "./components/navbar/navbar";

function App() {

  return (
      <div>
          <NavBar/>
          <Router>
              <Route  exact path="/" component={Home}/>
              <Route path="/projects" component={Projects}/>
              <Route path="/about" component={About}/>
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
                      },
                      line_linked: {
                          color: "#00aeff",
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
