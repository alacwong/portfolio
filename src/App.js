import './App.css';
import React from "react";
import Home from "./pages/home/components/home";
import Particles from "react-particles-js";
import { BrowserRouter  as Router, Route} from 'react-router-dom'

function App() {
  return (
      <div>
          <Router>
              <Route path="/" component={Home}/>
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
                              "mode": "repulse"
                          }
                      }
                  }
              }} />
      </div>

  );
}

export default App;
