import React, { Component } from "react";
import { connect } from "react-redux";
import {
  ADD_CATEGORY_TO_FOUND,
  ADD_CATEGORY_TO_SELECTED,
  ADD_SUBCATEGORIES_TO_ALL_SUBCATEGORIES,
  ADD_SUBCATEGORIES_TO_FOUND_SUBCATEGORIES,
  ADD_SUBCATEGORY_TO_FOUND,
  ADD_SUBCATEGORY_TO_SELECTED,
  EMIT_SELECTED_CATEGORIES,
  EMIT_SELECTED_SUBCATEGORIES,
  REMOVE_CATEGORY_FROM_FOUND,
  REMOVE_CATEGORY_FROM_SELECTED,
  REMOVE_SUBCATEGORY_FROM_ALL,
  REMOVE_SUBCATEGORY_FROM_FOUND,
  REMOVE_SUBCATEGORY_FROM_SELECTED,
  SEARCH_CATEGORIES,
  SEARCH_SUBCATEGORIES
} from "../../store/reducers/categories";
import AppSelect from "../AppSelect/AppSelect";
import View from "../../components/View/View";

const styles = {
  selectContainer: {
    display: "inline-block",
    width: "47%",
    marginRight: "3%"
  }
};

class FiltersContainer extends Component {
  render() {
    return (
      <div>
        <View style={styles.selectContainer}>
          <AppSelect
            {...{ ...this.props.categories, ...this.props.categoriesFn }}
          />
        </View>
        <View style={styles.selectContainer}>
          <AppSelect
            {...{ ...this.props.subcategories, ...this.props.subcategoriesFn }}
          />
        </View>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categories: {
    allCategories: state.categories.allCategories,
    foundCategories: state.categories.foundCategories,
    selectedCategories: state.categories.selectedCategories,
    placeholder: "Select category"
  },
  subcategories: {
    allCategories: state.categories.allSubcategories,
    foundCategories: state.categories.foundSubcategories,
    selectedCategories: state.categories.selectedSubcategories,
    placeholder: "Select subcategory"
  }
});

const mapDispatchToProps = dispatch => ({
  categoriesFn: {
    removeCategoryFromSelected: category => {
      dispatch({
        type: REMOVE_CATEGORY_FROM_SELECTED,
        payload: { category, selector: "selectedCategories" }
      });
      dispatch({
        type: ADD_CATEGORY_TO_FOUND,
        payload: { category, selector: "foundCategories" }
      });
      category.subCategories.forEach(name => {
        dispatch({
          type: REMOVE_SUBCATEGORY_FROM_SELECTED,
          payload: { category: { name }, selector: "selectedSubcategories" }
        });
        dispatch({
          type: REMOVE_SUBCATEGORY_FROM_FOUND,
          payload: { category: { name }, selector: "foundSubcategories" }
        });
        dispatch({
          type: REMOVE_SUBCATEGORY_FROM_ALL,
          payload: { category: { name }, selector: "allSubcategories" }
        });
      });
      dispatch({ type: EMIT_SELECTED_CATEGORIES });
    },
    addCategoryToSelected: category => {
      dispatch({
        type: ADD_CATEGORY_TO_SELECTED,
        payload: { category, selector: "selectedCategories" }
      });
      dispatch({
        type: REMOVE_CATEGORY_FROM_FOUND,
        payload: { category, selector: "foundCategories" }
      });
      dispatch({
        type: ADD_SUBCATEGORIES_TO_ALL_SUBCATEGORIES,
        payload: {
          selector: "allSubcategories",
          categories: category.subCategories.map(name => ({ name }))
        }
      });
      dispatch({
        type: ADD_SUBCATEGORIES_TO_FOUND_SUBCATEGORIES,
        payload: {
          selector: "foundSubcategories",
          categories: category.subCategories.map(name => ({ name }))
        }
      });
      dispatch({ type: EMIT_SELECTED_CATEGORIES });
    },
    searchCategories: term => {
      dispatch({
        type: SEARCH_CATEGORIES,
        payload: {
          selector: "foundCategories",
          allItemsSelector: "allCategories",
          selectedItemsSelector: "selectedCategories",
          term
        }
      });
    }
  },
  subcategoriesFn: {
    removeCategoryFromSelected: category => {
      dispatch({
        type: REMOVE_SUBCATEGORY_FROM_SELECTED,
        payload: { category, selector: "selectedSubcategories" }
      });
      dispatch({
        type: ADD_SUBCATEGORY_TO_FOUND,
        payload: { category, selector: "foundSubcategories" }
      });
      dispatch({ type: EMIT_SELECTED_SUBCATEGORIES });
    },
    addCategoryToSelected: category => {
      dispatch({
        type: ADD_SUBCATEGORY_TO_SELECTED,
        payload: { category, selector: "selectedSubcategories" }
      });
      dispatch({
        type: REMOVE_SUBCATEGORY_FROM_FOUND,
        payload: { category, selector: "foundSubcategories" }
      });
      dispatch({ type: EMIT_SELECTED_SUBCATEGORIES });
    },
    searchCategories: term => {
      dispatch({
        type: SEARCH_SUBCATEGORIES,
        payload: {
          selector: "foundSubcategories",
          allItemsSelector: "allSubcategories",
          selectedItemsSelector: "selectedSubcategories",
          term
        }
      });
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(FiltersContainer);
