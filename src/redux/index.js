import { createStore } from "redux";

const defaultState = { account: "" };

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "ACCOUNT_ADDED":
      return Object.assign({}, state, { account: action.account });
    case "ACCOUNT_REMOVE":
      return Object.assign({}, state, { account: "" });
    default:
      return state;
  }
};

const store = createStore(reducer);

export const addAccount = (account) =>
  store.dispatch({ type: "ACCOUNT_ADDED", account });
export const removeAccount = () => store.dispatch({ type: "ACCOUNT_REMOVE" });

export default store;
