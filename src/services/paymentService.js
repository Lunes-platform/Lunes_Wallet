import axios from "axios";
import { BASE_URL, API_HEADER, HEADER_RESPONSE } from "../constants/apiBaseUrl";
import { internalServerError } from "../containers/errors/statusCodeMessage";
import { setAuthToken } from "../utils/localStorage";

class PaymentService {
  async getCoins(token) {
    try {
      API_HEADER.headers.Authorization = token;

      let response = await axios.get(
        `${BASE_URL}/service/pagamento`,
        API_HEADER
      );
      setAuthToken(response.headers[HEADER_RESPONSE]);

      return response.data;
    } catch (error) {
      return internalServerError();
    }
  }

  async getInvoice(token, number) {
    try {
      //API_HEADER.headers.Authorization = token;

      const response = await axios.get(
        `${BASE_URL}/bill/${number}` /*, API_HEADER*/
      );
      // TODO: enable setAuthToken when the header is in the api response
      // setAuthToken(response.headers[HEADER_RESPONSE]);

      const date = response.data.data.dueDate;

      const data = {
        number,
        value: response.data.data.value,
        assignor: response.data.data.assignor || "",
        dueDate: date ? date.toISOString() : ""
      };

      return data;
    } catch (error) {
      return internalServerError();
    }
  }

  // async getCoinAmountPay(token, coin, value) {
  //   try {
  //     API_HEADER.headers.Authorization = token;
  //     let response = await axios.get(
  //       "url",
  //       API_HEADER,
  //       coin,
  //       value
  //     );
  //     setAuthToken(response.headers[HEADER_RESPONSE]);

  //     //teste
  //     const response = {
  //       data: {
  //         amount: 50000
  //       }
  //     };

  //     return response.data;
  //   } catch(error) {
  //     return internalServerError();
  //   }
  // }
  //   }catch(error){
  //     internalServerError();
  //     return;
  //   }
  // }

  async getHistory(token) {
    try {
      API_HEADER.headers.Authorization = token;

      let response = await axios.get(`${BASE_URL}/bill/history`, API_HEADER);
      setAuthToken(response.headers[HEADER_RESPONSE]);

      return response.data.data;
    } catch (error) {
      return internalServerError();
    }
  }
}

export default PaymentService;
