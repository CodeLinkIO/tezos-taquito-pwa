import React, { useState } from "react";
import { InMemorySigner } from "@taquito/signer";

import { Container, Label, TextArea, Button, ErrorLabel } from "../components";
import { configTezos } from "../tezos";
import { toastError } from "../utils/errors.js";
import { addAccount } from "../redux";

export default () => {
  const [secret, setSecret] = useState("");
  const [err, setErr] = useState("");

  const add = async () => {
    try {
      const signer = new InMemorySigner(secret);
      const publicKeyHash = await signer.publicKeyHash();
      configTezos(signer);
      addAccount(publicKeyHash);
    } catch (err) {
      toastError("Cannot import secret key");
      setErr(err.message);
    }
  };

  const onChangeSecretKey = (e) => {
    setSecret(e.target.value);
  };

  return (
    <Container>
      <h1>Import Secret Key</h1>
      <Label>Secret Key:</Label>
      <TextArea onChange={onChangeSecretKey} value={secret} />
      <Button onClick={add}>Add</Button>
      {err && <ErrorLabel>{err}</ErrorLabel>}
    </Container>
  );
};
