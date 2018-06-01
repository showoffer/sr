import React, { Component } from "react";
import Text from "../../../components/Text/Text";
import ListContainer from "./ListContainer/ListContainer";
import SelectedFieldsContainer from "./SelectedFieldsContainer/SelectedFieldsContainer";
import SearchField from "./SearchField/SearchField";
import View from "../../../components/View/View";

const styles = {
  headText: {
    fontSize: "1.6rem",
    fontWeight: 600,
    color: "#9e9e9e"
  },
  selectedFieldsWrap: {
    padding: "14px 0 20px 0",
    marginBottom: 24,
    borderBottom: "1px solid #d1dae8"
  },
  listContainerWrap: {
    maxHeight: 400,
    overflow: "auto"
  }
};

class MenuContainer extends Component {
  render() {
    return (
      <div>
        <Text style={styles.headText}>Selected categories</Text>
        <View style={styles.selectedFieldsWrap}>
          <SelectedFieldsContainer {...this.props} />
        </View>
        <SearchField {...this.props} />
        <View style={styles.listContainerWrap}>
          <ListContainer {...this.props} />
        </View>
      </div>
    );
  }
}

export default MenuContainer;
