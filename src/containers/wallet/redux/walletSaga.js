import { put, call } from "redux-saga/effects";
import {
  internalServerError,
  modalError
} from "../../../containers/errors/statusCodeMessage";

import i18n from "../../../utils/i18n";
import { getAuthToken, getUserSeedWords } from "../../../utils/localStorage";
import { decryptAes } from "../../../utils/cryptography";
import CoinService from "../../../services/coinService";
import TransactionService from "../../../services/transaction/transactionService";

const coinService = new CoinService();
const transactionService = new TransactionService();

export function* validateAddress(action) {
  try {
    let address = action.address.replace(action.coin + ":", "").split("?")[0];
    let response = yield call(
      coinService.validateAddress,
      action.coin,
      address
    );

    if (!response.error || response !== "error") {
      yield put({
        type: "SET_WALLET_MODAL_ADDRESS",
        address: address
      });

      yield put({
        type: "SET_WALLET_MODAL_STEP",
        step: 1
      });

      return;
    }

    yield put(modalError(i18n.t("MESSAGE_INVALID_ADDRESS")));

    yield put({
      type: "SET_WALLET_MODAL_LOADING"
    });

    return;
  } catch (error) {
    yield put({
      type: "CHANGE_WALLET_ERROR_STATE",
      state: true
    });
    yield put(internalServerError());
  }
}

export function* getWalletSendModalFee(action) {
  try {
    let response = yield call(
      coinService.getFee,
      action.coin,
      action.fromAddress,
      action.toAddress,
      action.amount,
      action.decimalPoint
    );

    if (response) {
      yield put({
        type: "GET_WALLET_MODAL_SEND_FEE",
        fee: response
      });

      yield put({
        type: "SET_WALLET_MODAL_STEP",
        step: 2
      });

      return;
    }
    yield put(internalServerError());

    return;
  } catch (error) {
    yield put(internalServerError());
  }
}

export function* shareCoinAddress(action) {
  try {
    yield call(coinService.shareCoinAddress, action.name, action.address);
  } catch (error) {
    yield put(internalServerError());
  }
}

export function* getWalletCoinHistory(action) {
  try {
    let token = yield call(getAuthToken);
    let response = yield call(
      coinService.getCoinHistory,
      action.coin,
      action.address,
      token
    );

    if (!response.error) {
      yield put({
        type: "SET_WALLET_HISTORY",
        history: response
      });

      yield put({
        type: "SET_WALLET_HISTORY_LOADING"
      });

      return;
    }

    yield put({
      type: "SET_WALLET_HISTORY_LOADING",
      state: true
    });

    return;
  } catch (error) {
    yield put({
      type: "CHANGE_WALLET_ERROR_STATE",
      state: true
    });
    yield put(internalServerError());
  }
}

export function* getCoinFee(action) {
  try {
    let response = yield call(coinService.getFee, action.coinType);
    yield put({
      type: "GET_COIN_FEE",
      fee: response
    });
  } catch (error) {
    yield put({
      type: "CHANGE_WALLET_ERROR_STATE",
      state: true
    });
    yield put(internalServerError());
  }
}

export function* setWalletTransaction(action) {
  try {
    let seed = yield call(getUserSeedWords);
    let token = yield call(getAuthToken);

    let lunesWallet = yield call(
      transactionService.transactionService,
      action.transaction.coin,
      token
    );

    if (lunesWallet) {
      let response = yield call(
        transactionService.transaction,
        lunesWallet.id,
        action.transaction,
        lunesWallet,
        decryptAes(seed, action.password),
        token
      );

      if (response) {
        yield put({
          type: "SET_WALLET_MODAL_STEP",
          step: 5
        });

        yield put({
          type: "SET_WALLET_TRANSACTION",
          response: response
        });

        return;
      }
    }

    yield put({
      type: "SET_WALLET_MODAL_STEP",
      step: 6
    });

    yield put({
      type: "CHANGE_WALLET_ERROR_STATE",
      state: true
    });
    yield put(internalServerError());

    return;
  } catch (error) {
    yield put({
      type: "CHANGE_WALLET_ERROR_STATE",
      state: true
    });
    yield put(internalServerError());
  }
}

export function* setUtxos(action) {
  try {
    const { address, coin } = action;
    if (coin.search(/lunes/i) !== -1) {
      yield put({
        type: "SET_WALLET_UTXOS",
        status: "success",
        data: [],
        message: ""
      });
      return;
    }
    yield put({
      type: "SET_WALLET_UTXOS",
      status: "loading",
      data: [],
      message: ""
    });
    const token = yield call(getAuthToken);
    const utxos = yield call(transactionService.utxo, address, coin, token);
    let userMessage = "";
    if (!utxos) {
      userMessage = i18n.t("WALLET_UTXOS_EMPTY_1");
      yield put({
        type: "SET_WALLET_UTXOS",
        message: userMessage,
        data: utxos,
        status: "error"
      });
      return;
    }
    if (utxos && utxos.constructor.name === "Array" && utxos.length < 1) {
      userMessage = i18n.t("WALLET_UTXOS_EMPTY_2");
      yield put({
        type: "SET_WALLET_UTXOS",
        message: userMessage,
        data: utxos,
        status: "error"
      });
      return;
    }
    //success
    if (utxos && utxos.constructor.name === "Array" && utxos.length > 0) {
      yield put({
        type: "SET_WALLET_UTXOS",
        data: utxos,
        status: "success",
        message: userMessage
      });
      return;
    }
    userMessage = i18n.t("WALLET_UTXOS_UNKNOWN_ERROR");
    yield put({
      type: "SET_WALLET_UTXOS",
      message: userMessage,
      data: utxos,
      status: "error"
    });
  } catch (error) {
    yield put({
      type: "REQUEST_FAILED",
      message: error.message || "Unknown error when getting UTXOS"
    });
  }
}
