import React from "react";
import "./FileInput.css";
import * as actionCreators from "../../store/actions/actions";

const adaptFileEventToValue = (delegate, dispatch) => e => {
  delegate(e.target.files[0]);
  const formData = new FormData();
  formData.append("content", e.target.files[0]);
  dispatch(actionCreators.uploadFile(formData));
};

const FileInput = ({
  input: { value: omitValue, onChange, onBlur, ...inputProps },
  meta: omitMeta,
  ...props
}) => {
  return (
    <div className="FileInput-wrap">
      <input
        className="FileInput"
        id="FileInput-xls"
        onChange={adaptFileEventToValue(onChange, omitMeta.dispatch)}
        type="file"
        {...inputProps}
        {...props}
      />
      <label htmlFor="FileInput-xls">Upload XLS</label>
      {/*<span className="FileInput-filename">{ omitValue ? omitValue.name : ' Upload Excel file' }</span>*/}
    </div>
  );
};

export default FileInput;
