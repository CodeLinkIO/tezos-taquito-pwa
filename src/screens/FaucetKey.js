import React, { useState } from "react";

import { toastError } from "../utils/errors.js";
import { Container, Label, TextArea, Button, ErrorLabel } from "../components";
import { importFaucetKey } from "../tezos";
import { addAccount } from "../redux";

import "react-toastify/dist/ReactToastify.css";

export default ({ setAccount }) => {
  const [faucetKey, setFaucetKey] = useState("");
  const [err, setErr] = useState("");

  const add = async () => {
    try {
      if (faucetKey) {
        const parsedKey = JSON.parse(faucetKey);
        importFaucetKey(parsedKey);
        addAccount(parsedKey.pkh);
      }
    } catch (err) {
      toastError("Cannot import invalid faucet key");
      setErr(err.message);
    }
  };

  return (
    <Container>
      <h1>Import Faucet Key</h1>
      <Label>Faucet Key:</Label>
      <TextArea
        onChange={(e) => setFaucetKey(e.target.value)}
        value={faucetKey}
      />
      <Button onClick={add}>Add</Button>
      {err && <ErrorLabel>{err}</ErrorLabel>}
    </Container>
  );
};
