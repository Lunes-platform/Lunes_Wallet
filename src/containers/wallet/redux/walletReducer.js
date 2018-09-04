import { getDefaultCrypto } from "../../../utils/localStorage";

const initialState = {
  selectedCoin: getDefaultCrypto(),
  coinHistory: {
    loaded: false,
    loading: false,
    history: []
  },
  modal: {
    open: false,
    step: 0,
    address: undefined,
    sendAmount: undefined,
    feeValue: {
      low: 0.001,
      medium: 0.001,
      high: 0.001,
      selectedFee: undefined
    },
    loading: false
  },
  modalReceive: {
    open: false
  },

  coinFee: {
    low: 0.001,
    medium: 0.001,
    high: 0.001,
    selectedFee: undefined
  },
  loading: false,
  errors: false
};

const wallet = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SELECTED_COIN":
      return {
        ...state,
        selectedCoin: action.coin,
        loading: false
      };

    case "SET_WALLET_LOADING":
      return {
        selectedCoin: getDefaultCrypto(),
        coinHistory: {
          loaded: false,
          loading: false,
          history: state.coinHistory.history
        },
        modal: {
          open: state.modal.open,
          step: 0,
          address: undefined,
          sendAmount: undefined,
          feeValue: {
            low: 0.001,
            medium: 0.001,
            high: 0.001,
            selectedFee: undefined
          },
          loading: false
        },
        modalReceive: {
          open: false
        },
        coinFee: {
          low: 0.001,
          medium: 0.001,
          high: 0.001,
          selectedFee: undefined
        },
        loading: action.state ? action.state : false,
        errors: false
      };

    case "SET_WALLET_HISTORY_LOADING":
      return {
        ...state,
        coinHistory: {
          ...state.coinHistory,
          loading: action.state ? true : false
        }
      };

    case "SET_WALLET_HISTORY":
      return {
        ...state,
        coinHistory: {
          ...state.coinHistory,
          history: action.history,
          loading: false
        }
      };

    case "SET_WALLET_MODAL_OPEN":
      return {
        ...state,
        modal: {
          ...state.modal,
          open: !state.modal.open,
          loading: false
        }
      };

    case "SET_WALLET_MODAL_RECEIVE_OPEN":
      return {
        ...state,
        modalReceive: {
          ...state.modalReceive,
          open: !state.modalReceive.open,
          loading: false
        }
      };

    case "SET_WALLET_MODAL_STEP":
      console.warn("action.step", action.step);
      return {
        ...state,
        modal: {
          ...state.modal,
          step: action.step,
          loading: false
        }
      };

    case "SET_WALLET_MODAL_LOADING":
      return {
        ...state,
        modal: {
          ...state.modal,
          loading: !state.modal.loading
        }
      };

    case "SET_WALLET_MODAL_ADDRESS":
      return {
        ...state,
        modal: {
          ...state.modal,
          address: action.address,
          loading: false
        }
      };

    case "SET_WALLET_MODAL_SEND_AMOUNT":
      return {
        ...state,
        modal: {
          ...state.modal,
          sendAmount: action.amount
        }
      };

    case "GET_WALLET_MODAL_SEND_FEE":
      return {
        ...state,
        modal: {
          ...state.modal,
          feeValue: action.fee,
          loading: false
        }
      };

    case "SET_WALLET_MODAL_SEND_SELECTED_FEE":
      return {
        ...state,
        modal: {
          ...state.modal,
          feeValue: {
            ...state.modal.feeValue,
            selectedFee: action.fee
          },
          loading: false
        }
      };

    case "SET_WALLET_MODAL_TRANSACTION":
      return {
        ...state,
        modal: {
          ...state.modal,
          feeValue: action.value,
          loading: false
        }
      };

    case "SET_WALLET_TRANSACTION":
      return {
        ...state,
        modal: {
          open: true,
          step: state.modal.step,
          address: undefined,
          sendAmount: undefined,
          feeValue: {
            low: 0.001,
            medium: 0.001,
            high: 0.001,
            selectedFee: undefined
          },
          loading: false
        }
      };

    case "CHANGE_WALLET_ERROR_STATE":
      return {
        ...state,
        error: action.state
      };

    case "GET_COIN_FEE": {
      return {
        ...state,
        coinFee: {
          low: action.coinFee.low,
          medium: action.coinFee.medium,
          high: action.coinFee.high,
          selectedFee: action.coinFee.selectedFee
        }
      };
    }

    case "CLEAR_WALLET_STATE":
      return {
        selectedCoin: "lunes",
        modal: {
          open: false,
          step: 0,
          address: undefined,
          sendAmount: undefined,
          feeValue: {
            low: 0.001,
            medium: 0.001,
            high: 0.001,
            selectedFee: undefined
          },
          loading: false
        },
        loading: false,
        errors: false
      };

    default: {
      return {
        ...state
      };
    }
  }
};

export default wallet;
