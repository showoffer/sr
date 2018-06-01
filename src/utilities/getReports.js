// @flow
import originAxios from "axios";
import axios from "../api/axios";
import qs from "qs";
import { getBaseUrl } from "./getBaseUrl";

const opexBenefitsRequest = (
  Regions: string[],
  Territories: string[],
  Categories: string[],
  Subcategories: string[]
) => {
  return axios.get(`${getBaseUrl()}api/Report/opex/benefits`, {
    params: {
      Regions,
      Territories,
      Categories,
      Subcategories
    },
    paramsSerializer: function(params) {
      return qs.stringify(params, { arrayFormat: "repeat" });
    }
  });
};

const opexSavingsRequest = (
  Regions: string[],
  Territories: string[],
  Categories: string[],
  Subcategories: string[]
) => {
  return axios.get(`${getBaseUrl()}api/Report/opex/savings`, {
    params: {
      Regions,
      Territories,
      Categories,
      Subcategories
    },
    paramsSerializer: function(params) {
      return qs.stringify(params, { arrayFormat: "repeat" });
    }
  });
};

const capexSumRequest = (
  Regions: string[],
  Territories: string[],
  Categories: string[],
  Subcategories: string[]
) => {
  return axios.get(`${getBaseUrl()}api/Report/capex`, {
    params: {
      Regions,
      Territories,
      Categories,
      Subcategories
    },
    paramsSerializer: function(params) {
      return qs.stringify(params, { arrayFormat: "repeat" });
    }
  });
};

const wcmRequest = (
  Regions: string[],
  Territories: string[],
  Categories: string[],
  Subcategories: string[]
) => {
  return axios.get(`${getBaseUrl()}api/Report/wcm`, {
    params: {
      Regions,
      Territories,
      Categories,
      Subcategories
    },
    paramsSerializer: function(params) {
      return qs.stringify(params, { arrayFormat: "repeat" });
    }
  });
};

export const getReports = (
  Regions: string[],
  Territories: string[],
  Categories: any[],
  Subcategories: any[]
) => {
  const categories = Categories.map(v => v.name);
  const subcategories = Subcategories.map(v => v.name);
  return originAxios.all([
    opexBenefitsRequest(Regions, Territories, categories, subcategories),
    opexSavingsRequest(Regions, Territories, categories, subcategories),
    capexSumRequest(Regions, Territories, categories, subcategories),
    wcmRequest(Regions, Territories, categories, subcategories)
  ]);
};
