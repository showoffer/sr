import React from "react";
// import PropTypes from 'prop-types';
import CheckboxContainer from "../../containers/CheckboxContainer/CheckboxContainer";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import "./TerritoriesForm.css";
import View from "../View/View";
import { CHECKBOX_OFFSET } from "../../const/CHECKBOX_LAYOUT";

const onChangeHandler = (values, dispatch, props) => {
  const { subject } = props;
  const T = values;
  const Tfiltered = Object.keys(T).filter(t => T[t]);

  subject.next(Tfiltered);
};

const TerritoriesForm = props => {
  return (
    <form className="TerritoriesForm">
      {props.territories.map((t, i) => {
        return (
          <View style={{ padding: `${CHECKBOX_OFFSET}px 0` }} key={t}>
            <Field name={t} component={CheckboxContainer} label={t} />
          </View>
        );
      })}
    </form>
  );
};

TerritoriesForm.propTypes = {};
TerritoriesForm.defaultProps = {};

const mapStateToProps = state => {
  return {
    territories: state.territories.territories,
    formRegions: state.form.regions,
    formTerritories: state.form.territories
  };
};

export default connect(mapStateToProps)(
  reduxForm({
    form: "territories",
    onChange: onChangeHandler,
    destroyOnUnmount: false
  })(TerritoriesForm)
);
