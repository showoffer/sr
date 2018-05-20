const DEVELOPMENT_BASE_URL = "http://syngenta.inside.cactussoft.biz/";
const PRODUCTION_BASE_URL = "http://syngenta.inside.cactussoft.biz/";

export const getBaseUrl = () => {
  switch (process.env.NODE_ENV) {
    case "development":
      return DEVELOPMENT_BASE_URL;
    case "production":
      return PRODUCTION_BASE_URL;
    default:
      return DEVELOPMENT_BASE_URL;
  }
};
