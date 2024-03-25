const userReducerSingUp = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNUP_REQUEST:
      return { loading: true };

    case USER_SIGNUP_SUCCESS:
      return { loading: false,
                userSingUp: action.pyload};

      case USER_SIGNUP_FAIL:
      return { loading: false,
                error: action.pyload };

      case USER_SIGNUP_RESET:
      return { };
    default:
      return state;
  }
};
