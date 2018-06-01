import {
  categoriesSubject,
  subcategoriesSubject
} from "../../const/categoriesObservables";

export const SET_ALL_CATEGORIES = "SET_ALL_CATEGORIES";
export const SET_FOUND_CATEGORIES = "SET_FOUND_CATEGORIES";

export const ADD_CATEGORY_TO_FOUND = "ADD_CATEGORY_TO_FOUND";
export const REMOVE_CATEGORY_FROM_FOUND = "REMOVE_CATEGORY_FROM_FOUND";
export const ADD_CATEGORY_TO_SELECTED = "ADD_CATEGORY_TO_SELECTED";
export const REMOVE_CATEGORY_FROM_SELECTED = "REMOVE_CATEGORY_FROM_SELECTED";
export const SEARCH_CATEGORIES = "SEARCH_CATEGORIES";

export const ADD_SUBCATEGORIES_TO_ALL_SUBCATEGORIES =
  "ADD_SUBCATEGORIES_TO_ALL_SUBCATEGORIES";
export const ADD_SUBCATEGORIES_TO_FOUND_SUBCATEGORIES =
  "ADD_SUBCATEGORIES_TO_FOUND_SUBCATEGORIES";

export const SET_ALL_SUBCATEGORIES = "SET_ALL_SUBCATEGORIES";
export const SET_FOUND_SUBCATEGORIES = "SET_FOUND_SUBCATEGORIES";

export const ADD_SUBCATEGORY_TO_FOUND = "ADD_SUBCATEGORY_TO_FOUND";
export const REMOVE_SUBCATEGORY_FROM_FOUND = "REMOVE_SUBCATEGORY_FROM_FOUND";
export const ADD_SUBCATEGORY_TO_SELECTED = "ADD_SUBCATEGORY_TO_SELECTED";
export const REMOVE_SUBCATEGORY_FROM_SELECTED =
  "REMOVE_SUBCATEGORY_FROM_SELECTED";
export const REMOVE_SUBCATEGORY_FROM_ALL = "REMOVE_SUBCATEGORY_FROM_ALL";
export const SEARCH_SUBCATEGORIES = "SEARCH_SUBCATEGORIES";

export const EMIT_SELECTED_CATEGORIES = "EMIT_SELECTED_CATEGORIES";
export const EMIT_SELECTED_SUBCATEGORIES = "EMIT_SELECTED_SUBCATEGORIES";

const initialState = {
  allCategories: [],
  foundCategories: [],
  selectedCategories: [],
  allSubcategories: [],
  foundSubcategories: [],
  selectedSubcategories: []
};

const filterCategories = categories => {
  return [
    ...new Set(categories.map(c => c.name).filter(name => name !== ""))
  ].map(name => ({ name }));
};

const categories = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_ALL_CATEGORIES:
    case SET_ALL_SUBCATEGORIES: {
      return {
        ...state,
        [payload.selector]: payload.categories
      };
    }
    case SET_FOUND_CATEGORIES:
    case SET_FOUND_SUBCATEGORIES: {
      return {
        ...state,
        [payload.selector]: payload.categories
      };
    }
    case ADD_CATEGORY_TO_SELECTED:
    case ADD_SUBCATEGORY_TO_SELECTED: {
      const category = payload.category;

      const categories = [...state[payload.selector], category];

      return {
        ...state,
        [payload.selector]: categories
      };
    }
    case REMOVE_CATEGORY_FROM_SELECTED:
    case REMOVE_SUBCATEGORY_FROM_SELECTED:
    case REMOVE_SUBCATEGORY_FROM_ALL: {
      const category = payload.category;

      const categories = state[payload.selector].filter(
        cat => cat.name !== category.name
      );

      return {
        ...state,
        [payload.selector]: categories
      };
    }
    case REMOVE_CATEGORY_FROM_FOUND:
    case REMOVE_SUBCATEGORY_FROM_FOUND: {
      const category = payload.category;

      const categories = state[payload.selector].filter(
        cat => cat.name !== category.name
      );

      return {
        ...state,
        [payload.selector]: categories
      };
    }
    case ADD_CATEGORY_TO_FOUND:
    case ADD_SUBCATEGORY_TO_FOUND: {
      const category = payload.category;

      const categories = [...state[payload.selector], category];

      return {
        ...state,
        [payload.selector]: categories
      };
    }
    case SEARCH_CATEGORIES:
    case SEARCH_SUBCATEGORIES: {
      const term = payload.term;

      const categories =
        term !== ""
          ? state[payload.selector].filter(cat =>
              cat.name.toLowerCase().includes(term.toLowerCase())
            )
          : state[payload.allItemsSelector].filter(item =>
              state[payload.selectedItemsSelector]
                .map(item => item.name)
                .every(v => v !== item.name)
            );

      return {
        ...state,
        [payload.selector]: categories
      };
    }
    case ADD_SUBCATEGORIES_TO_ALL_SUBCATEGORIES: {
      return {
        ...state,
        [payload.selector]: filterCategories([
          ...state[payload.selector],
          ...payload.categories
        ])
      };
    }
    case ADD_SUBCATEGORIES_TO_FOUND_SUBCATEGORIES: {
      return {
        ...state,
        [payload.selector]: filterCategories([
          ...state[payload.selector],
          ...payload.categories
        ])
      };
    }
    case EMIT_SELECTED_CATEGORIES: {
      categoriesSubject.next(state.selectedCategories);
      break;
    }
    case EMIT_SELECTED_SUBCATEGORIES: {
      subcategoriesSubject.next(state.selectedSubcategories);
      break;
    }
    default: {
    }
  }

  return state;
};

export default categories;
