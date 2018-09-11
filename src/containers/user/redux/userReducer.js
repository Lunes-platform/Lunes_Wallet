const initialState = {
  user: {
    profilePicture: undefined,
    birthday: undefined,
    city: undefined,
    country: undefined,
    gdpr: undefined,
    phone: undefined,
    state: undefined,
    street: undefined,
    zipcode: undefined,
    name: undefined,
    surname: undefined,
    username: undefined,
    email: undefined,
    password: undefined,
    seed: undefined
  },
  twoFactor: false,
  pages: {
    login: 0,
    create: 0,
    reset: 0
  },
  loading: false,
  errors: []
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case "POST_USER_AUTHENTICATE":
      return {
        ...state,
        user: {
          ...state.user,
          username: action.user.username,
          seed: action.user.seed,
          password: action.user.password
        },
        twoFactor: action.twoFactor,
        pages: {
          login: action.pages.login,
          create: 0,
          reset: 0
        },
        loading: false
      };

    case "GET_USER_2FA":
      return {
        ...state,
        twoFactor: action.state,
        loading: false
      };

    case "POST_USER_CREATE_2FA":
      return {
        ...state,
        loading: false
      };

    case "POST_USER_VERIFY_2FA":
      return {
        ...state,
        pages: {
          login: action.pages.login,
          create: 0,
          reset: 0
        },
        loading: false
      };

    case "CHANGE_USER_PERSONAL_INFO":
      return {
        ...state,
        pages: {
          login: 0,
          create: 1,
          reset: 0
        },
        user: action.user,
        loading: false
      };

    case "BACK_USER_PERSONAL_INFO":
      return {
        ...state,
        pages: {
          login: 0,
          create: state.pages.create - 1,
          reset: 0
        },
        loading: false
      };

    case "CHANGE_USER_PERSONAL_INFO_PASSWORD":
      return {
        ...state,
        pages: {
          login: 0,
          create: 2,
          reset: 0
        },
        user: {
          ...state.user,
          password: action.password
        },
        loading: false
      };

    case "POST_USER_CREATE_USER":
      return {
        ...state,
        pages: {
          login: 0,
          create: action.page,
          reset: 0
        },
        user: action.user,
        loading: false
      };

    case "POST_USER_RESET_USER":
      return {
        ...state,
        pages: {
          login: 0,
          create: 0,
          reset: action.page
        },
        user: action.user,
        loading: false
      };

    case "CHANGE_LOADING_STATE":
      return {
        ...state,
        loading: !state.loading
      };

    case "SET_USER_SEED":
      return {
        ...state,
        user: {
          ...state.user,
          seed: action.seed
        },
        loading: false
      };

    case "SET_USER_INFO":
      return {
        ...state,
        user: {
          ...state.user,
          profilePicture: action.user.profilePicture,
          name: action.user.name,
          email: action.user.email,
          surname: action.user.surname
        }
      };

    case "CLEAR_USER_ERROR":
      return {
        ...state,
        errors: []
      };

    default: {
      return {
        ...state
      };
    }
  }
};

export default user;
