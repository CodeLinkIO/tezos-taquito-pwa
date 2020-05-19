import React, { useState, useEffect } from "react";
import { getBalance, isValidAddress } from "../tezos";
import { Container, Label, Input, ErrorLabel } from "../components";

export default () => {
  const [balance, setBalance] = useState("");
  const [account, setAccount] = useState("");
  const [err, setErr] = useState("");

  const onChangeAddress = (e) => {
    setAccount(e.target.value);
  };

  useEffect(() => {
    if (!account) {
      setBalance("");
      return;
    }

    if (!isValidAddress(account)) {
      setErr("Invalid address");
      setBalance("");
      return;
    }

    getBalance(account)
      .then((balance) => {
        setBalance(`${balance.toNumber() / 1000000} ꜩ`);
        setErr("");
      })
      .catch((err) => {
        setErr(err.message);
      });
  }, [account]);

  return (
    <Container>
      <h1>Check Balance</h1>
      <Label>Tezos Address (Carthagenet):</Label>
      <Input onChange={onChangeAddress} value={account} />
      <Label>Balance:</Label>
      <div>{balance ? balance : "--"}</div>
      {err && <ErrorLabel>{err}</ErrorLabel>}
    </Container>
  );
};
