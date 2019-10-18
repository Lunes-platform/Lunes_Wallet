export const getFavoriteCoin = () => ({
  type: "GET_FAVORITES_COIN_API"
});

export const loadingSettings = () => ({
  type: "CHANGE_LOADING_SETTINGS"
});

export const getTwoFactorAuth = () => ({
  type: "POST_SETTINGS_CREATE_2FA_API"
});

export const verifyTwoFactorAuthSettings = token => ({
  type: "GET_SETTINGS_2FA_API",
  token
});

export const createAlias = (coin, address, alias, price, password) => ({
  type: "CREATE_ALIAS_ADDRESS_API",
  data: {
    coin,
    address,
    alias,
    price,
    password
  }
});

export const getAliases = address => ({
  type: "GET_ALIAS_ADDRESS_API",
  data: {
    address
  }
});

export const setAliasModal = () => ({
  type: "SET_WALLET_ALIAS_MODAL_OPEN"
});

export const setAliasLoading = state => ({
  type: "SET_WALLET_ALIAS_LOADING",
  state: state
});

export const kycCreate = payload => ({
  type: "KYC_CREATE",
  payload
});

export const kycUpload = upload => ({
  type: "KYC_UPLOAD",
  upload
});

export const kycGetCountries = () => ({
  type: "KYC_GET_COUNTRIES_API"
});

export const kycGetStates = country => ({
  type: "KYC_GET_STATES_API",
  country
});

export const kycGetCities = location => ({
  type: "KYC_GET_CITY_API",
  location
});
export const getKyc = () => ({
  type: "GET_KYC_API"
});
export const validateKycCep = cep =>({
  type: "GET_CEP_VALIDATION_API",
  cep
});
export const getSignatures = () => ({
  type: "GET_SIGNATURES_P2P"
});

export const getSignature = () => ({
  type: "GET_SIGNATURE_P2P"
});

export const signSignature = data => ({
  type: "SIGN_SIGNATURE_P2P",
  data
});

export const setSignature = signature => ({
  type: "SET_SIGNATURE_P2P",
  signature
});

export const getFeeP2P = (
  coin,
  amount,
  fromAddress,
  toAddress,
  decimalPoint
) => ({
  type: "GET_FEE_P2P",
  coin,
  fromAddress,
  toAddress,
  amount,
  decimalPoint
});

export const setFeeP2P = fee => ({
  type: "SET_FEE_P2P",
  fee
});
export const clearSettings = () => ({
  type: "SET_CLEAR_SETTINGS_REDUCER"
});