// @flow
import { change } from "redux-form";

const checkCheckbox = dispatch => (formName, fieldName, value) => {
  dispatch(change(formName, fieldName, value));
};

export const checkAllCheckboxes = (dispatch: Function) => (
  formName: string,
  fieldNames: string[],
  value: any
) => {
  fieldNames.map(name => checkCheckbox(dispatch)(formName, name, value));
};
