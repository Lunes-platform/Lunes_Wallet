const initialState = {
  packages: [],
  history: [],
  user: {},
  modalStep: 1,
  loading: false,
  loadingGeneral: false,
  paymentMethod: null,
  kyc: {
    data: {},
    kycValidation: false
  },
  loadingState: false,
  loadingCity: false,
  location: {
    states: [],
    city: []
  },
  selectedValue: 0,
  paymentMethods: undefined,
  SelectedPaymentMethod: undefined,
  paymentsMethodsService: []
};

const deposit = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PACKAGES_REDUCER":
      return {
        ...state,
        packages: action.packages
      };
    case "GET_HISTORY_DEPOSIT_REDUCER":
      return {
        ...state,
        history: action.history
      };
    case "SET_MODAL_STEP":
      return {
        ...state,
        modalStep: action.step
      };
    case "SET_USER_DATA":
      return {
        ...state,
        user: action.user,
        loading: false
      };
    case "SET_LOADING_DEPOSIT":
      return {
        ...state,
        loading: action.loading
      };
    case "SET_GENERAL_LOADING":
      return {
        ...state,
        loadingGeneral: action.loading
      };
    case "SET_PAYMENT_METHODS":
      return {
        ...state,
        paymentMethods: action.response.data
      };
    case "SET_PAYMENT_METHOD":
      return {
        ...state,
        SelectedPaymentMethod: action.method
      };
    case "SET_KYC_DATA":
      return {
        ...state,
        kyc: { ...state.kyc, data: action.response.data }
      };
    case "SET_KYC_TRUE":
      return {
        ...state,
        kyc: {
          ...state.kyc,
          kycValidation: true
        }
      };
    case "DEPOSIT_SET_STATE":
      return {
        ...state,
        location: {
          ...state.location,
          states: action.response.data
        },
        loadingState: false
      };
    case "DEPOSIT_SET_CITY":
      return {
        ...state,
        location: {
          ...state.location,
          city: action.response.data
        },
        loadingCity: false
      };
    case "SET_LOADING_DEPOSIT_STATE":
      return {
        ...state,
        loadingState: true
      };
    case "SET_LOADING_DEPOSIT_CITY":
      return {
        ...state,
        loadingCity: true
      };
    case "SET_SELECTED_VALUE":
      return {
        ...state,
        selectedValue: action.value
      };
    case "SET_METHODS_SERVICE_CREDIT_REDUCER":
      return {
        ...state,
        paymentsMethodsService: action.data
      };
    default: {
      return {
        ...state
      };
    }
  }
};

export default deposit;
