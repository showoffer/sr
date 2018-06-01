// @flow
import React, { Component } from "react";
// import PropTypes from 'prop-types';
import { Field, reduxForm, reset, initialize } from "redux-form";
import type { FormProps } from "redux-form";
import { connect } from "react-redux";
import CheckboxContainer from "../../containers/CheckboxContainer/CheckboxContainer";
import "./RegionsForm.css";
import * as actionCreators from "../../store/actions/actions";
import { getTerritoriesFromRegions } from "../../utilities/getTerritoriesFromRegions";
import { ascSort } from "../../utilities/ascSort";
import { Subject } from "rxjs";
import View from "../View/View";
import { CHECKBOX_OFFSET } from "../../const/CHECKBOX_LAYOUT";
import { checkAllCheckboxes } from "../../utilities/checkAllCheckboxes";

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
  render() {
    return (
      <form className="regions-form">
        {this.props.regions.map((r, i) => (
          <View style={{ padding: `${CHECKBOX_OFFSET}px 0` }} key={i}>
            <Field
              name={r.name}
              component={CheckboxContainer}
              checkedLabelClass="checkbox-label-green-font"
              label={r.name}
            />
          </View>
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
    formTerritories: state.form.territories
  };
};

const mapDispatchToProps = dispatch => {
  return {
    checkAllTerritories: territories =>
      dispatch(initialize("territories", territories, false, {})),
    checkAllCheckboxes: checkAllCheckboxes(dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({
    form: "regions",
    onChange: onChangeHandler,
    destroyOnUnmount: false
  })(RegionsForm)
);
