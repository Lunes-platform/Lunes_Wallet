const initialState = {
  professionalNode: [],
  history: [],
  leasingBalance: undefined,
  addressIsValid: false,
  isLoading: false,
  modalLoading: false,
  reload: false,
  coinFee: {
    low: 0.001,
    medium: 0.001,
    high: 0.001,
    selectedFee: undefined
  }
};

const leasing = (state = initialState, action) => {
  switch (action.type) {
    case "VALIDATE_LEASING_ADDRESS":
      return {
        ...state,
        addressIsValid: action.addressIsValid
      };

    case "GET_INFO_LEASING":
      return {
        ...state,
        history: action.leasingHistory,
        professionalNode: action.professionalNodes,
        leasingBalance: action.leasingBalance,
        modalLoading: false,
        isLoading: false,
        reload: false
      };

    case "SET_LEASING_RELOAD":
      return {
        ...state,
        reload: action.state ? true : false
      };

    case "SET_LEASING_MODAL_LOADING":
      return {
        ...state,
        modalLoading: action.state ? true : false
      };

    case "SET_LEASING_LOADING":
      return {
        ...state,
        isLoading: action.isLoading ? true : false
      };
    case "CLEAR_LEASING_STATE":
      return {
        ...state,
        addressIsValid: false
      };

    default: {
      return {
        ...state
      };
    }
  }
};

export default leasing;
