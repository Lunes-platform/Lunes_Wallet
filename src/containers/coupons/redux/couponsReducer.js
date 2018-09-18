const initialState = {
  voucher: {
    loading: false
  },
  coupon: {
    loading: false,
    verified: undefined,
    message: undefined
  },
  gift: {
    loading: false
  },
  error: false,
  loading: false
};

const error = (state = initialState, action) => {
  switch (action.type) {
    case "VERIFY_COUPON": {
      let { data } = action;
      return {
        ...state,
        coupon: {
          ...state.coupon,
          ...data
        }
      }
    }
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
