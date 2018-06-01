import React, { Component } from "react";
import Checkbox from "../../../../components/Checkbox/Checkbox";
import View from "../../../../components/View/View";

const style = {
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  checkboxWrapper: {
    marginRight: 20
  }
};

class SelectedFieldsContainer extends Component {
  render() {
    const { selectedCategories, removeCategoryFromSelected } = this.props;

    return (
      <div style={style.container}>
        {selectedCategories.map(cat => (
          <View style={style.checkboxWrapper} key={cat.name}>
            <Checkbox
              value={true}
              onChangeCb={() => {
                removeCategoryFromSelected(cat);
              }}
              label={cat.name}
            />
          </View>
        ))}
      </div>
    );
  }
}

export default SelectedFieldsContainer;
