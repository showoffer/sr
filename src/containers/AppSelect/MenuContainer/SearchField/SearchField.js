import React from "react";

const style = {
  wrapper: {
    width: "100%",
    display: "flex"
  },
  input: {
    border: "solid 1px #d1dae8",
    flex: 1,
    borderRadius: 3,
    padding: 8
  }
};

const SearchField = props => {
  return (
    <div style={style.wrapper}>
      <input
        style={style.input}
        type="text"
        onChange={e => {
          props.searchCategories(e.target.value);
        }}
      />
    </div>
  );
};

export default SearchField;
