import {
  put,
  call
} from "redux-saga/effects";
import {
  getAuthToken,
  getUserSeedWords
} from "../../../utils/localStorage";
import {
  internalServerError,
  modalSuccess,
  modalError
} from "../../../containers/errors/statusCodeMessage";
import AuthService from "../../../services/authService";
import TransactionService from "../../../services/transaction/transactionService";
import {
  decryptAes
} from "../../../utils/cryptography";
import CoinService from "../../../services/coinService";
import i18next from "../../../utils/i18n";
const authService = new AuthService();
const transactionService = new TransactionService();
const coinService = new CoinService();

export function* getTwoFactorAuth() {
  try {
    let token = yield call(getAuthToken);
    let response = yield call(authService.createTwoFactorAuth, token);

    yield put({
      type: "POST_SETTINGS_CREATE_2FA",
      url: response.qrcode
    });
    yield put({
      type: "CHANGE_LOADING_SETTINGS"
    });
    return;
  } catch (error) {
    yield put({
      type: "CHANGE_LOADING_SETTINGS"
    });
    yield put(internalServerError());
  }
}

export function* verifyTwoFactorAuthSettings(action) {
  try {
    let token = yield call(getAuthToken);
    let response = yield call(
      authService.verifyTwoFactoryAuth,
      action.token,
      token
    );

    if (response.error || response.messageError) {
      yield put(response.error);
      yield put({
        type: "CHANGE_LOADING_SETTINGS"
      });
      return;
    }

    yield put(modalSuccess("Successfully Activated"));

    yield put({
      type: "GET_USER_2FA",
      state: true
    });

    yield put({
      type: "CHANGE_LOADING_SETTINGS"
    });

    return;
  } catch (error) {
    yield put({
      type: "CHANGE_SKELETON_ERROR_STATE",
      state: true
    });

    yield put(internalServerError());
  }
}

export function* createAlias(action) {

  let handleLoading = {
    type: "CHANGE_LOADING_STATE"
  };

  try {
    let addressAlias = action.data.alias;
    let regex = new RegExp("^[-.0-9@_a-z]+$");
    
    console.warn(!regex.test(addressAlias));

    if (!regex.test(addressAlias)) {
      yield put(modalError(i18next.t("ALIAS_INFORMED_INCORRECT")));
      yield put(handleLoading);

      return;
    }

    let userSeed = yield call(getUserSeedWords);
    let seedDecrypt = yield call(decryptAes, userSeed, action.data.password);
    let token = yield call(getAuthToken);
    let hasBalance = yield call(coinService.getCoinBalance, action.data.coin, action.data.address, token);


    if (hasBalance.data.data.available === 0) {
      yield put(modalError(i18next.t("ALIAS_BALANCE_INSUFICIENT")));
      yield put(handleLoading);
      return;
    }

    let response = yield call(transactionService.createAlias,
      addressAlias,
      action.data.fee,
      seedDecrypt
    );

    if (response.data) {
      yield put(modalError(i18next.t("ALIAS_ALREADY_CLAIMED")));
      yield put(handleLoading);

      return;
    }

    yield put({
      type: "SET_SKELETON_ALIAS_ADDRESS",
      alias: addressAlias
    });

    yield put(handleLoading);
    yield put(modalSuccess(i18next.t("ALIAS_CREATED_SUCCESS")));
  } catch (error) {
    console.warn("error", error);

    yield put(handleLoading);
    yield put(internalServerError());
  }
}

export function* getAliases(action) {
  try {
    let response = yield call(transactionService.getAliases, action.data.address);

    if (response.length > 0) {
      let firstAlias = response[0].split(":")[2];

      yield put({
        type: "SET_SKELETON_ALIAS_ADDRESS",
        alias: firstAlias
      })
    }
  } catch (error) {
    console.warn("error", error);
    yield put(internalServerError());
  }
}