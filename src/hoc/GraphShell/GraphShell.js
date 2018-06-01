// @flow
import React from "react";
// import PropTypes from 'prop-types';
import "./GraphShell.css";
import { format } from "../../utilities/formatNumber";

type Props = {
  value: number,
  maxValue: number,
  title: string,
  children: any,
  color: string,
  routerProps: any
};

const GraphShell = (props: Props) => {
  const { value, maxValue, color, title } = props;

  const percentValue = maxValue === 0 ? 0 : (value / maxValue * 100).toFixed(0);

  return (
    <div className="GraphShell">
      <div className="GraphShell-Title-Wrap">
        <div className="GraphShell-Title-left">
          <div className="GraphShell-Title-Percent" style={{ color }}>
            <span className="value">{percentValue}</span>
            <span className="sign">%</span>
          </div>
          <div className="GraphShell-Title">{title}</div>
        </div>
        <div className="GraphShell-Title-right">
          <div className="DetailsImg" />
        </div>
      </div>
      <div className="GraphShell-Sum-Wrap">
        <div className="GraphShell-Sum">
          <span className="title">Delivered</span>
          <span className="value" style={{ color }}>
            ${format(value)}
          </span>
        </div>
        <div className="GraphShell-FullValue">${format(maxValue)}</div>
      </div>
      {props.children}
    </div>
  );
};

GraphShell.propTypes = {};
GraphShell.defaultProps = {
  value: 350,
  maxValue: 900,
  color: "#e267da",
  title: "OPEX Savings"
};

export default GraphShell;
