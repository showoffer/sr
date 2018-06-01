import React, { Component } from "react";
import PropTypes from "prop-types";
import Checkbox from "../../components/Checkbox/Checkbox";

class CheckboxContainer extends Component {
  render() {
    const {
      input: { value, onChange },
      label
    } = this.props;

    return (
      <div className="checkbox-outer">
        <Checkbox value={value} onChangeCb={onChange} label={label} />
      </div>
    );
  }
}

CheckboxContainer.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string
};

export default CheckboxContainer;
