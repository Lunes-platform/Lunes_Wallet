import { put, call } from "redux-saga/effects";
import {
  setAuthToken,
  getAuthToken,
  setUserSeedWords,
  getUserSeedWords,
  getUsername,
  setUserData,
  clearAll
} from "../../../utils/localStorage";
import { encryptHmacSha512Key } from "../../../utils/cryptography";
import { HEADER_RESPONSE } from "../../../constants/apiBaseUrl";
import {
  internalServerError,
  modalSuccess,
  modalError
} from "../../../containers/errors/statusCodeMessage";
import i18n from "../../../utils/i18n";

// Services
import AuthService from "../../../services/authService";
import UserService from "../../../services/userService";
const authService = new AuthService();
const userService = new UserService();
const changeLoadingState = "CHANGE_LOADING_STATE";

export function* authenticateUser(action) {
  try {
    let username = yield call(getUsername);

    let response = yield call(
      authService.authenticate,
      action.username,
      action.password
    );

    if (response.error) {
      yield put(response.error);
      yield put({
        type: changeLoadingState
      });
      return;
    }

    if (username !== action.username) {
      yield call(clearAll);
    }

    setUserData({
      username: action.username
    });

    let twoFactorResponse = yield call(
      authService.hasTwoFactorAuth,
      response.data.data.token
    );

    let twoFactor = twoFactorResponse.data.code === 200 ? true : false;
    let seed = yield call(getUserSeedWords);

    yield call(setAuthToken, twoFactorResponse.headers[HEADER_RESPONSE]);

    yield put({
      type: "POST_USER_AUTHENTICATE",
      user: {
        username: action.username,
        password: encryptHmacSha512Key(action.password),
        seed: twoFactor ? undefined : seed
      },
      twoFactor: twoFactor,
      pages: {
        login: twoFactor ? 1 : 2
      }
    });

    if (!twoFactor && seed) {
      yield put({
        type: "CHANGE_LOADING_GENERAL_STATE",
        state: true
      });
    }

    return;
  } catch (error) {
    yield put({
      type: changeLoadingState
    });
    yield put(internalServerError());
  }
}

export function* hasTwoFactorAuth() {
  try {
    let userToken = yield call(getAuthToken);
    let seed = yield call(getUserSeedWords);
    const response = yield call(authService.hasTwoFactorAuth, userToken);
    if (response.error) {
      yield put(response.error);
      yield put({
        type: changeLoadingState
      });
      return;
    }

    if (seed) {
      yield put({
        type: "SET_USER_SEED",
        seed: seed
      });
    }

    yield put({
      type: "GET_USER_2FA",
      response
    });
    yield put({
      type: changeLoadingState
    });
    return;
  } catch (error) {
    yield put({
      type: changeLoadingState
    });
    yield put(internalServerError());
  }
}

export function* createTwoFactorAuth() {
  try {
    const response = yield call(authService.createTwoFactorAuth);

    yield put({
      type: "POST_USER_CREATE_2FA",
      response
    });
    yield put({
      type: changeLoadingState
    });
    return;
  } catch (error) {
    yield put({
      type: changeLoadingState
    });
    yield put(internalServerError());
  }
}

export function* verifyTwoFactorAuth(action) {
  try {
    let seed = yield call(getUserSeedWords);
    let userToken = yield call(getAuthToken);
    const response = yield call(
      authService.verifyTwoFactoryAuth,
      action.token,
      userToken
    );

    if (response.error) {
      yield put(response.error);
      yield put({
        type: changeLoadingState
      });
      return;
    }

    if (seed) {
      yield put({
        type: "CHANGE_LOADING_GENERAL_STATE",
        state: true
      });
      yield put({
        type: "SET_USER_SEED",
        seed: seed
      });
    }

    yield put({
      type: "POST_USER_VERIFY_2FA",
      response,
      pages: {
        login: 2
      }
    });

    return;
  } catch (error) {
    yield put({
      type: changeLoadingState
    });
    yield put(internalServerError());
  }
}

export function* createUser(action) {
  try {
    let response = yield call(userService.createUser, action.user);

    if (response.error) {
      yield put(response.error);
      yield put({
        type: changeLoadingState
      });

      return;
    }

    yield put({
      type: "POST_USER_CREATE_USER",
      page: 3
    });

    yield put(modalSuccess("User Created"));

    return;
  } catch (error) {
    yield put({
      type: changeLoadingState
    });
    yield put(internalServerError());

    return;
  }
}

export function* resetUser(action) {
  try {
    yield put({
      type: changeLoadingState
    });

    let response = yield call(userService.resetPass, { email: action.login });

    if (response.data.code === 200) {
      yield put({
        type: "POST_USER_RESET_USER",
        page: 1
      });
    } else {
      yield put({
        type: changeLoadingState
      });
      yield put(internalServerError());
    }

    return;
  } catch (error) {
    yield put({
      type: changeLoadingState
    });
    yield put(internalServerError());
    return;
  }
}

export function* setUserSeed(action) {
  try {
    yield setUserSeedWords(action.seed, action.password);
    let seed = yield call(getUserSeedWords);

    yield put({
      type: "CHANGE_LOADING_GENERAL_STATE",
      state: true
    });

    return yield put({
      type: "SET_USER_SEED",
      seed: seed
    });
  } catch (error) {
    yield put({
      type: changeLoadingState
    });
    yield put(internalServerError());
  }
}

export function* updateUserConsentsSaga(payload) {
  try {
    const token = yield call(getAuthToken);
    let response = yield call(userService.updateUser, payload.consents, token);

    if (response.status == 403) {
      yield put({
        type: "CHANGE_SKELETON_ERROR_STATE",
        state: true
      });
      yield put(internalServerError());
      return;
    }

    yield put({
      type: "PATCH_SETTINGS_CONSENTS_API_REDUCER",
      consents: payload.consents
    });
  } catch (error) {
    yield put(internalServerError());
  }
}

export function* editUserData(action) {
  try {
    let token = yield call(getAuthToken);
    let response = yield call(userService.editUser, token, action.data);

    if (response.data.code === 200) {
      yield put({
        type: "EDIT_USER_DATA",
        data: action.data
      });
      yield put(modalSuccess("Successfully changed data"));

      return;
    }
  } catch (error) {
    yield put({
      type: "CHANGE_SKELETON_ERROR_STATE",
      state: true
    });

    yield put(internalServerError());
  }
}

export function* updateUserPasswordSaga(action) {
  try {
    const {
      oldPassword,
      confirmOldPassword,
      newPassword,
      confirmNewPassword
    } = action;

    /* eslint-disable */
    const rules = new RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/g
    );
    /* eslint-enable */

    if (
      !confirmOldPassword ||
      oldPassword !== encryptHmacSha512Key(confirmOldPassword)
    ) {
      yield put(modalError(i18n.t("MESSAGE_INVALID_PASSWORD")));
      return;
    }

    if (!newPassword || !newPassword.match(rules)) {
      yield put(modalError(i18n.t("SETTINGS_NEW_PASSWORD_ERROR")));
      return;
    }

    if (newPassword !== confirmNewPassword) {
      yield put(modalError(i18n.t("SETTINGS_CONFIRM_NEW_PASSWORD_ERROR")));
      return;
    }

    yield put({
      type: changeLoadingState
    });

    const token = yield call(getAuthToken);
    yield call(
      userService.resetUserPassword,
      token,
      newPassword,
      confirmOldPassword
    );

    yield call(setUserData, { secretWord: "" });

    yield put({
      type: "UPDATE_USER_PASSWORD_REDUCER"
    });

    setTimeout(() => {
      window.location.reload();
    }, 1500);
    yield put(modalSuccess(i18n.t("SETTINGS_CHANGE_PASSWORD_SUCCESS")));
  } catch (error) {
    yield put({
      type: changeLoadingState
    });
    yield put(internalServerError());
  }
}
