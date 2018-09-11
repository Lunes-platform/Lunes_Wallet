import { put, call } from "redux-saga/effects";
import { internalServerError } from "../../errors/statusCodeMessage";
import LeasingService from "../../../services/leasingService";
import CoinService from "../../../services/coinService";
import TransactionService from "../../../services/transaction/transactionService";
import { convertBiggestCoinUnit } from "../../../utils/numbers";
import {
  setAuthToken,
  getAuthToken,
  getUserSeedWords
} from "../../../utils/localStorage";
import { HEADER_RESPONSE, TESTNET } from "../../../constants/apiBaseUrl";
import { decryptAes } from "../../../utils/cryptography";
import { networks } from "../../../constants/network";
import { successRequest, errorInput } from "../../errors/redux/errorAction";
import i18next from "../../../utils/i18n";
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

    let leaseData = {
      amount: action.data.amount,
      fee: action.data.feeValue.low,
      recipient: action.data.toAddress,
      seed: seedDecrypt,
      network: TESTNET ? networks.LUNESTESTNET : networks.LUNES
    };

    let response = yield call(transactionService.createLeasing, leaseData);

    let transaction = yield call(
      leasingService.saveLeaseTransaction,
      response,
      action.data.coinName,
      token
    );

    if (transaction.data.code === 200) {
      yield put(successRequest(i18next.t("MODAL_LEASING_MESSAGE_SUCCESS")));

      return;
    }

    yield put(errorInput(i18next.t("MODAL_LEASING_MESSAGE_FAILURE")));

    return;
  } catch (error) {
    console.warn(error);
    yield put(internalServerError());
  }
}

export function* cancelLeasing(action) {
  try {
    let userSeed = yield call(getUserSeedWords);
    let seed = yield call(decryptAes, userSeed, action.data.password);
    let token = yield call(getAuthToken);

    let leaseData = {
      fee: action.data.coinFee,
      transactionId: action.data.txid,
      seed,
      network: TESTNET ? networks.LUNESTESTNET : networks.LUNES
    };

    let response = yield call(transactionService.cancelLeasing, leaseData);
    let transaction = yield call(
      leasingService.saveLeaseTransaction,
      response,
      action.data.coinName,
      token
    );

    if (transaction.data.code === 200) {
      yield put(successRequest(i18next.t("MODAL_LEASING_CANCEL_SUCCESS")));

      return;
    }

    return;
  } catch (error) {
    console.warn(error);
    if (error.data.error) {
      yield put(errorInput(i18next.t("MODAL_LEASING_CANCEL_FAILURE")));
      return;
    }
    yield put(internalServerError());
  }
}

export function* getLeasingInfo(action) {
  try {
    let token = yield call(getAuthToken);
    let professionalNodes = yield call(leasingService.getProfessionalNodes);

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

    setAuthToken(lease.history.headers[HEADER_RESPONSE]);
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

    return;
  } catch (error) {
    yield put(internalServerError());
  }
}
