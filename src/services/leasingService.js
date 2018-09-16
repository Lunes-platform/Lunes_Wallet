import axios from "axios";
import { internalServerError } from "../containers/errors/statusCodeMessage";
import { API_HEADER, BASE_URL, HEADER_RESPONSE } from "../constants/apiBaseUrl";
import { setAuthToken } from "../utils/localStorage";
class LeasingService {
  async getProfessionalNodes() {
    try {
      let response = await axios.get("https://lunes.in/trust.json");

      return response.data.node;
    } catch (error) {
      internalServerError();
      return;
    }
  }

  async getLeasingHistory(coin, address, token) {
    try {
      API_HEADER.headers.Authorization = token;
      let responseHistory = await axios.get(
        BASE_URL +
          "/coin/" +
          coin +
          "/leasing/history/" +
          address +
          "?size=100",
        API_HEADER
      );
      let responseBalance = await axios.get(
        BASE_URL + "/coin/" + coin + "/leasing/balance/" + address,
        API_HEADER
      );

      setAuthToken(responseBalance.headers[HEADER_RESPONSE]);

      if (
        responseHistory.data.code === 200 &&
        responseBalance.data.code === 200
      ) {
        let dataResponse = {
          balance: responseBalance,
          history: responseHistory
        };
        return dataResponse;
      }
      internalServerError();
      return;
    } catch (error) {
      internalServerError();
      return;
    }
  }
}

export default LeasingService;
