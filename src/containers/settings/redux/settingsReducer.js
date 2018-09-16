const initialState = {
  security: {
    urlImage: undefined
  },
  loading: false,
  errors: []
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case "POST_USER_AUTHENTICATE":
      return {
        ...state
      };

    case "CHANGE_LOADING_SETTINGS":
      return {
        ...state,
        loading: !state.loading
      };

    case "POST_SETTINGS_CREATE_2FA":
      return {
        ...state,
        security: {
          urlImage: action.url
        },
        loading: !state.loading
      };

    default: {
      return {
        ...state
      };
    }
  }
};

export default user;
