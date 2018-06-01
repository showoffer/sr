import React, { Component } from "react";
import Checkbox from "../../../../components/Checkbox/Checkbox";
import View from "../../../../components/View/View";

const styles = {
  checkboxWrapper: {
    margin: "16px 0"
  }
};

class ListContainer extends Component {
  render() {
    const { foundCategories } = this.props;
    return (
      <div>
        {foundCategories.map(cat => (
          <View style={styles.checkboxWrapper} key={cat.name}>
            <Checkbox
              value={false}
              onChangeCb={() => {
                this.props.addCategoryToSelected(cat);
              }}
              label={cat.name}
            />
          </View>
        ))}
      </div>
    );
  }
}

export default ListContainer;
