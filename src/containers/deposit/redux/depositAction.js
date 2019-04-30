export const getPackages = () => ({
  type: "GET_PACKAGES"
});

export const setModalSteps = step => (
  {
    type: "SET_MODAL_STEP",
    step
  }
);

export const setLoading = loading => ({
  type: "SET_LOADING_DEPOSIT",
  loading
});

export const setUserData = user => ({
  type: "SET_USER_DATA",
  user
});

export const getDepositHistory = () => ({
  type: "GET_DEPOSIT_HISTORY"
});

export const getPaymentsMethods = () => ({
  type: "GET_PAYMENT_METHODS_API"
});
export const setPaymentInformation = (method) => ({
  type: "SET_PAYMENT_INFORMATION",
  method
});

export const createDepositBill = (payload) => ({
  type: "CREATE_DEPOSIT_BILL",
  payload
});
export const createDepositDebit = (payload) => ({
  type: "CREATE_DEPOSIT_DEBIT",
  payload
});

export const getKycData = () => ({
  type: "GET_KYC_DATA_API"
});

export const setKycValidation = () => ({
  type: "SET_KYC_TRUE"
});

export const depositGetStates = country => ({
  type: "DEPOSIT_GET_STATES_API",
  country
});

export const depositGetCity = location => ({
  type: "DEPOSIT_GET_CITY_API",
  location
});

export const setSelectedValue = value => ({
  type: "SET_SELECTED_VALUE",
  value
})
export const getDepositBill = (buyID) => ({
  type: "GET_DEPOSIT_BILL_API",
  buyID
});

export const getPaymentMethodService = (serviceId) => ({
  type: "GET_PAYMENT_METHOD_SERVICE_CREDIT",
  serviceId
});

export const setMethodServiceId = id => ({
  type: "SET_METHOD_SERVICE_ID",
  id
});

export const validateDepositCep = cep =>({
  type: "GET_CEP_VALIDATION_API",
  cep
});

export const getDepositGeneralInfo = () => ({
  type: "GET_DEPOSIT_GENERAL_INFO"
});