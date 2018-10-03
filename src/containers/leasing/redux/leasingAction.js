export const validateLeasingAddress = (coin, address) => ({
  type: "VALIDATE_LEASING_ADDRESS_API",
  coin,
  address
});

export const startNewLeasing = data => ({
  type: "START_LEASING_API",
  data
});

export const cancelLeasing = data => ({
  type: "CANCEL_LEASING_API",
  data
});

export const getLeasingInfo = (coin, address, decimalPoint, password) => ({
  type: "GET_INFO_LEASING_API",
  coin,
  address,
  decimalPoint,
  password
});

export const setLeasingLoading = isLoading => ({
  type: "SET_LEASING_LOADING",
  isLoading
});

export const setLeasingModalLoading = state => ({
  type: "SET_LEASING_MODAL_LOADING",
  state
});

export const clearState = () => ({
  type: "CLEAR_LEASING_STATE"
});