import React from "react";

const Detail = props => {
  return (
    <div style={{ fontSize: 14 }}>
      <div style={{ fontWeight: "bold", marginBottom: 7 }}>{props.title}</div>
      <div>{props.description}</div>
    </div>
  );
};

Detail.propTypes = {};
Detail.defaultProps = {};

export default Detail;
