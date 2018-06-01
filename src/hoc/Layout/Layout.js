import React, { Component } from "react";
import { connect } from "react-redux";
import RegionsForm from "../../components/RegionsForm/RegionsForm";
import "./Layout.css";
import TerritoriesForm from "../../components/TerritoriesForm/TerritoriesForm";
import UploaderForm from "../../components/UploaderForm/UploaderForm";
import * as actionCreators from "../../store/actions/actions";
import classNames from "classnames";
import { checkAllCheckboxes } from "../../utilities/checkAllCheckboxes";
import View from "../../components/View/View";
import {
  FORM_EXTERNAL_OFFSET,
  FORM_INTERNAL_OFFSET
} from "../../const/FORM_LAYOUT";
import FiltersContainer from "../../containers/FiltersContainer/FiltersContainer";
import {
  regionsSubject,
  territoriesSubject
} from "../../const/categoriesObservables";

export class Layout extends Component {
  allButtonClickHandler = () => {
    const { regions, toggleCheckAll, checkAllCheckboxes } = this.props;

    const checkedState = this.props.checkAll;
    toggleCheckAll(!checkedState);

    checkAllCheckboxes("regions", regions.map(r => r["name"]), !checkedState);
  };

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

    const checkedClass = this.props.checkAll ? "checked" : "";
    const titleStyle = {
      fontSize: 18,
      fontWeight: 600,
      color: "#9e9e9e",
      marginBottom: "1.8rem"
    };

    return (
      <div className="Layout">
        {!this.props.fadeOut ? loader : null}
        <div className="Layout-container">
          <div className="sidebar">
            <UploaderForm />
            <div className="sidebar-scrollview">
              <button
                autoFocus
                type="button"
                className={classNames("check-all-btn", checkedClass)}
                onClick={this.allButtonClickHandler}
              >
                <span className="checkbox-button-label" title="Select all">
                  Select all
                </span>
              </button>
              <View
                style={{
                  padding: `${FORM_INTERNAL_OFFSET}px`,
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  margin: `${FORM_EXTERNAL_OFFSET}px 0`,
                  flex: "none"
                }}
              >
                <View style={titleStyle}>Select region</View>
                <RegionsForm subject={regionsSubject} />
              </View>
              <View
                style={{
                  padding: `${FORM_INTERNAL_OFFSET}px`,
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  margin: `${FORM_EXTERNAL_OFFSET}px 0`,
                  overflow: "auto",
                  flex: 1
                }}
              >
                <View style={titleStyle}>Select territory</View>
                <TerritoriesForm
                  style={{
                    display:
                      this.props.territories.length > 0 ? "block" : "none"
                  }}
                  subject={territoriesSubject}
                />
                <div
                  style={{
                    fontSize: "1rem",
                    color: "#cecece",
                    display:
                      this.props.territories.length === 0 ? "block" : "none"
                  }}
                >
                  Choose region(s) first.
                </div>
              </View>
            </div>
            <div className="bottom-gradient" />
          </div>
          <div className="main-wrapper">
            <div className="header">
              <FiltersContainer />
            </div>
            <div className="main">{this.props.children}</div>
          </div>
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
    regions: state.regions.regions,
    territories: state.territories.territories,
    appIsLoading: state.init.appIsLoading,
    fadeOut: state.init.fadeOut,
    checkAll: state.regions.checkAll
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadReports: (R, T) => dispatch(actionCreators.loadReports(R, T)),
    toggleCheckAll: value =>
      dispatch(actionCreators.checkAllRegionsTerritories(value)),
    checkAllCheckboxes: checkAllCheckboxes(dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
