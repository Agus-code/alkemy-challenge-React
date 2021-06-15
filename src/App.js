import React from "react";
import { AuthProvider } from "./provider/AuthProvider";
import Routes from "./Routes";
import axios from "axios";

import './app.css'

axios.defaults.withCredentials = false;

const App = () => {
  return (
    <div className="App">
      <AuthProvider>
        <Routes/>
      </AuthProvider>
    </div>
  );
}

export default App;
