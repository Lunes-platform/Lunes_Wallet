const initialState = {
  loadingAddress: false,
  loadingInvites: false,
  loadingSent: false,
  loadingWithdraw: false,
  modalOpen: false,
  address: "",
  invites: []
};

const invite = (state = initialState, action) => {
  switch (action.type) {
    case "SET_MODAL_INVITE":
      return {
        ...state,
        modalOpen: action.modalOpen
      };

    case "SET_LOADING_ADDRESS":
      return {
        ...state,
        loadingAddress: action.loading
      };

    case "SET_LOADING_INVITES":
      return {
        ...state,
        loadingInvites: action.loading
      };

    case "SET_LOADING_SENT":
      return {
        ...state,
        loadingSent: action.loading
      };

    case "SET_LOADING_INVITE_BALANCE":
      return {
        ...state,
        loadingInviteBalance: action.loading
      };

    case "SET_LOADING_WITHDRAW":
      return {
        ...state,
        loadingWithdraw: action.loading
      };

    case "GET_INVITE_ADDRESS_REDUCER":
      return {
        ...state,
        address: action.address,
        loadingAddress: false
      };

    case "GET_INVITE_BALANCE_REDUCER":
      return {
        ...state,
        balance: action.balance,
        loading: false
      };

    case "SEND_MAIL_INVITE_REDUCER":
      return {
        ...state,
        email: action.email,
        loadingSent: false
      };

    case "GET_INVITE_SENT_REDUCER":
      return {
        ...state,
        invites: action.invites,
        loadingInvites: false
      };

    case "SEND_WITHDRAW_INVITE_REDUCER":
      return {
        ...state,
        loadingWithdraw: false
      };
    case "CLEAR_INVITE_REDUCER":
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

export default invite;
