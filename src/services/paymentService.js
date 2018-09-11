import axios from "axios";
import { API_HEADER } from "../constants/apiBaseUrl";
import { internalServerError } from "../containers/errors/statusCodeMessage";

class PaymentService {
  async getCoins(token) {
    try {
      API_HEADER.headers.Authorization = token;

      let response = await axios.get(
        "https://a.lunes.io/wallet/staging/service/pagamento",
        API_HEADER
      );
      return response.data;
    } catch (error) {
      internalServerError();
      return;
    }
  }

  async getInvoice(token, number) {
    try {
      // API_HEADER.headers.Authorization = token;

      // let response = await axios.get(
      //   `https://a.lunes.io/wallet/staging/bill/${number}`
      //   //API_HEADER
      // );

      // const data = {
      //   number: response.data.LinhaDigitavel,
      //   value: response.data.Valor,
      //   assignor: response.data.Cedente,
      //   description: response.data.TipoServico,
      //   dueDate: response.data.DataVencimento
      // }

      //teste
      const data = {
        number: number,
        value: 45.9,
        assignor: "Banco Inter",
        description: "Titulo de Cobranca",
        dueDate: "24/09/2018"
      };

      return data;
    } catch (error) {
      internalServerError();
      return;
    }
  }

  async getCoinAmountPay(token) {
    try {
      API_HEADER.headers.Authorization = token;

      // let response = await axios.get(
      //   "url",
      //   API_HEADER,
      //   coin,
      //   value
      // );

      //teste
      const response = {
        data: {
          amount: 50000
        }
      };

      return response.data;
    } catch (error) {
      internalServerError();
      return;
    }
  }
}

export default PaymentService;
