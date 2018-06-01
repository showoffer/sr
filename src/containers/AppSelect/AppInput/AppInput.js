// @flow

import React, { Component } from "react";
import MenuContainer from "../MenuContainer/MenuContainer";
import type { Props as SelectProps } from "../AppSelect";
import arrowUpImg from "../../../assets/arrow-up.svg";
import arrowDownImg from "../../../assets/arrow-down.svg";
import View from "../../../components/View/View";

const styles = {
  container: {
    flex: 1
  },
  selectedCategoriesWrapper: {
    border: "solid 1px #d1dae8",
    borderRadius: 4,
    padding: "11px 30px 11px 15px",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    cursor: "pointer",
    position: "relative"
  },
  menuContainerWrapper: {
    flex: 1,
    position: "relative"
  },
  menuContainer: {
    position: "absolute",
    // height: 300,
    width: "100%",
    boxSizing: "border-box",
    top: 12,
    left: 0,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 4,
    boxShadow: "0 8px 16px 0 rgba(0, 0, 0, 0.04)",
    border: "solid 1px #d1dae8",
    zIndex: 100
  },
  openedImageWrapper: {
    display: "inline-block",
    position: "absolute",
    right: 10,
    top: "50%",
    transform: "translateY(-60%)"
  }
};

type State = {
  opened: boolean
};

class AppInput extends Component<SelectProps, State> {
  state = {
    opened: false
  };

  toggleOpened = (value: boolean) => {
    this.setState({ opened: !value });
  };

  render() {
    const { selectedCategories, placeholder } = this.props;
    const { opened } = this.state;

    return (
      <React.Fragment>
        <div
          style={styles.selectedCategoriesWrapper}
          onClick={() => this.toggleOpened(opened)}
        >
          {selectedCategories.length === 0 ? (
            <span style={{ color: "#9e9e9e" }}>{placeholder}</span>
          ) : null}
          {selectedCategories.map(v => v.name).join(", ")}
          <View style={styles.openedImageWrapper}>
            <img
              src={opened ? arrowUpImg : arrowDownImg}
              alt={opened ? "^" : "v"}
            />
          </View>
        </div>
        {opened ? (
          <div style={styles.menuContainerWrapper}>
            <div style={styles.menuContainer}>
              <MenuContainer {...this.props} />
            </div>
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}

export default AppInput;
