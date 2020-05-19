import React from "react";
import { useSelector } from "react-redux";
import SecretKey from "./SecretKey";
import Option from "./Options";

export default (props) => {
  const loggedInAccount = useSelector((state) => state.account);
  if (!loggedInAccount) {
    return <SecretKey {...props} />;
  }
  return <Option {...props} />;
};
