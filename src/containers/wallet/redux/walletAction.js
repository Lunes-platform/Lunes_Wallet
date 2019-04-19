export const setSelectedCoin = coin => ({
  type: "SET_SELECTED_COIN",
  coin
});

export const setWalletSendModalOpen = () => ({
  type: "SET_WALLET_MODAL_OPEN"
});

export const setWalletReceiveModalOpen = () => ({
  type: "SET_WALLET_MODAL_RECEIVE_OPEN"
});

export const setWalletSendModalLoading = () => ({
  type: "SET_WALLET_MODAL_LOADING"
});

export const setWalletModalStep = step => ({
  type: "SET_WALLET_MODAL_STEP",
  step
});

export const setWalletSendModalAmount = amount => ({
  type: "SET_WALLET_MODAL_SEND_AMOUNT",
  amount
});

export const setWalletSendModalFinalAmount = amount => ({
  type: "SET_WALLET_MODAL_FINAL_AMOUNT",
  amount
});

export const getWalletSendModalFee = (
  coin,
  fromAddress,
  toAddress,
  amount,
  decimalPoint
) => ({
  type: "GET_WALLET_MODAL_SEND_FEE_API",
  coin,
  fromAddress,
  toAddress,
  amount,
  decimalPoint
});

export const setWalletSendModalSelectedFee = fee => ({
  type: "SET_WALLET_MODAL_SEND_SELECTED_FEE",
  fee
});

export const setWalletSendModalSelectedFeeLunes = fee => ({
  type: "SET_WALLET_MODAL_SEND_SELECTED_FEELUNES",
  fee
});

export const setWalletSendModalSelectedFeePerByte = fee => ({
  type: "SET_WALLET_MODAL_SEND_SELECTED_FEEPERBYTE",
  fee
});

export const getValidateAddress = (coin, address) => ({
  type: "GET_WALLET_VALIDATE_ADDRESS_API",
  coin,
  address
});

export const setWalletLoading = state => ({
  type: "SET_WALLET_LOADING",
  state
});

export const getWalletCoinHistory = (coin, address) => ({
  type: "GET_WALLET_COIN_HISTORY_API",
  coin,
  address
});

export const setWalletCoinHistoryLoading = state => ({
  type: "SET_WALLET_HISTORY_LOADING",
  state
});

export const setWalletTransaction = (transaction, password) => ({
  type: "SET_WALLET_TRANSACTION_API",
  transaction,
  password
});

export const clearWalletState = () => ({
  type: "CLEAR_WALLET_STATE"
});

export const shareCoinAddress = (name, address) => ({
  type: "GET_COIN_ADRESS_API",
  name,
  address
});

export const getCoinFeeValue = coinType => ({
  type: "GET_COIN_FEE_API",
  coinType
});

export const setUtxos = (coin, address) => ({
  type: "SET_WALLET_UTXOS_API",
  coin,
  address
})

export const resetModalSend = () => ({
  type: "SET_RESET_MODAL_SEND"
})

export const setWalletSendModalDescribe = descripton => ({
  type: "SET_WALLET_MODAL_SEND_DESCRIBE",
  descripton
});