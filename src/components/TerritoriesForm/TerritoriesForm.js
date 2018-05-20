import React from "react";
// import PropTypes from 'prop-types';
import Checkbox from "../Checkbox/Checkbox";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import "./TerritoriesForm.css";

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
          <div style={{ padding: "8px 0" }} key={t}>
            <Field name={t} component={Checkbox} type="Checkbox" label={t} />
          </div>
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
    onChange: onChangeHandler
  })(TerritoriesForm)
);
