const initialState = {
  voucher: {
    loading: false
  },
  coupon: {
    loading: false
  },
  gift: {
    loading: false
  },
  error: false,
  loading: false
};

const error = (state = initialState, action) => {
  switch (action.type) {
    case "SET_VOUCHER_LOADING":
      return {
        ...state,
        voucher: {
          loading: action.state ? true : false
        }
      };

    default: {
      return {
        ...state
      };
    }
  }
};

export default error;
