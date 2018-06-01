import { put, takeLatest, select } from "redux-saga/effects";
import { GRAPHS_DATA } from "../../const/GRAPHS_DATA";
import axios from "../../api/axios";
import { GET_DEALS, GET_ME_DEALS } from "../reducers/deals";
import qs from "qs";

const getRoutePath = state => state.deals.routePath;
const getRegions = state =>
  state.form.regions && state.form.regions.values
    ? state.form.regions.values
    : [];
const getTerritories = state =>
  state.form.territories && state.form.territories.values
    ? state.form.territories.values
    : [];
const getCategories = state => state.categories.selectedCategories;
const getSubcategories = state => state.categories.selectedSubcategories;

const getArrayFromObject = o => Object.keys(o).filter(k => o[k]);

export function* getDeals() {
  const routePath = yield select(getRoutePath);
  const Regions = yield select(getRegions);
  const Territories = yield select(getTerritories);
  const Categories = yield select(getCategories);
  const Subcategories = yield select(getSubcategories);
  const { dealsApi } = GRAPHS_DATA.find(v => routePath.includes(v.title));
  const { data } = yield axios.get(`/api/Report/${dealsApi}`, {
    params: {
      Regions: getArrayFromObject(Regions),
      Territories: getArrayFromObject(Territories),
      Categories,
      Subcategories
    },
    paramsSerializer: function(params) {
      return qs.stringify(params, { arrayFormat: "repeat" });
    }
  });
  yield put({ type: GET_DEALS, payload: { data } });
}

export default function* watchGetDeals() {
  yield takeLatest(GET_ME_DEALS, getDeals);
}
