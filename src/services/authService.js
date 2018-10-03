import axios from "axios";

// CONSTANTS
import { BASE_URL, API_HEADER, HEADER_RESPONSE } from "../constants/apiBaseUrl";

// ERROR
import {
  unauthorized,
  internalServerError
} from "../containers/errors/statusCodeMessage";

// UTILS 
import { setAuthToken } from "../utils/localStorage";
import { encryptMd5 } from "../utils/cryptography";
import i18n from "../utils/i18n";

class AuthService {
  async authenticate(email, password) {
    try {
      let response = await axios.post(
        BASE_URL + "/login",
        {
          login: email,
          password: encryptMd5(password)
        },
        API_HEADER
      );

      return response;
    } catch (error) {
      if (error.response.data.code === 401) {
        let notification = i18n.t("NOTIFICATION_SERVICE_INVALID_LOGIN");

        return unauthorized(notification);
      }

      return internalServerError();
    }
  }

  async hasTwoFactorAuth(token) {
    try {
      API_HEADER.headers.Authorization = token;
      let response = await axios.get(BASE_URL + "/user/2fa", API_HEADER);
      setAuthToken(response.headers[HEADER_RESPONSE]);
      return response;
    } catch (error) {
      if (error.response.data.code === 401) {
        let notification = i18n.t("NOTIFICATION_SERVICE_NOT_2FA");

        return unauthorized(notification);
      }

      return internalServerError();
    }
  }

  async createTwoFactorAuth(token) {
    try {
      API_HEADER.headers.Authorization = token;
      let response = await axios.post(BASE_URL + "/user/2fa", {}, API_HEADER);
      setAuthToken(response.headers[HEADER_RESPONSE]);

      let data = response.data.data;
      if (data.qrcode) {
        return data;
      }

      return unauthorized(i18n.t("NOTIFICATION_SERVICE_ENABLE_2FA"));
    } catch (error) {
      if (error.response.data.code === 500) {
        return unauthorized(i18n.t("NOTIFICATION_SERVICE_ENABLE_2FA"));
      }

      return internalServerError();
    }
  }

  async verifyTwoFactoryAuth(token2fa, token) {
    try {
      API_HEADER.headers.Authorization = token;
      let response = await axios.post(
        BASE_URL + "/user/2fa/verify",
        {
          token: token2fa
        },
        API_HEADER
      );
      setAuthToken(response.headers[HEADER_RESPONSE]);

      return response;
    } catch (error) {
      if (error.response.data.code === 401 || error.response.status === 400) {
        return unauthorized(i18n.t("NOTIFICATION_SERVICE_INVALID_2FA"));
      }
      internalServerError();
      return;
    }
  }
}

export default AuthService;
