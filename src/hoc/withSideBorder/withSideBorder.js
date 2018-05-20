import React from "react";
import PropTypes from "prop-types";
import "./withSideBorder.css";
import classNames from "classnames";

const withSideBorder = props => {
  let className = "";
  switch (props.side) {
    default:
      className = "border-left";
      break;
  }
  return (
    <div className={classNames("WithBorder", className)}>{props.children}</div>
  );
};

withSideBorder.propTypes = {
  side: PropTypes.oneOf(["left"])
};
withSideBorder.defaultProps = {};

export default withSideBorder;
