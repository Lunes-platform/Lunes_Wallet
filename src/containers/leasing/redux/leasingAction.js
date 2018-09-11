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

export const getLeasingInfo = (coin, address, decimalPoint) => ({
  type: "GET_INFO_LEASING_API",
  coin,
  address,
  decimalPoint
});

export const setLeasingLoading = isLoading => ({
  type: "SET_LEASING_LOADING",
  isLoading
});

export const clearState = () => ({
  type: "CLEAR_LEASING_STATE"
});