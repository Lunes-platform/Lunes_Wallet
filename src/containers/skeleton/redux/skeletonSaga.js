import { put, call } from "redux-saga/effects";
import { internalServerError } from "../../../containers/errors/statusCodeMessage";

// UTILS
import {
  setAuthToken,
  getAuthToken,
  getUserSeedWords
} from "../../../utils/localStorage";
import { decryptAes } from "../../../utils/cryptography";

// Services
import CoinService from "../../../services/coinService";
import UserService from "../../../services/userService";
const coinService = new CoinService();
const userService = new UserService();

export function* loadGeneralInfo(action) {
  try {
    let token = yield call(getAuthToken);
    let seed = yield call(getUserSeedWords);

    let responseCoins = yield call(
      coinService.getGeneralInfo,
      token,
      decryptAes(seed, action.password)
    );

    let responseUser = yield call(userService.getUser, token);
    let pictureUser = yield call(
      userService.getUserPicture,
      responseUser.data.data.email
    );

    setAuthToken(responseCoins.token);
    delete responseCoins.token;

    yield put({
      type: "SET_USER_INFO",
      user: {
        birthday: responseUser.data.data.birthday,
        city: responseUser.data.data.city,
        country: responseUser.data.data.country,
        gdpr: responseUser.data.data.gdpr,
        phone: responseUser.data.data.phone,
        state: responseUser.data.data.state,
        street: responseUser.data.data.street,
        profilePicture: pictureUser,
        name: responseUser.data.data.name,
        surname: responseUser.data.data.surname,
        username: responseUser.data.data.username,
        zipcode: responseUser.data.data.zipcode,
        email: responseUser.data.data.email
      }
    });

    yield put({
      type: "GET_GENERAL_INFO",
      coins: responseCoins
    });

    yield put({
      type: "CHANGE_LOADING_GENERAL_STATE"
    });

    return;
  } catch (error) {
    yield put({ type: "CHANGE_SKELETON_ERROR_STATE", state: true });
    yield put(internalServerError());
  }
}

export function* loadWalletInfo(action) {
  try {
    let token = yield call(getAuthToken);
    let seed = yield call(getUserSeedWords);
    let responseCoins = yield call(
      coinService.getGeneralInfo,
      token,
      decryptAes(seed, action.password)
    );

    setAuthToken(responseCoins.token);
    delete responseCoins.token;

    yield put({
      type: "GET_GENERAL_INFO",
      coins: responseCoins
    });

    yield put({
      type: "CHANGE_LOADING_GENERAL_STATE"
    });

    yield put({
      type: "SET_WALLET_LOADING"
    });

    return;
  } catch (error) {
    yield put({ type: "CHANGE_SKELETON_ERROR_STATE", state: true });
    yield put(internalServerError());
  }
}

export function* availableCoins() {
  try {
    let token = yield call(getAuthToken);
    let response = yield call(coinService.getAvaliableCoins, token);

    yield put({
      type: "GET_AVAILABLE_COINS",
      coins: response.data.data.coins
    });

    return;
  } catch (error) {
    yield put({ type: "CHANGE_SKELETON_ERROR_STATE", state: true });
    yield put(internalServerError());
  }
}

export function* balanceCoins() {
  try {
    let response = yield call();
    yield put({
      type: "GET_BALANCE_COINS",
      coins: response
    });

    return;
  } catch (error) {
    yield put({ type: "CHANGE_SKELETON_ERROR_STATE", state: true });
    yield put(internalServerError());
  }
}

export function* createCoinsAddress() {
  try {
    let response = yield call();
    yield put({
      type: "POST_CREATE_COINS_ADDRESS",
      coins: response.data.data.coins
    });

    return;
  } catch (error) {
    yield put({ type: "CHANGE_SKELETON_ERROR_STATE", state: true });
    yield put(internalServerError());
  }
}
