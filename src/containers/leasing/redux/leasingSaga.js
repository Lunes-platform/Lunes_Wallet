import {
  put,
  call
} from "redux-saga/effects";
import {
  internalServerError,
  modalError
} from "../../errors/statusCodeMessage";
import {
  successRequest,
  errorInput
} from "../../errors/redux/errorAction";
import {
  convertBiggestCoinUnit
} from "../../../utils/numbers";
import i18n from "../../../utils/i18n";
import {
  decryptAes
} from "../../../utils/cryptography";
import {
  getAuthToken,
  getUserSeedWords
} from "../../../utils/localStorage";
import TransactionService from "../../../services/transaction/transactionService";
import LeasingService from "../../../services/leasingService";
import CoinService from "../../../services/coinService";
const leasingService = new LeasingService();
const coinService = new CoinService();
const transactionService = new TransactionService();

export function* getProfessionalNode() {
  try {
    let response = yield call(leasingService.getProfessionalNodes);
    yield put({
      type: "GET_PROFESSIONAL_NODE",
      professionalNode: response
    });

    return;
  } catch (error) {
    yield put(internalServerError());
  }
}

export function* validateLeasingAddress(action) {
  try {
    let response = yield call(
      coinService.validateAddress,
      action.coin,
      action.address
    );

    if (!response.error) {
      yield put({
        type: "VALIDATE_LEASING_ADDRESS",
        addressIsValid: response
      });
      return;
    }

    yield put(response.error);

    return;
  } catch (error) {
    yield put(internalServerError());
  }
}

export function* createLeasing(action) {
  try {
    let token = yield call(getAuthToken);
    let userSeed = yield call(getUserSeedWords);
    let seedDecrypt = yield call(decryptAes, userSeed, action.data.password);

    let responseAddress = yield call(
      coinService.validateAddress,
      action.data.coinName,
      action.data.toAddress
    );

    if (!responseAddress || responseAddress === "error") {
      yield put({
        type: "SET_LEASING_MODAL_LOADING"
      });
      return yield put(modalError(i18n.t("MESSAGE_INVALID_ADDRESS")));
    }

    let response = yield call(
      transactionService.createLeasing,
      action.data.amount,
      action.data.feeValue.low,
      action.data.toAddress,
      seedDecrypt,
      token
    );

    if (response.signature) {
      yield put({
        type: "SET_LEASING_RELOAD",
        state: true
      });

      yield put({
        type: "SET_LEASING_MODAL_LOADING"
      });

      yield put(successRequest(i18n.t("MODAL_LEASING_MESSAGE_SUCCESS")));

      return;
    }

    yield put({
      type: "SET_LEASING_LOADING"
    });

    yield put(errorInput(i18n.t("MODAL_LEASING_MESSAGE_FAILURE")));

    return;
  } catch (error) {
    yield put(internalServerError());
  }
}

export function* cancelLeasing(action) {
  try {
    let userSeed = yield call(getUserSeedWords);
    let seed = yield call(decryptAes, userSeed, action.data.password);
    let token = yield call(getAuthToken);

    let response = yield call(
      transactionService.cancelLeasing,
      action.data.txId,
      action.data.coinFee,
      seed,
      token
    );

    if (response.signature) {
      yield put(successRequest(i18n.t("MODAL_LEASING_CANCEL_SUCCESS")));

      return;
    }

    return;
  } catch (error) {
    if (error.data.error) {
      yield put(errorInput(i18n.t("MODAL_LEASING_CANCEL_FAILURE")));
      return;
    }
    yield put(internalServerError());
  }
}

export function* getLeasingInfo(action) {
  try {
    let token = yield call(getAuthToken);
    let professionalNodes = yield call(leasingService.getProfessionalNodes);
    let seed = yield call(getUserSeedWords);
    let responseCoins = yield call(
      coinService.getGeneralInfo,
      token,
      decryptAes(seed, action.password)
    );

    yield put({
      type: "SET_LEASING_RELOAD"
    });

    let lease = yield call(
      leasingService.getLeasingHistory,
      action.coin,
      action.address,
      token
    );

    if (lease === undefined) {
      yield put({
        type: "GET_INFO_LEASING",
        leasingHistory: [],
        leasingBalance: 0,
        professionalNodes
      });
      return;
    }

    lease.history.data.data.txs.map(history => {
      if (history.amount) {
        history.amount = convertBiggestCoinUnit(
          history.amount,
          action.decimalPoint
        );
      }

      if (professionalNodes) {
        professionalNodes.map(node => {
          if (history.to === node.address) {
            history.to = node.domain;
          }
        });
      }
    });

    yield put({
      type: "GET_INFO_LEASING",
      leasingHistory: lease.history.data,
      leasingBalance: convertBiggestCoinUnit(
        lease.balance.data.data.balance,
        action.decimalPoint
      ),
      professionalNodes
    });

    yield put({
      type: "GET_GENERAL_INFO",
      coins: responseCoins
    });

    return;
  } catch (error) {
    yield put(internalServerError());
  }
}