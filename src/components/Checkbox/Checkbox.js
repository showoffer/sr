// @flow
import React, { Component } from "react";
import classNames from "classnames";
import checkActiveImg from "../../assets/check-active.svg";
import checkInactiveImg from "../../assets/check-inactive.svg";
import "./Checkbox.css";

type Props = {
  value: boolean,
  onChangeCb: Function,
  label: string
};

class Checkbox extends Component<Props> {
  static defaultProps = {
    value: false,
    onChangeCb: null,
    label: "Label"
  };

  render() {
    const { onChangeCb, label, value } = this.props;

    const checkedClass = value ? "checked" : "";

    return (
      <span
        onClick={() => {
          onChangeCb && onChangeCb(!value);
        }}
        className={classNames("checkbox", checkedClass)}
      >
        <img
          src={value ? checkActiveImg : checkInactiveImg}
          alt={value ? "v" : "x"}
        />
        <span
          className={classNames("checkbox-label", checkedClass)}
          title={label}
        >
          {label}
        </span>
      </span>
    );
  }
}

export default Checkbox;
