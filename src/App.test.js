import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Layout from "./hoc/Layout/Layout";
import { shallow } from "enzyme";

describe("<App />", () => {
  const wrapper = shallow(<App />);
  it("should contain one Layout", () => {
    expect(wrapper.find(Layout).length).toBe(1);
  });
});
