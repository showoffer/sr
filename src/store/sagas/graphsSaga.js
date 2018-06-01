import { put, takeLatest, select } from "redux-saga/effects";
import { CHANGE_GRAPHS, GET_ME_GRAPHS } from "../actions/actions";
import { GRAPHS_DATA } from "../../const/GRAPHS_DATA";
import { getReportGraphValue } from "../../utilities/getReportGraphValues";
import { getReports } from "../../utilities/getReports";

const getArray = object => Object.keys(object).filter(v => object[v]);

const getRegions = state =>
  state.form.regions && state.form.regions.values
    ? getArray(state.form.regions.values)
    : [];
const getTerritories = state =>
  state.form.territories && state.form.territories.values
    ? getArray(state.form.territories.values)
    : [];
const getCategories = state => state.categories.selectedCategories;
const getSubcategories = state => state.categories.selectedSubcategories;

export function* changeGraphs() {
  const regions = yield select(getRegions);
  const territories = yield select(getTerritories);
  const categories = yield select(getCategories);
  const subcategories = yield select(getSubcategories);

  const reports = yield getReports(
    regions,
    territories,
    categories,
    subcategories
  );

  const results = GRAPHS_DATA.map((gd, i) => {
    return {
      ...gd,
      ...getReportGraphValue(reports[i].data)
    };
  });

  yield put({ type: CHANGE_GRAPHS, results });
}

export default function* watchChangeGraphs() {
  yield takeLatest(GET_ME_GRAPHS, changeGraphs);
}
