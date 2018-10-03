import axios from "axios";

// CONSTANTS
import {
  BASE_URL,
  API_HEADER,
  LUNESNODE_URL,
  HEADER_REQUEST
} from "../constants/apiBaseUrl";

// UTILS
import i18n from "../utils/i18n.js";

const PATHS = {
  GET_BALANCE: (address) => "coin/lunes/asset/balance/" + address,
  GET_TX_HISTORY: (address, assetId) => "coin/lunes/asset/history/" + address + "/" + assetId
}

const Axios = axios.create({
  baseURL: BASE_URL,
  headers: API_HEADER.headers,
  timeout: 30000,
  validateStatus: function() {
    return true;
  }
});

class AssetService {
  responseValidation(response) {
    if (!response)
      throw {type: 'error',message:i18n.t("ASSETS_EMPTY_RESPONSE")}

    if (response.errorMessage) {
      let errorMessage = JSON.parse(response.errorMessage);
      return this.responseValidation(errorMessage);
    }

    let {
      code, message: serverMessage, axiosStatus: status
    } = response ? response : {};

    code = code ? code.toString() : status ? status.toString() : '0';

    if (code !== '200') {
      if (code.startsWith('4'))
        throw ({ type: 'error', message: i18n.t("ASSETS_BAD_REQUEST"),
        serverMessage })
      else if (code.startsWith('5'))
        throw ({ type: 'error', message: i18n.t("ASSETS_SERVER_ERROR"),
        serverMessage })
      else
        throw ({ type: 'error', message: i18n.t("ASSETS_UNKNOWN_ERROR"),
        serverMessage })
    }
    return { type: 'success' }
  }

  async getBalances(address, token) {
    try {
      let { data: result, status } = await Axios.get(PATHS.GET_BALANCE(address),{
        headers: { Authorization: token }
      });
      let { data, nodeImages } = result;

      if(status === 200) {
        nodeImages = data.balances.map(async (token, i) => {
          await axios.get(LUNESNODE_URL + "/addresses/alias/by-address/" + token.sender, HEADER_REQUEST).then((res) => {
            let url = res.data[0].split(":"); 
            data.balances[i].image = "http://" + url[2] + "/nodeimage.png"
          }).catch((() => {
            data.balances[i].image = "images/icons/tokens/default.png"
          }));
        })
      }

      /* eslint-disable*/
      await Promise.all(nodeImages)
      /* eslint-enable*/

      this.responseValidation({...result, axiosStatus: status});

      return { type: 'success', data: data };
    } catch (error) {
      console.warn(error);
      return {type: 'error', message: error.message || i18n.t("ASSETS_UNKNOWN_ERROR_1")}
    }
  }
  async getTxHistory(address, assetId, token) {
    try {
      let { data: result, status } = await Axios.get(PATHS.GET_TX_HISTORY(
        address, assetId), { headers: { Authorization: token } });
      let { data } = result ? result : {};
      let { assets } = data ? data : {};

      this.responseValidation({...result, axiosStatus: status});

      if (!assets)
        return { type: 'error', message: i18n.t("ASSETS_NO_TX_HISTORY_1") }
      if (assets.constructor.name !== 'Array')
        return { type: 'error', message: i18n.t("ASSETS_NO_TX_HISTORY_2") }
      if (assets.length < 1)
        return { type: 'error', message: i18n.t("ASSETS_NO_TX_HISTORY_3") }

      return { type: 'success', data };
    } catch(error) {
      console.warn(error);
      return {type: 'error', message: error.message || i18n.t("ASSETS_UNKNOWN_ERROR_1")}
    }
  }
}

export default AssetService;
