const initialState = {
  professionalNode: [],
  history: [],
  balance: undefined,
  addressIsValid: false,
  isLoading: false,
  coinFee: {
    low: 0.001,
    medium: 0.001,
    high: 0.001,
    selectedFee: undefined
  },
};

const leasing = (state = initialState, action) => {

  switch (action.type) {
    case "VALIDATE_LEASING_ADDRESS":
      return {
        ...state,
        addressIsValid: action.addressIsValid
      };
    case "START_LEASING":
      return {
        ...state,
        // addressIsValid: action.addressIsValid
      };

    case "GET_INFO_LEASING":
      return {
        ...state,
        history: action.leasingHistory,
        professionalNode: action.professionalNodes,
        balance: action.leasingBalance,
        isLoading: false
      };

    case "SET_LEASING_LOADING":
      return {
        ...state,
        isLoading: action.isLoading
      };
    case "CLEAR_LEASING_STATE":
      return {
        ...state,
        addressIsValid: false
      };

    default:
      {
        return {
          ...state
        };
      }
  }
};

export default leasing;