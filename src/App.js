import React, { Component } from "react";
import logo from "./logo.JPG";
import { Table, Checkbox, Button, Radio } from "semantic-ui-react";
import { WalkTestItem } from "./components/WalkTestItem.js";
import WalkTestApp from "./components/WalkTestApp.js";
import "./App.css";

// const renderArrays = arrays => {
//   return arrays.map((item, i) => (
//     <div className="walkTest-item-row" key={i}>
//       {item}
//     </div>
//   ));
// };

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Ten Meter Walk Test</h1>
        </header>
        <WalkTestApp />
      </div>
    );
  }
}

export default App;
