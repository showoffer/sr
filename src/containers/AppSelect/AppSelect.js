// @flow

import React, { Component } from "react";
import AppInput from "./AppInput/AppInput";

export type Props = {
  allCategories: any[],
  foundCategories: any[],
  selectedCategories: any[],
  placeholder: string
};

class AppSelect extends Component<Props> {
  render() {
    return <AppInput {...this.props} />;
  }
}

export default AppSelect;
