import React from "react";
import ReactDOM from "react-dom";
import GraphProgressbar from "./GraphProgressbar";
import { shallow } from "enzyme";

describe("<GraphProgressbar />", () => {
  const wrapper = shallow(<GraphProgressbar />);
  it("should contain one element with 'progress' class", () => {
    expect(wrapper.find(".progress").length).toBe(1);
  });
});
