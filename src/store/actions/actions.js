import originAxios from "axios";
import axios from "../../api/axios";
import Region from "../models/Region";
import { getReports } from "../../utilities/getReports";
import { GRAPHS_DATA } from "../../const/GRAPHS_DATA";
import { getReportGraphValue } from "../../utilities/getReportGraphValues";

export const CHANGE_GRAPHS = "CHANGE_GRAPHS";

export const APP_IS_LOADED = "APP_IS_LOADED";
export const LOADER_FADE = "LOADER_FADE";
export const FILE_IS_LOADED = "FILE_IS_LOADED";
export const REGIONS_FETCHED = "REGIONS_FETCHED";
export const CHECK_ALL_REGIONS_TERRITORIES = "CHECK_ALL_REGIONS_TERRITORIES";

export const TERRITORIES_FETCHED = "TERRITORIES_FETCHED";

export const changeGraphs = results => {
  return {
    type: CHANGE_GRAPHS,
    results
  };
};

export const changeGraphsAsync = results => {
  return dispatch => {
    setTimeout(() => {
      dispatch(changeGraphs(results));
    }, 1000);
  };
};

export const fileIsLoaded = isLoaded => {
  return {
    type: FILE_IS_LOADED,
    isLoaded
  };
};

export const regionsFetched = regions => {
  return {
    type: REGIONS_FETCHED,
    regions
  };
};

export const territoriesFetched = territories => {
  return {
    type: TERRITORIES_FETCHED,
    territories
  };
};

export const checkAllRegionsTerritories = value => {
  return {
    type: CHECK_ALL_REGIONS_TERRITORIES,
    value
  };
};

export const loadRegions = () => {
  return dispatch => {
    axios.get(`api/Regions`).then(
      res => {
        const regions = res.data.map(v => new Region(v));
        dispatch(regionsFetched(regions));
        dispatch({ type: APP_IS_LOADED, isLoading: false });
        setTimeout(() => {
          dispatch({ type: LOADER_FADE, fadeOut: true });
        }, 750);
        if (regions.length > 0) {
          dispatch(fileIsLoaded(true));
        }
      },
      err => console.log(err)
    );
  };
};

export const loadReports = (Regions, Territories) => {
  return dispatch => {
    getReports(Regions, Territories).then(
      originAxios.spread((...rest) => {
        const data = GRAPHS_DATA.map((gd, i) => {
          return {
            ...gd,
            ...getReportGraphValue(rest[i].data)
          };
        });
        dispatch(changeGraphs(data));
      })
    );
  };
};

export const uploadFile = formData => {
  return dispatch => {
    dispatch({ type: APP_IS_LOADED, isLoading: true });
    dispatch({ type: LOADER_FADE, fadeOut: false });
    axios
      .post("api/Import", formData, {
        params: {
          year: 2018
        }
      })
      .then(res => {
        dispatch(loadRegions());
      });
  };
};
