const initialState = {
  coins: [],
  payment: {
    fee: "",
    number: "",
    coin: {
      abbreviation: "",
      address: ""
    },
    balance: "",
    amount: "",
    value: "",
    assignor: "", //bank: "",
    name: "",
    dueDate: "", // dateend: "",
    cpfCnpj: "",
    description: ""
  },
  fee: {
    fee: {
      low: 0,
      medium: 0,
      high: 0
    }
  },
  history: [],
  loading: false,
  user: {
    gdpr: "unread"
  },
  modalStep: 1
};

const payment = (state = initialState, action) => {
  switch (action.type) {
    case "SET_MODAL_PAY_STEP_REDUCER":
      return {
        ...state,
        modalStep: action.step
      };

    case "SET_LOADING_REDUCER":
      return {
        ...state,
        loading: action.payload
      };

    case "GET_COINS_REDUCER":
      return {
        ...state,
        coins: action.coins
      };

    case "GET_PAYMENT_DATA_REDUCER":
      return {
        ...state,
        number: action.number
      };

    case "SET_PAYMENT_REDUCER":
      return {
        ...state,
        payment: action.payload,
        loading: false
      };

    case "GET_FEE_PAYMENT_REDUCER":
      return {
        ...state,
        fee: action.fee,
        loading: false
      };

    case "SET_FEE_PAYMENT_REDUCER":
      return {
        ...state,
        payment: {
          ...state.payment,
          fee: action.fee
        }
      };

    case "GET_INVOICE_REDUCER":
      return {
        ...state,
        payment: {
          ...state.payment,
          ...action.payment
        }
      };

    case "GET_USER_GDPR_REDUCER":
      return {
        ...state,
        user: action.user
      };

    case "SET_USER_GDPR_REDUCER":
      return {
        ...state,
        user: action.user
      };

    case "GET_HISTORY_PAY_REDUCER":
      return {
        ...state,
        history: action.history,
        loading: false
      };

    case "SET_CLEAR_PAYMENT_REDUCER":
      return {
        ...initialState
      };

    default: {
      return {
        ...state
      };
    }
  }
};

export default payment;
