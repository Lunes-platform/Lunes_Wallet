import axios from "axios";
import {
  BASE_URL,
  API_HEADER,
  HEADER_REQUEST,
  HEADER_RESPONSE
} from "../constants/apiBaseUrl";
import {
  badRequest,
  internalServerError
} from "../containers/errors/statusCodeMessage";
import {
  setAuthToken
} from "../utils/localStorage";

//UTILS
import {
  encryptMd5
} from "../utils/cryptography";

import i18n from "../utils/i18n";

import { getProfileImg } from "../utils/user"

class UserService {
  async createUser(userInfo) {
    try {
      let response = await axios.post(
        BASE_URL + "/user", {
          name: userInfo.name,
          surname: userInfo.surname,
          email: userInfo.email,
          password: encryptMd5(userInfo.password),
          link: userInfo.link
        },
        API_HEADER
      );

      return response;
    } catch (error) {
      if (error.response.data.code === 500) {
        return badRequest(i18n.t("NOTIFICATION_SERVICE_ALREADY_REGISTRED"));
      }

      internalServerError();
      return;
    }
  }

  async getUser(token) {
    try {
      API_HEADER.headers.Authorization = token;
      let response = await axios.get(BASE_URL + "/user", API_HEADER);
      setAuthToken(response.headers[HEADER_RESPONSE]);

      return response;
    } catch (error) {
      internalServerError();
      return;
    }
  }

  async updateUser(userInfo, token) {
    try {
      API_HEADER.headers.Authorization = token;

      const response = await axios
        .patch(BASE_URL + "/user", userInfo, API_HEADER)
        .catch(error => {
          return error.response;
        });

      setAuthToken(response.headers[HEADER_RESPONSE]);

      return response;
    } catch (error) {
      return internalServerError();
    }
  }

  async getUserPicture(email) {
    const defaultImg = "images/lunio/lunio-user@300x300.jpg";
    try {
      // let emailEncrypt = encryptMd5(email);
      // let response = await axios.get(
      //   "https://en.gravatar.com/" + emailEncrypt + ".json",
      //   HEADER_REQUEST
      // );
      // return response.data.entry[0].thumbnailUrl;
      return getProfileImg(200, email)
    } catch (error) {
      return defaultImg;
    }
  }

  async editUser(token, data) {
    let userData = {
      name: data.name,
      surname: data.surname,
      birthday: new Date(data.birthday),
      phone: data.phone,
      street: data.street,
      city: data.city,
      state: data.state,
      zipcode: data.zipcode
    };
    API_HEADER.headers.Authorization = token;
    let response = await axios.patch(BASE_URL + "/user", userData, API_HEADER);
    setAuthToken(response.headers[HEADER_RESPONSE]);

    return response;
  }

  async resetUserPassword(token, newPassword, oldPassword) {
    try {
      const user = {
        newPassword: encryptMd5(newPassword),
        oldPassword: encryptMd5(oldPassword)
      };

      API_HEADER.headers.Authorization = token;
      const response = await axios.patch(BASE_URL + "/user", user, API_HEADER);

      return response;
    } catch (error) {
      return internalServerError();
    }
  }

  async resetPass(data) {
    try {
      const response = await axios
        .post(
          BASE_URL + "/user/forgotPassword",
          data,
          API_HEADER
        )
        .catch(error => {
          return error.response;
        });

      return response;
    } catch (error) {
      return internalServerError();
    }
  }

  async verifyEmail(hash){
    try {
      let response = await axios.get(
        `${BASE_URL}/user/email-verify/${hash}`,
        API_HEADER
      );

      return response.data;
    }catch(error){
      return internalServerError();
    }
  }
}

export default UserService;
