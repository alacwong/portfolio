import './App.css';
import React from "react";
import Home from "./pages/home/components/home";
import Particles from "react-particles-js";

function App() {
  return (
      <div>
          <h1>Hello</h1>
          <Particles
              params={{
                  "particles": {
                      "number": {
                          "value": 200
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
