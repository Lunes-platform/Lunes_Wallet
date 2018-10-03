import { put, call } from "redux-saga/effects";
import {
  internalServerError,
  modalError
} from "../../errors/statusCodeMessage";

// UTILS
import i18n from "../../../utils/i18n";
import { getAuthToken } from "../../../utils/localStorage";


//SERVICES
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


export function* verifyCoupon(action) {
  try {
    yield put({type: "VERIFY_COUPON", data: { loading: true }})

    let token = yield call(getAuthToken);
    let { type, data } = yield call(coinService.verifyCoupon, action.coupon, token);

    if (!type) {
      yield put({type: "VERIFY_COUPON", data: { loading: false, verified: false }})
      yield put({type: "REQUEST_FAILED", message: data.message})
      return;
    }
    if (type === 'success') {
      yield put({type: "VERIFY_COUPON", data: { loading: false, verified: true }})
      yield put({type: "REQUEST_SUCCESS", message: data.message})
    } else {
      yield put({type: "VERIFY_COUPON", data: { loading: false, verified: false }})
      yield put({type: "REQUEST_FAILED", message: data.message
      || i18n.t("COUPON_UNKNOWN_ERROR_3")})
    }
  } catch(error) {
    internalServerError();
  }
}
