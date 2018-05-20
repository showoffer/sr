import React from "react";
import { shallow } from "enzyme";
import { Layout } from "./Layout";

describe("<Layout />", () => {
  it("should contain loader", () => {
    const props = {
      fadeOut: false,
      territories: [],
      getRegions: jest.fn()
    };
    const wrapper = shallow(<Layout {...props} />);
    expect(wrapper.find(".loader-outer").length).toBe(1);
    expect(wrapper.find(".loader").length).toBe(1);
  });
});
