import axios from "axios";
import { internalServerError } from "../containers/errors/statusCodeMessage";
import { API_HEADER, BASE_URL } from "../constants/apiBaseUrl";
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
      let urlHistory =
        BASE_URL +
        "/coin/" +
        coin +
        "/leasing/history/" +
        address +
        "?size=100";
      let urlBalance =
        BASE_URL + "/coin/" + coin + "/leasing/balance/" + address;

      let responseHistory = await axios.get(urlHistory, API_HEADER);
      let responseBalance = await axios.get(urlBalance);

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

  async saveLeaseTransaction(data, coinName, token) {
    let endpointUrl =
      BASE_URL + "/coin/" + coinName + "/leasing/history/" + data.sender;

    let transactionData = {
      txID: data.id,
      from: data.sender,
      to: data.recipient,
      amount: data.amount,
      fee: data.fee,
      describe: null
    };

    API_HEADER.headers.Authorization = token;
    let response = await axios.post(endpointUrl, transactionData, API_HEADER);
    return response;
  }
}

export default LeasingService;
