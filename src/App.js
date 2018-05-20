import React, { Component } from "react";
// import logo from './logo.svg';
import "./App.css";
import Layout from "./hoc/Layout/Layout";
import GraphDashboard from "./containers/GraphDashboard/GraphDashboard";
import { store } from "./setup/setup";
import { Provider } from "react-redux";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Layout>
            <GraphDashboard />
          </Layout>
        </div>
      </Provider>
    );
  }
}

export default App;
