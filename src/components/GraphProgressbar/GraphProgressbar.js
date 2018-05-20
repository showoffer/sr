// @flow

import React from "react";
// import PropTypes from 'prop-types';
import "./GraphProgressbar.css";

type Props = {
  value: number,
  maxValue: number,
  startColor: string,
  endColor: string
};

const GraphProgressbar = (props: Props) => {
  const { value, maxValue, startColor, endColor } = props;

  const progressStyle = {
    background: `linear-gradient(to right, ${startColor} , ${endColor})`,
    width: maxValue === 0 ? 0 : (value / maxValue * 100).toFixed(2) + "%"
  };

  const tailStyle = {
    backgroundColor: endColor
  };

  return (
    <div className="canvas">
      <div className="progress" style={progressStyle} />
      <div className="tail-wrap">
        <div className="tail" style={tailStyle} />
      </div>
    </div>
  );
};

GraphProgressbar.defaultProps = {
  value: 350,
  maxValue: 900,
  startColor: "#e267da",
  endColor: "#fa58b4"
};

export default GraphProgressbar;
