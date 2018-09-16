export const setSelectedCoin = coin => ({
  type: "SET_SELECTED_COIN",
  coin
});

export const setAssetSendModalOpen = () => ({
  type: "SET_ASSET_MODAL_OPEN"
});

export const setAssetReceiveModalOpen = () => ({
  type: "SET_ASSET_MODAL_RECEIVE_OPEN"
});

export const setAssetSendModalLoading = () => ({
  type: "SET_ASSET_MODAL_LOADING"
});

export const setAssetModalStep = step => ({
  type: "SET_ASSET_MODAL_STEP",
  step
});

export const setAssetSendModalAmount = amount => ({
  type: "SET_ASSET_MODAL_SEND_AMOUNT",
  amount
});

export const setAssetSendModalFinalAmount = amount => ({
  type: "SET_ASSET_MODAL_FINAL_AMOUNT",
  amount
});

export const getAssetSendModalFee = (
  coin,
  fromAddress,
  toAddress,
  amount,
  decimalPoint
) => ({
  type: "GET_ASSET_MODAL_SEND_FEE_API",
  coin,
  fromAddress,
  toAddress,
  amount,
  decimalPoint
});

export const setAssetSendModalSelectedFee = fee => ({
  type: "SET_ASSET_MODAL_SEND_SELECTED_FEE",
  fee
});

export const setAssetSendModalSelectedFeeLunes = fee => ({
  type: "SET_ASSET_MODAL_SEND_SELECTED_FEELUNES",
  fee
});

export const setAssetSendModalSelectedFeePerByte = fee => ({
  type: "SET_ASSET_MODAL_SEND_SELECTED_FEEPERBYTE",
  fee
});

export const getValidateAddress = (coin, address) => ({
  type: "GET_ASSET_VALIDATE_ADDRESS_API",
  coin,
  address
});

export const setAssetLoading = state => ({
  type: "SET_ASSET_LOADING",
  state
});

export const getAssetCoinHistory = (coin, address) => ({
  type: "GET_ASSET_COIN_HISTORY_API",
  coin,
  address
});

export const setAssetCoinHistoryLoading = state => ({
  type: "SET_ASSET_HISTORY_LOADING",
  state
});

export const setAssetTransaction = (transaction, password) => ({
  type: "SET_ASSET_TRANSACTION_API",
  transaction,
  password
});

export const clearAssetState = () => ({
  type: "CLEAR_ASSET_STATE"
});

export const shareCoinAddress = (name, address) => ({
  type: "SHARE_COIN_ADRESS_API",
  name,
  address
});

export const getCoinFeeValue = coinType => ({
  type: "GET_COIN_FEE_API",
  coinType
});
