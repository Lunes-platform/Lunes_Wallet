export const setModalStep = step => ({
  type: "SET_MODAL_PAY_STEP",
  step
});

export const getCoinsEnabled = () => ({
  type: "GET_API_COINS"
});
 
export const setPayment = pay => ({
  type: "SET_PAYMENT",
  pay
});

export const getFeePayment = (
  coin,
  amount,
  fromAddress,
  toAddress,
  decimalPoint
) => ({
  type: "GET_FEE_PAYMENT",
  coin,
  fromAddress,
  toAddress,
  amount,
  decimalPoint
});

export const setFeePayment = fee => ({
  type: "SET_FEE_PAYMENT",
  fee
});

export const getInvoice = number => ({
  type: "GET_INVOICE",
  number
});

export const getHistoryPay = () => ({
  type: "GET_HISTORY_PAY"
});

export const setClearPayment = () => ({
  type: "SET_CLEAR_PAYMENT_REDUCER"
});

export const confirmPay = payment => ({
  type: "CONFIRM_PAY",
  payment
});

export const uploadBarcode = image => ({
  type: "POST_UPLOAD_BARCODE_API",
  image
});

export const setClearStatePayment = () => ({
  type: "SET_CLEAN_STATE_PAYMENT_COIN_REDUCER"
});