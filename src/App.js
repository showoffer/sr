import React, { Component } from "react";
import { connect } from "react-redux";
// import logo from './logo.svg';
import "./App.css";
import Layout from "./hoc/Layout/Layout";
import GraphDashboard from "./containers/GraphDashboard/GraphDashboard";
import { Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { combineLatest } from "rxjs/index";
import {
  categories$,
  regions$,
  subcategories$,
  territories$
} from "./const/categoriesObservables";
import { debounceTime } from "rxjs/operators/index";
import * as actionCreators from "./store/actions/actions";
import { GET_ME_GRAPHS } from "./store/actions/actions";
import Deal from "./containers/Deal/Deal";

class App extends Component {
  componentDidMount() {
    this.props.getRegions();

    combineLatest(regions$, territories$, categories$, subcategories$)
      .pipe(debounceTime(10))
      .subscribe(_ => {
        this.props.getMeGraphs();
      });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route
            exact
            path="/"
            render={props => (
              <Layout>
                <GraphDashboard {...{ routerProps: props }} />
              </Layout>
            )}
          />
          <Route path="/deals" component={Deal} />
        </div>
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getRegions: () => dispatch(actionCreators.loadRegions()),
    getMeGraphs: () => dispatch({ type: GET_ME_GRAPHS })
  };
};

export default connect(null, mapDispatchToProps)(App);
