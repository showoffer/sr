import axios from "axios";
import { getBaseUrl } from "../utilities/getBaseUrl";

export default axios.create({
  baseURL: `${getBaseUrl()}`
});
