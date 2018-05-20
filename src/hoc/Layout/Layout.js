import React, { Component } from "react";
import { connect } from "react-redux";
// import PropTypes from 'prop-types';
import RegionsForm from "../../components/RegionsForm/RegionsForm";
import "./Layout.css";
import TerritoriesForm from "../../components/TerritoriesForm/TerritoriesForm";
import UploaderForm from "../../components/UploaderForm/UploaderForm";
import * as actionCreators from "../../store/actions/actions";
import { Subject, combineLatest } from "rxjs";
import { debounceTime } from "rxjs/operators";

const regionsSubject = new Subject();
const territoriesSubject = new Subject();

const regions$ = regionsSubject.asObservable();
const territories$ = territoriesSubject.asObservable();

export class Layout extends Component {
  componentDidMount() {
    this.props.getRegions();

    combineLatest(regions$, territories$)
      .pipe(debounceTime(10))
      .subscribe(v => {
        this.props.loadReports(v[0], v[1]);
      });
  }

  render() {
    const loader = (
      <div
        className="loader-outer"
        style={{
          opacity: this.props.appIsLoading ? 1 : 0
        }}
      >
        <div className="loader" />
      </div>
    );

    return (
      <div className="Layout">
        {!this.props.fadeOut ? loader : null}
        <div className="header">
          <div className="uploader">
            <UploaderForm />
          </div>
          <RegionsForm subject={regionsSubject} />
        </div>
        <div className="Layout-container">
          <div className="sidebar">
            <div className="title">
              {this.props.territories.length > 0
                ? "Select territories"
                : "Select regions"}
            </div>
            <div className="sidebar-scrollview">
              <TerritoriesForm subject={territoriesSubject} />
            </div>
            <div className="bottom-gradient" />
          </div>
          <div className="main">{this.props.children}</div>
        </div>
      </div>
    );
  }
}

Layout.propTypes = {};
Layout.defaultProps = {};

const mapStateToProps = state => {
  return {
    formTerritories: state.form.territories,
    territories: state.territories.territories,
    appIsLoading: state.init.appIsLoading,
    fadeOut: state.init.fadeOut
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getRegions: () => dispatch(actionCreators.loadRegions()),
    loadReports: (R, T) => dispatch(actionCreators.loadReports(R, T))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
