import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Checkbox.css";
import checkActiveImg from "../../assets/check-active.svg";
import checkInactiveImg from "../../assets/check-inactive.svg";
import classNames from "classnames";

class Checkbox extends Component {
  render() {
    const {
      input: { value, onChange },
      type,
      label,
      checkedLabelClass
    } = this.props;

    const checkedClass = value ? "checked" : "";
    const checkedLabelClassUse = value ? checkedLabelClass : "";

    const component =
      type === "Button" ? (
        <button
          type="button"
          onClick={() => onChange(!value)}
          className={checkedClass}
        >
          <span className="checkbox-button-label" title={label}>
            {label}
          </span>
        </button>
      ) : (
        <span
          onClick={() => onChange(!value)}
          className={classNames("checkbox", checkedClass)}
        >
          <img
            src={value ? checkActiveImg : checkInactiveImg}
            alt={value ? "v" : "x"}
          />
          <span
            className={classNames(
              "checkbox-label",
              checkedClass,
              checkedLabelClassUse
            )}
            title={label}
          >
            {label}
          </span>
        </span>
      );

    return <div className="checkbox-outer">{component}</div>;
  }
}

Checkbox.propTypes = {
  type: PropTypes.oneOf(["Button", "Checkbox"]),
  label: PropTypes.string,
  value: PropTypes.string,
  fontColor: PropTypes.string,
  checkedLabelClass: PropTypes.string
};
Checkbox.defaultProps = {
  type: "Checkbox",
  checkedLabelClass: ""
};

export default Checkbox;
