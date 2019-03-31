import { takeLatest, takeEvery } from "redux-saga";
import { fork } from "redux-saga/effects";
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
  updateUserPasswordSaga,
  verifyInviteSaga,
  verifyEmailSaga
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
  createAlias,
  kycCreate,
  kycUpload,
  kycGetCountries,
  kycGetStates,
  kycGetCity,
  getKyc,
  getSignaturesSaga,
  getSignatureSaga,
  signSignatureSaga,
  getFeeP2PSaga,
  setFeeP2PSaga
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
  setModalStepSaga,
  uploadBarcodeSaga
} from "../payment/redux/paymentSaga";
import {
  getAssetGeneralInfo,
  getAssetHistory,
  reloadAsset,
  validateAddressAssets,
  getAssetsSendModalFee,
  shareTokenAddress,
  setAssetTransaction
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

import {
  openChatToTheSeller,
  prepareOrOpenChat,
  closeChat,
  setModalStepSaga as setModalFlowP2P,
  openModalPaySaga as setOpenModalFlowP2P,
  getP2PMyOrdersSaga,
  getP2PHistorySaga,
  getP2PFilterSaga,
  getPaymentMethodsWhenBuying,
  acceptOfferWhenBuying,
  createOfferWhenSelling,
  setP2POrdersCancelSaga,
  createSignatureSaga,
  openDeposit,
  closeDeposit,
  setUserId,
  openAvaliation,
  closeAvaliation,
  setTabIconSaga,
  getProfileSaga,
  setP2PRatingOrderSaga,
  confirmOrder,
  setUserDescription
} from "../p2p/redux/p2pSaga";

import {
  setModalStepSaga as setModalStepBuySaga,
  getBuyCoinsEnabledSaga,
  getCoinPackageSaga,
  getCoinForPaymentSaga,
  openModalPaySaga,
  setClearBuySaga,
  setBuyPackageSaga,
  setCoinSelectedSaga,
  setBuySaga,
  getFeeBuySaga,
  setFeeBuySaga,
  confirmBuySaga,
  getHistoryBuySaga,
  getLunesBuyPrices
} from "../buycoin/redux/buySaga";

import {
  getInviteAddressSaga,
  sendMailInviteSaga,
  getInviteSentSaga,
  sendWithdrawSaga
} from "../invite/redux/inviteSaga";

import {
  getPackagesSaga,
  getDepositHistorySaga,
  getKycData,
  depositGetStates,
  depositGetCity,
  getPaymentsMethods,
  getPaymentsMethodsServiceCreditSaga,
  getGeneralInfo
} from "../deposit/redux/depositSaga";

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
    fork(takeLatest, "VERIFY_INVITE_SAGA", verifyInviteSaga),
    fork(takeLatest, "VERIFY_EMAIL_SAGA", verifyEmailSaga),
    fork(takeLatest, "PATH_USER_CONSENTS_API", updateUserConsentsSaga),
    fork(takeLatest, "PATH_USER_DATA_API", editUserData),
    fork(takeLatest, "PATH_USER_PASSWORD_API", updateUserPasswordSaga),

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
    fork(takeLatest, "GET_COIN_ADRESS_API", shareCoinAddress),
    fork(takeLatest, "SET_WALLET_TRANSACTION_API", setWalletTransaction),
    fork(takeEvery, "SET_WALLET_UTXOS_API", setUtxos),

    // Leasing
    fork(takeLatest, "GET_PROFESSIONAL_NODE_API", getProfessionalNode),
    fork(takeLatest, "GET_COIN_FEE_API", getCoinFee),

    // Coupons
    fork(takeLatest, "GET_VOUCHER_API", getVoucher),
    fork(takeLatest, "GET_COUPON_API", verifyCoupon),

    // Settings
    fork(takeLatest, "POST_SETTINGS_CREATE_2FA_API", getTwoFactorAuth),
    fork(takeLatest, "GET_SETTINGS_2FA_API", verifyTwoFactorAuthSettings),
    fork(
      takeLatest,
      "GET_LEASING_VALIDATE_ADDRESS_API",
      validateLeasingAddress
    ),
    fork(takeLatest, "SET_LEASING_START_API", createLeasing),
    fork(takeLatest, "SET_LEASING_CANCEL_API", cancelLeasing),
    fork(takeLatest, "GET_INFO_LEASING_API", getLeasingInfo),
    fork(takeLatest, "KYC_CREATE", kycCreate),
    fork(takeLatest, "KYC_UPLOAD", kycUpload),
    fork(takeLatest, "KYC_GET_COUNTRIES_API", kycGetCountries),
    fork(takeLatest, "KYC_GET_STATES_API", kycGetStates),
    fork(takeLatest, "KYC_GET_CITY_API", kycGetCity),
    fork(takeLatest, "GET_KYC_API", getKyc),
    fork(takeLatest, "GET_SIGNATURES_P2P", getSignaturesSaga),
    fork(takeLatest, "GET_SIGNATURE_P2P", getSignatureSaga),
    fork(takeLatest, "SIGN_SIGNATURE_P2P", signSignatureSaga),
    fork(takeLatest, "GET_FEE_P2P", getFeeP2PSaga),
    fork(takeLatest, "SET_FEE_P2P", setFeeP2PSaga),

    //payment-saga
    fork(takeLatest, "POST_UPLOAD_BARCODE_API", uploadBarcodeSaga),
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
    fork(takeLatest, "SET_CONFIRM_RECHARGE", confirmRechargeSaga),
    fork(takeLatest, "GET_HISTORY_RECHARGE", getHistoryRechargeSaga),
    fork(takeLatest, "GET_RECHARGE_COINS_ENABLED", getRechargeCoinsEnabledSaga),

    //assets
    fork(takeLatest, "CONFIRM_PAY", confirmPaySaga),
    fork(takeLatest, "SET_MODAL_PAY_STEP", setModalStepSaga),
    fork(takeLatest, "GET_ASSET_GENERAL_INFO_API", getAssetGeneralInfo),
    fork(takeLatest, "GET_ASSET_HISTORY_API", getAssetHistory),
    fork(takeLatest, "GET_RELOAD_ASSET_API", reloadAsset),
    fork(takeLatest, "SET_MODAL_PAY_STEP", setModalStepSaga),
    fork(takeLatest, "GET_ADDRESS_VALIDATE_ADDRESS_API", validateAddressAssets),
    fork(takeLatest, "GET_ASSETS_MODAL_SEND_FEE_API", getAssetsSendModalFee),
    fork(takeLatest, "GET_TOKEN_ADRESS_API",shareTokenAddress),
    fork(takeLatest, "SET_ASSET_TRANSACTION_API", setAssetTransaction),

    // p2pchat
    fork(takeLatest, "SAGA_PREPARE_OR_OPEN_CHAT", prepareOrOpenChat),
    fork(takeLatest, "SAGA_OPEN_CHAT_TO_THE_SELLER", openChatToTheSeller),
    fork(takeLatest, "SAGA_CLOSE_CHAT", closeChat),
    fork(takeLatest, "SET_MODAL_FLOW_STEP", setModalFlowP2P),
    fork(takeLatest, "SET_MODAL_OPEN", setOpenModalFlowP2P),
    fork(takeLatest, "GET_P2P_MY_ORDERS", getP2PMyOrdersSaga),
    fork(takeLatest, "GET_P2P_HISTORY", getP2PHistorySaga),
    fork(takeLatest, "GET_P2P_FILTER", getP2PFilterSaga),
    fork(
      takeLatest,
      "API_GET_PAYMENT_METHODS_WHEN_BUYING",
      getPaymentMethodsWhenBuying
    ),
    fork(takeLatest, "API_ACCEPT_OFFER_WHEN_BUYING", acceptOfferWhenBuying),
    fork(takeLatest, "API_CREATE_OFFER_WHEN_SELLING", createOfferWhenSelling),
    fork(takeLatest, "SET_P2P_CANCEL_ORDERS", setP2POrdersCancelSaga),
    fork(takeLatest, "API_P2P_CREATE_CREATE_SIGNATURE", createSignatureSaga),
    fork(takeLatest, "OPEN_DEPOSIT_P2P", openDeposit),
    fork(takeLatest, "CLOSE_DEPOSIT_P2P", closeDeposit),
    fork(takeLatest, "SET_USER_ID_P2P", setUserId),
    fork(takeLatest, "OPEN_AVALIATION_P2P", openAvaliation),
    fork(takeLatest, "CLOSE_AVALIATION_P2P", closeAvaliation),
    fork(takeLatest, "SET_TAB_ICON", setTabIconSaga),
    fork(takeLatest, "GET_PROFILE_API", getProfileSaga),
    fork(takeLatest, "POST_CONFIRM_ORDER_API", confirmOrder),

    fork(takeLatest, "SET_P2P_CANCEL_ORDERS", setP2POrdersCancelSaga),
    fork(takeLatest, "SET_P2P_RATING_ORDER", setP2PRatingOrderSaga),
    fork(takeLatest, "SET_USER_DESCRIPTION_API", setUserDescription),

    // buy coins
    fork(takeLatest, "SET_MODAL_BUY_STEP", setModalStepBuySaga),
    fork(takeLatest, "GET_BUY_COINS_ENABLED", getBuyCoinsEnabledSaga),
    fork(takeLatest, "GET_COIN_PACKAGE", getCoinPackageSaga),
    fork(takeLatest, "GET_COIN_FOR_PAYMENT", getCoinForPaymentSaga),
    fork(takeLatest, "SET_MODAL_OPEN", openModalPaySaga),
    fork(takeLatest, "SET_CLEAR_BUY", setClearBuySaga),
    fork(takeLatest, "SET_BUY_PACKAGE", setBuyPackageSaga),
    fork(takeLatest, "SET_BUY_COIN_PAYMENT", setCoinSelectedSaga),
    fork(takeLatest, "SET_BUY", setBuySaga),
    fork(takeLatest, "GET_FEE_BUY", getFeeBuySaga),
    fork(takeLatest, "SET_FEE_BUY", setFeeBuySaga),
    fork(takeLatest, "CONFIRM_BUY", confirmBuySaga),
    fork(takeLatest, "GET_HISTORY_BUY", getHistoryBuySaga),
    fork(takeLatest, "GET_LUNES_BUY_PRICES_API", getLunesBuyPrices),

    // invite
    fork(takeLatest, "GET_INVITE_ADDRESS", getInviteAddressSaga),
    fork(takeLatest, "SEND_MAIL_INVITE", sendMailInviteSaga),
    fork(takeLatest, "GET_INVITE_SENT", getInviteSentSaga),
    fork(takeLatest, "SEND_WITHDRAW_INVITE", sendWithdrawSaga),

    // deposit
    fork(takeLatest, "GET_PACKAGES", getPackagesSaga),
    fork(takeLatest, "GET_DEPOSIT_HISTORY", getDepositHistorySaga),
    fork(takeLatest, "GET_KYC_DATA_API", getKycData),
    fork(takeLatest, "DEPOSIT_GET_STATES_API", depositGetStates),
    fork(takeLatest, "DEPOSIT_GET_CITY_API", depositGetCity),
    fork(takeLatest, "GET_PAYMENT_METHODS_API", getPaymentsMethods),
    fork(takeLatest, "GET_PAYMENT_METHOD_SERVICE_CREDIT", getPaymentsMethodsServiceCreditSaga),
    fork(takeLatest, "GET_DEPOSIT_GENERAL_INFO", getGeneralInfo)
  ];
}
