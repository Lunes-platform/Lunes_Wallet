import axios from "axios";
import { BASE_URL, API_HEADER, HEADER_RESPONSE } from "../constants/apiBaseUrl";
import {
  unauthorized,
  internalServerError
} from "../containers/errors/statusCodeMessage";
import { setAuthToken } from "../utils/localStorage";
import { encryptMd5 } from "../utils/cryptography";

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
        let notification = "Inavalid Username/Email or Password";

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
        let notification = "Could not verify 2fa";

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

      return unauthorized("Could not enable two-factor authentication");
    } catch (error) {
      if (error.response.data.code === 500) {
        return unauthorized("Could not enable two-factor authentication");
      }

      return internalServerError();
    }
  }

  async verifyTwoFactoryAuth(token2fa, token) {
    try {
      API_HEADER.headers.Authorization = token;
      let response = await axios.post(
        BASE_URL + "/user/2fa/verify",
        { token: token2fa },
        API_HEADER
      );
      setAuthToken(response.headers[HEADER_RESPONSE]);

      return response;
    } catch (error) {
      console.warn(error.response);
      if (error.response.data.code === 401 || error.response.status === 400) {
        return unauthorized("Invalid 2FA token");
      }

      return internalServerError();
    }
  }
}

export default AuthService;
