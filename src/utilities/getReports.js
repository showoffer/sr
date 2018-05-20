// @flow
import originAxios from "axios";
import axios from "../api/axios";
import qs from "qs";
import { getBaseUrl } from "./getBaseUrl";

const opexBenefitsRequest = (Regions: string[], Territories: string[]) => {
  return axios.get(`${getBaseUrl()}api/Report/opex/benefits`, {
    params: {
      Regions,
      Territories
    },
    paramsSerializer: function(params) {
      return qs.stringify(params, { arrayFormat: "repeat" });
    }
  });
};

const opexSavingsRequest = (Regions: string[], Territories: string[]) => {
  return axios.get(`${getBaseUrl()}api/Report/opex/savings`, {
    params: {
      Regions,
      Territories
    },
    paramsSerializer: function(params) {
      return qs.stringify(params, { arrayFormat: "repeat" });
    }
  });
};

const capexSumRequest = (Regions: string[], Territories: string[]) => {
  return axios.get(`${getBaseUrl()}api/Report/capex`, {
    params: {
      Regions,
      Territories
    },
    paramsSerializer: function(params) {
      return qs.stringify(params, { arrayFormat: "repeat" });
    }
  });
};

const wcmRequest = (Regions: string[], Territories: string[]) => {
  return axios.get(`${getBaseUrl()}api/Report/wcm`, {
    params: {
      Regions,
      Territories
    },
    paramsSerializer: function(params) {
      return qs.stringify(params, { arrayFormat: "repeat" });
    }
  });
};

export const getReports = (Regions: string[], Territories: string[]) => {
  return originAxios.all([
    opexBenefitsRequest(Regions, Territories),
    opexSavingsRequest(Regions, Territories),
    capexSumRequest(Regions, Territories),
    wcmRequest(Regions, Territories)
  ]);
};
