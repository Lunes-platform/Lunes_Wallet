import { put, call } from "redux-saga/effects";
import { internalServerError } from "../../errors/statusCodeMessage";
import {successRequest,errorInput} from "../../errors/redux/errorAction";

// SERVICES
import InviteService from "../../../services/inviteService";

// UTILS
import { getAuthToken } from "../../../utils/localStorage";
import i18n from "../../../utils/i18n";

const inviteService = new InviteService();

export function* getInviteAddressSaga() {
  try {
    yield put({
      type: "SET_LOADING_ADDRESS",
      loading: true
    });

    let token = yield call(getAuthToken);
    let response = yield call(inviteService.getInvite, token);

    let address = [];
    if (response) {
      address = response.data;
    }

    yield put({
      type: "GET_INVITE_ADDRESS_REDUCER",
      address: address
    });

    let responseBalance = yield call(
      inviteService.getInviteBalance,
      token,
      address
    );
    let balance = [];
    if (responseBalance) {
      balance = responseBalance.data;
    }
    yield put({
      type: "GET_INVITE_BALANCE_REDUCER",
      balance: balance
    });
  } catch (error) {
    yield put(internalServerError());
  }
}

export function* sendMailInviteSaga(email) {
  yield put({
    type: "SET_LOADING_SENT",
    loading: true
  });

  let token = yield call(getAuthToken);
  const response = yield call(inviteService.sendEmail, token, email);
  
  yield put({
    type: "SEND_MAIL_INVITE_REDUCER",
    email
  });

  if(response.code!=200){
    yield put(errorInput(i18n.t("SEND_MAIL_INVITE_ERROR")));
  }else{
    yield put(successRequest(i18n.t("SEND_MAIL_INVITE_SUCCESS")));
    yield call(getInviteSentSaga);
  }

}

export function* getInviteSentSaga() {
  try {
    yield put({
      type: "SET_LOADING_INVITES",
      loading: true
    });

    let token = yield call(getAuthToken);
    let response = yield call(inviteService.getInviteHistory, token);

    let invites = [];
    if (response.data.invites && response.data.invites.length > 0) {
      invites = response.data.invites;
    }
   
    yield put({
      type: "GET_INVITE_SENT_REDUCER",
      invites: invites
    });
  } catch (error) {
    yield put(internalServerError());
  }
}

export function* sendWithdrawSaga(address) {
  yield put({
    type: "SET_LOADING_WITHDRAW",
    loading: true
  });

  let token = yield call(getAuthToken);
  const response = yield call(inviteService.sendWithdraw, token, address);

  if (response.data !== 200) {
    yield put(errorInput(i18n.t("INVITE_NO_BALANCE")));
  }
  else{
    yield put(successRequest(i18n.t("INVITE_WITHDRAW")));
  }

  yield put({
    type: "SEND_WITHDRAW_INVITE_REDUCER"
  });
}

export function* clearInviteSaga() {
  yield put({
    type: "CLEAR_INVITE_REDUCER"
  });
}