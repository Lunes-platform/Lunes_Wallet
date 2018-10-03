import { put, call } from "redux-saga/effects";

// UTILS
import { getAuthToken } from "../../../utils/localStorage";

// Services
import AssetService from "../../../services/assetService";
const assetService = new AssetService();


export function* getAssetGeneralInfo(action) {
  try {
    yield put({
      type: "SET_ASSET_DATA",
      isBalanceLoading: true })

    let token = getAuthToken();
    let { lunesAddress } = action;

    let response = yield call([assetService, assetService.getBalances], lunesAddress, token);

    if (response.type !== 'success') {
      yield put({type: "REQUEST_FAILED", message: response.message})
      yield put({type: "SET_ASSET_DATA", isBalanceLoading: false})
      return;
    }

    let assets = response.data.balances;

    yield put({ type: "SET_ASSET_DATA", assets: assets, isBalanceLoading: false })

  } catch (error) {
    yield put({type: "REQUEST_FAILED", message: error.message})
    console.warn(error)
  }
}

export function* getAssetHistory(action) {
  try {
    yield put({
      type: "SET_ASSET_HISTORY",
      isTxHistoryLoading: true
    })

    let token = yield call(getAuthToken);
    let { assetId, lunesAddress } = action;


    let response = yield call(
      [assetService, assetService.getTxHistory],
      lunesAddress,
      assetId,
      token
    );

    if (response.type !== 'success') {
      yield put({type: "REQUEST_FAILED", message: response.message})
      yield put({type: "SET_ASSET_DATA", isTxHistoryLoading: false})
      return;
    }

    let history = response.data;

    yield put({
      type: "SET_ASSET_HISTORY",
      isTxHistoryLoading: false,
      history: history
    });

    return;
  } catch (error) {
    yield put({ type: "REQUEST_FAILED", message: error.message });
    console.warn(error)
  }
}

export function* reloadAsset(action) {
  try {
    let { assetId, lunesAddress } = action;

    yield put({ type: "GET_ASSET_GENERAL_INFO_API", lunesAddress })

    yield put({
      type: "GET_ASSET_HISTORY_API",
      assetId,
      lunesAddress
    })
  } catch(error) {
    yield put({type:"REQUEST_FAILED", message: error.message})
    console.warn(error)
  }
}
