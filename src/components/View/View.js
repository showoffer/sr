import React from "react";

const View = props => {
  return <div style={props.style}>{props.children}</div>;
};

View.propTypes = {};
View.defaultProps = {};

export default View;
