import axios from "axios";

// CONSTANTS
import { BASE_URL, API_HEADER, HEADER_RESPONSE } from "../constants/apiBaseUrl";

// ERROS
import { internalServerError } from "../containers/errors/statusCodeMessage";

// UTILS
import { setAuthToken } from "../utils/localStorage";

class RechargeService {
  async getCoins(token) {
    try {
      API_HEADER.headers.Authorization = token;

      let response = await axios.get(
        BASE_URL + "/service/recarga",
        API_HEADER
      );
      setAuthToken(response.headers[HEADER_RESPONSE]);

      return response.data;
    } catch (error) {
      return internalServerError();
    }
  }

  async getOperadoras(token, ddd) {
    try {
      API_HEADER.headers.Authorization = token;

      let response = await axios.get(
        BASE_URL + "/recharge/operators/" + ddd,
        API_HEADER
      );
      setAuthToken(response.headers[HEADER_RESPONSE]);

      if (response.data.code !== 200) {
        return internalServerError();
      }

      let operators = [];
      response.data.data.operators.map(val => {
        operators.push({ value: val.id, title: val.name });
      });

      return {
        operators
      };
    } catch (error) {
      return internalServerError();
    }
  }

  async getValoresRecarga(token, action) {
    try {
      API_HEADER.headers.Authorization = token;

      let response = await axios.get(
        `${BASE_URL}/recharge/price/${action.operadora}/${action.ddd}`,
        API_HEADER
      );
      setAuthToken(response.headers[HEADER_RESPONSE]);

      if (response.data.code !== 200) {
        return internalServerError();
      }

      let valores = [];
      response.data.data.prices.map(val => {
        valores.push({ value: val.value, title: "R$" + val.value });
      });

      return valores;
    } catch (error) {
      return internalServerError();
    }
  }

  async getCoinAmountPay(token, coin, value) {
    try {
      API_HEADER.headers.Authorization = token;
      const response = await axios.get(
        `${BASE_URL}/recharge/amount/${coin}?value=${value}`,
        API_HEADER
      );
      setAuthToken(response.headers[HEADER_RESPONSE]);

      return response;
    } catch (error) {
      return internalServerError();
    }
  }

  async sendRecharge(token, payload) {
    try {
      API_HEADER.headers.Authorization = token;
      const response = await axios.post(
        `${BASE_URL}/recharge/pay`,
        payload,
        API_HEADER
      );
      setAuthToken(response.headers[HEADER_RESPONSE]);
      return response;
    } catch (error) {
      internalServerError();
      return;
    }
  }

  async getHistory(token) {
    try {
      API_HEADER.headers.Authorization = token;

      let response = await axios.get(
        `${BASE_URL}/recharge/history`,
        API_HEADER
      );
      setAuthToken(response.headers[HEADER_RESPONSE]);

      return response.data.data;
    } catch (error) {
      return internalServerError();
    }
  }
}

export default RechargeService;
