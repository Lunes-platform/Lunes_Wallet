import {
  takeLatest,
  takeEvery
} from "redux-saga";
import {
  fork
} from "redux-saga/effects";
import {
  authenticateUser,
  createTwoFactorAuth,
  verifyTwoFactorAuth,
  createUser,
  resetUser,
  hasTwoFactorAuth,
  setUserSeed,
  updateUserConsentsSaga,
  editUserData,
  updateUserPasswordSaga
} from "../user/redux/userSaga";

import {
  loadGeneralInfo,
  loadWalletInfo,
  availableCoins,
  balanceCoins,
  createCoinsAddress
} from "../skeleton/redux/skeletonSaga";
import {
  validateAddress,
  getWalletCoinHistory,
  shareCoinAddress,
  getWalletSendModalFee,
  getCoinFee,
  setWalletTransaction,
  setUtxos
} from "../wallet/redux/walletSaga";
import { getVoucher, verifyCoupon } from "../coupons/redux/couponsSaga";
import {
  getTwoFactorAuth,
  verifyTwoFactorAuthSettings,
  getAliases,
  createAlias
} from "../settings/redux/settingsSaga";
import {
  getProfessionalNode,
  validateLeasingAddress,
  createLeasing,
  getLeasingInfo,
  cancelLeasing
} from "../leasing/redux/leasingSaga";

import {
  getCoinsEnabledSaga,
  setPaymentSaga,
  getFeePaymentSaga,
  setFeePaymentSaga,
  getInvoiceSaga,
  getHistoryPaySaga,
  confirmPaySaga,
  setModalStepSaga
} from "../payment/redux/paymentSaga";
import {
  getAssetGeneralInfo,
  getAssetHistory,
  reloadAsset
} from "../assets/redux/assetsSaga";
import {
  setModalStepSaga as setModalStepRechargeSaga,
  getOperatorsSaga,
  getValuesCreditSaga,
  setRechargeSaga,
  getFeeRechargeSaga,
  setFeeRechargeSaga,
  confirmRechargeSaga,
  getHistoryRechargeSaga,
  getRechargeCoinsEnabledSaga
} from "../recharge/redux/rechargeSaga";

export default function* rootSaga() {
  yield [
    // User-Saga
    fork(takeLatest, "POST_USER_AUTHENTICATE_API", authenticateUser),
    fork(takeLatest, "POST_USER_CREATE_2FA_API", createTwoFactorAuth),
    fork(takeLatest, "POST_USER_VERIFY_2FA_API", verifyTwoFactorAuth),
    fork(takeLatest, "POST_USER_CREATE_USER_API", createUser),
    fork(takeLatest, "POST_USER_RESET_USER_API", resetUser),
    fork(takeLatest, "GET_USER_2FA_API", hasTwoFactorAuth),
    fork(takeLatest, "SET_USER_SEED_API", setUserSeed),
    fork(takeLatest, "UPDATE_USER_CONSENTS_API", updateUserConsentsSaga),
    fork(takeLatest, "EDIT_USER_DATA_API", editUserData),
    fork(takeLatest, "UPDATE_USER_PASSWORD_API", updateUserPasswordSaga),

    // Skeleton-Saga
    fork(takeLatest, "GET_GENERAL_INFO_API", loadGeneralInfo),
    fork(takeLatest, "GET_AVAILABLE_COINS_API", availableCoins),
    fork(takeLatest, "GET_BALANCE_COINS_API", balanceCoins),
    fork(takeLatest, "GET_WALLET_INFO_API", loadWalletInfo),
    fork(takeLatest, "POST_CREATE_COINS_ADDRESS_API", createCoinsAddress),

    // Wallet-Saga
    fork(takeLatest, "GET_WALLET_VALIDATE_ADDRESS_API", validateAddress),
    fork(takeLatest, "GET_WALLET_COIN_HISTORY_API", getWalletCoinHistory),
    fork(takeLatest, "GET_WALLET_MODAL_SEND_FEE_API", getWalletSendModalFee),
    fork(takeLatest, "SHARE_COIN_ADRESS_API", shareCoinAddress),
    fork(takeLatest, "SET_WALLET_TRANSACTION_API", setWalletTransaction),
    fork(takeEvery, "SET_WALLET_UTXOS_API", setUtxos),

    // Leasing
    fork(takeLatest, "GET_PROFESSIONAL_NODE_API", getProfessionalNode),
    fork(takeLatest, "GET_COIN_FEE_API", getCoinFee),

    // Coupons
    fork(takeLatest, "GET_VOUCHER_API", getVoucher),
    fork(takeLatest, "VERIFY_COUPON_API", verifyCoupon),

    // Settings
    fork(takeLatest, "POST_SETTINGS_CREATE_2FA_API", getTwoFactorAuth),
    fork(takeLatest, "GET_SETTINGS_2FA_API", verifyTwoFactorAuthSettings),
    fork(takeLatest, "VALIDATE_LEASING_ADDRESS_API", validateLeasingAddress),
    fork(takeLatest, "START_LEASING_API", createLeasing),
    fork(takeLatest, "CANCEL_LEASING_API", cancelLeasing),
    fork(takeLatest, "GET_INFO_LEASING_API", getLeasingInfo),

    //payment-saga
    fork(takeLatest, "GET_API_COINS", getCoinsEnabledSaga),
    fork(takeLatest, "SET_PAYMENT", setPaymentSaga),
    fork(takeLatest, "GET_FEE_PAYMENT", getFeePaymentSaga),
    fork(takeLatest, "SET_FEE_PAYMENT", setFeePaymentSaga),
    fork(takeLatest, "GET_INVOICE", getInvoiceSaga),
    fork(takeLatest, "GET_HISTORY_PAY", getHistoryPaySaga),
    fork(takeLatest, "CREATE_ALIAS_ADDRESS_API", createAlias),
    fork(takeLatest, "GET_ALIAS_ADDRESS_API", getAliases),

    // recharge-saga
    fork(takeLatest, "SET_MODAL_RECHARGE_STEP", setModalStepRechargeSaga),
    fork(takeLatest, "GET_OPERADORAS", getOperatorsSaga),
    fork(takeLatest, "GET_VALORES_RECARGA", getValuesCreditSaga),
    fork(takeLatest, "SET_RECHARGE", setRechargeSaga),
    fork(takeLatest, "GET_FEE_RECHARGE", getFeeRechargeSaga),
    fork(takeLatest, "SET_FEE_RECHARGE", setFeeRechargeSaga),
    fork(takeLatest, "CONFIRM_RECHARGE", confirmRechargeSaga),
    fork(takeLatest, "GET_HISTORY_RECHARGE", getHistoryRechargeSaga),
    fork(takeLatest, "GET_RECHARGE_COINS_ENABLED", getRechargeCoinsEnabledSaga),

    //assets
    fork(takeLatest, "CONFIRM_PAY", confirmPaySaga),
    fork(takeLatest, "SET_MODAL_PAY_STEP", setModalStepSaga),
    fork(takeLatest, "GET_ASSET_GENERAL_INFO_API", getAssetGeneralInfo),
    fork(takeLatest, "GET_ASSET_HISTORY_API", getAssetHistory),
    fork(takeLatest, "RELOAD_ASSET_API", reloadAsset),
    fork(takeLatest, "SET_MODAL_PAY_STEP", setModalStepSaga),
  ];
}