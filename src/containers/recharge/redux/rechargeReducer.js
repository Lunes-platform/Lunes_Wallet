const initialState = {
  operadoras: [],
  valores: [],
  coins: [],
  history: [],
  loading: false,
  loadingValores: false,
  modalStep: 1,
  recharge: {
    value: 0,
    number: '',
    coin: {
      address: '',
      abbreviation: '',
    },
    balance: '',
    amount: '',
    operator: '',
    address: ''
  },
  fee: {
    fee: {
      low: 0,
      medium: 0,
      high: 0
    }
  },
  user: {
    gdpr: 'unread'
  },
};

const recharge = (state=initialState, action) => {
  switch(action.type){
      case "SET_MODAL_RECHARGE_STEP_REDUCER":
        return {
          ...state,
          modalStep: action.step
        };

      case "SET_LOADING_REDUCER":
        return {
          ...state,
          loading: action.payload
        };

      case "SET_LOADING_VAL_REDUCER":
        return {
          ...state,
          loadingValores: action.payload
        };

      case "GET_COINS_REDUCER":
        return {
          ...state,
          coins: action.coins
        };

      case "GET_OPERADORAS_REDUCER":
        return {
          ...state,
          operadoras: action.operadoras,
          loadingValores: false
        };

      case "GET_VALORES_REDUCER":
        return {
          ...state,
          valores: action.valores,
          loadingValores: false
        }

      case "SET_RECHARGE_REDUCER":
        return {
          ...state,
          recharge: action.payload,
          loading: false
        }

      case "GET_FEE_RECHARGE_REDUCER":
        return {
          ...state,
          fee: action.fee,
          loading: false
        };

      case "SET_FEE_RECHARGE_REDUCER":
        return {
          ...state,
          recharge: {
            ...state.recharge,
            fee: action.fee
          }
        };

      case "SET_CLEAR_RECHARGE_REDUCER":
        return {
          ...initialState
        };

      case "GET_HISTORY_RECHARGE_REDUCER":
        return {
          ...state,
          history: action.history,
          loading: false
        };

    default: {
      return {
        ...state
      };
    }
  }
};

export default recharge;
