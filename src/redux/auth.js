const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";

export const logIn = user => {
  return {
    type: LOG_IN,
    isLoggedIn: true,
    payload: user
  };
};
export const logOut = () => {
  return {
    type: LOG_OUT,
    payload: null
  };
};

const initialState = () => {
  return {
    isLoggedIn: false,
    user: null
  };
};

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case "LOG_IN":
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload
      };
    case "LOG_OUT":
      return {
        ...state,
        isLoggedIn: false,
        user: null
      };
    default:
      return { ...state };
  }
};
