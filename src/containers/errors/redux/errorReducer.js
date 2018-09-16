const initialState = {
  message: {
    type: undefined,
    active: false,
    message: undefined
  }
};

const error = (state = initialState, action) => {
  switch (action.type) {
    case "REQUEST_SUCCESS":
      return {
        ...state,
        message: {
          type: "success",
          active: true,
          message: action.message
        }
      };

    case "REQUEST_FAILED":
      return {
        ...state,
        message: {
          type: "error",
          active: true,
          message: action.message
        }
      };

    case "CLEAR_MESSAGE":
      return {
        ...state,
        message: {
          type: undefined,
          active: false,
          message: undefined
        }
      };

    case "ERROR_INPUT":
      return {
        ...state,
        message: {
          type: "error",
          active: true,
          message: action.message
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
