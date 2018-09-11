export const loadingGeneral = state => ({
  type: "CHANGE_LOADING_GENERAL_STATE",
  state
});

export const loadGeneralInfo = password => ({
  type: "GET_GENERAL_INFO_API",
  password
});

export const loadWalletInfo = password => ({
  type: "GET_WALLET_INFO_API",
  password
});

export const availableCoins = () => ({
  type: "GET_AVAILABLE_COINS_API"
});

export const createCoinsAddress = coins => ({
  type: "POST_CREATE_COINS_ADDRESS_API",
  coins
});

export const balanceCoins = () => ({
  type: "GET_BALANCE_COINS_API"
});
