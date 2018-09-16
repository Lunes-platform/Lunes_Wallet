import { put, call } from "redux-saga/effects";

import {
  internalServerError,
  modalError
} from "../../errors/statusCodeMessage";
import { getAuthToken } from "../../../utils/localStorage";
import i18n from "../../../utils/i18n";

import CoinService from "../../../services/coinService";
const coinService = new CoinService();

export function* getVoucher(action) {
  try {
    let token = yield call(getAuthToken);

    let responseCoin = yield call(
      coinService.getVoucherCoin,
      action.phone,
      action.code,
      token
    );

    if (!responseCoin) {
      yield put({
        type: "SET_VOUCHER_LOADING"
      });
      yield put(modalError(i18n.t("MESSAGE_INVALID_VOUCHER")));

      return;
    }

    yield call(
      coinService.voucherRescue,
      action.phone,
      action.coins[responseCoin].address,
      action.code,
      token
    );

    yield put({
      type: "SET_VOUCHER_LOADING"
    });

    yield put({
      type: "SET_VOUCHER_LOADING"
    });

    return;
  } catch (error) {
    yield put(internalServerError());
  }
}
