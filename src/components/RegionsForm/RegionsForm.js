// @flow
import React, { Component } from "react";
// import PropTypes from 'prop-types';
import { Field, reduxForm, reset, initialize } from "redux-form";
import type { FormProps } from "redux-form";
import { connect } from "react-redux";
import Checkbox from "../Checkbox/Checkbox";
import WithSideBorder from "../../hoc/withSideBorder/withSideBorder";
import "./RegionsForm.css";
import * as actionCreators from "../../store/actions/actions";
import { getTerritoriesFromRegions } from "../../utilities/getTerritoriesFromRegions";
import { checkAllCheckboxes } from "../../utilities/checkAllCheckboxes";
import classNames from "classnames";
import { ascSort } from "../../utilities/ascSort";
import { Subject } from "rxjs";

type Props = {
  regions: any[],
  territories: any[],
  formRegions: any[],
  formTerritories: any[],
  checkAll: boolean,
  subject: Subject
} & FormProps;

const onChangeHandler = (values, dispatch, props) => {
  const { subject } = props;
  const R = values;
  const Rfiltered = Object.keys(R).filter(r => R[r]);
  const territories = getTerritoriesFromRegions(Rfiltered, props.regions).sort(
    ascSort
  );

  dispatch(actionCreators.territoriesFetched(territories));
  dispatch(reset("territories"));

  props.checkAllTerritories(
    territories.reduce((acc, v) => {
      acc[v] = true;
      return acc;
    }, {})
  );

  subject.next(Rfiltered);
};

class RegionsForm extends Component<Props> {
  allButtonClickHandler = () => {
    const { regions, dispatch, toggleCheckAll } = this.props;

    const checkedState = this.props.checkAll;
    toggleCheckAll(!checkedState);

    checkAllCheckboxes(dispatch)(
      "regions",
      regions.map(r => r["name"]),
      !checkedState
    );
  };

  render() {
    // const { error, handleSubmit, pristine, reset, submitting } = props;
    const checkedClass = this.props.checkAll ? "checked" : "";

    return (
      <form className="regions-form">
        <button
          autoFocus
          type="button"
          className={classNames("check-all-btn", checkedClass)}
          onClick={this.allButtonClickHandler}
        >
          <span
            className="checkbox-button-label"
            title="All regions and territories"
          >
            All regions and territories
          </span>
        </button>
        {this.props.regions.map((r, i) => (
          <WithSideBorder key={i}>
            <Field
              name={r.name}
              component={Checkbox}
              type={r.value === "all" ? "Button" : "Checkbox"}
              checkedLabelClass="checkbox-label-green-font"
              label={r.name}
            />
          </WithSideBorder>
        ))}
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    regions: state.regions.regions,
    territories: state.territories.territories,
    formRegions: state.form.regions,
    formTerritories: state.form.territories,
    checkAll: state.regions.checkAll
  };
};

const mapDispatchToProps = dispatch => {
  return {
    checkAllTerritories: territories =>
      dispatch(initialize("territories", territories, false, {})),
    toggleCheckAll: value =>
      dispatch(actionCreators.checkAllRegionsTerritories(value))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({
    form: "regions",
    onChange: onChangeHandler
  })(RegionsForm)
);
