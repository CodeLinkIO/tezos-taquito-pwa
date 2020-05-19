import React, { useState } from "react";
import { transfer, isValidAddress } from "../tezos";
import {
  Container,
  Label,
  Input,
  Button,
  ErrorLabel,
  Log,
} from "../components";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

export default () => {
  const loggedInAccount = useSelector((state) => state.account);
  if (!loggedInAccount) {
    return (
      <Redirect
        to={{
          pathname: "/",
        }}
      />
    );
  }
  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState([]);

  const clearOutput = () => {
    while (output.length) {
      output.pop();
    }
    setOutput(output);
  };

  const addOutput = (log) => {
    output.push(log);
    setOutput([...output]);
  };

  const onTransfer = async () => {
    if (!isValidAddress(account)) {
      setError("invalid address");
      return;
    }

    if (amount <= 0) {
      setError("amount have to >= 0");
      return;
    }

    setLoading(true);
    clearOutput();
    addOutput(`Start transferring ${amount} to ${account}`);
    setError("");
    try {
      await transfer(account, amount, addOutput);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h1>Transfer</h1>
      <Label>Target Tezos Address (Carthagenet):</Label>
      <Input
        onChange={(e) => setAccount(e.target.value)}
        value={account}
        disabled={loading}
      />
      <Label>Amount</Label>
      <Input
        onChange={(e) => setAmount(e.target.value)}
        value={amount}
        disabled={loading}
      />
      <Button onClick={onTransfer} disabled={loading}>
        Transfer
      </Button>
      {error && <ErrorLabel>{error}</ErrorLabel>}
      {output.map((log, i) => (
        <Log key={i}>{log}</Log>
      ))}
    </Container>
  );
};
