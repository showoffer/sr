import React from "react";
// import PropTypes from 'prop-types';
import { Field, reduxForm } from "redux-form";
import FileInput from "../FileInput/FileInput";

const UploaderForm = props => {
  return (
    <form className="UploaderForm">
      <Field type="file" name="file" component={FileInput} />
    </form>
  );
};

UploaderForm.propTypes = {};
UploaderForm.defaultProps = {};

export default reduxForm({
  form: "uploader"
})(UploaderForm);
