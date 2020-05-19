import React, { useState, Fragment } from "react";
import {
  readContract,
  getContractMethods,
  interactWithSmartContract,
  getStorageOfSmartContract,
} from "../tezos";
import {
  Container,
  Button,
  Label,
  Input,
  ErrorLabel,
  Log,
} from "../components";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const HorizontalInput = styled.div`
  display: flex;
  align-items: baseline;
`;

const H2 = styled.p`
  font-weight: bold;
  font-size: 1.2rem;
  max-width: 18rem;
  word-break: break-word;
  text-align: center;
`;

const Method = ({ onSubmit, name, params }) => {
  const [values, setValues] = useState(params.map(() => 0));
  const [output, setOutput] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const setValue = (index, value) => {
    values[index] = value;
    setValues([...values]);
  };

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

  const submit = async () => {
    setLoading(true);
    clearOutput();
    addOutput(`Begin ${name} with params ${values}`);
    setError("");
    try {
      onSubmit(values, addOutput);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <h3>{name}</h3>
      {params &&
        params.map((paramName, index) => (
          <HorizontalInput key={index}>
            <Label>{paramName}</Label>
            <Input
              onChange={(e) => setValue(index, e.target.value)}
              value={values[index]}
              type="number"
              disabled={loading}
            />
          </HorizontalInput>
        ))}
      <Button onClick={submit} disabled={loading}>
        Send
      </Button>
      {error && <ErrorLabel>{error}</ErrorLabel>}
      {output.map((log, i) => (
        <Log key={i}>{log}</Log>
      ))}
    </Fragment>
  );
};

const renderContract = (contract, methods) => {
  return (
    <Fragment>
      {methods &&
        methods.map(([name, ...params], index) => (
          <Method
            contract={contract}
            name={name}
            params={params}
            key={index}
            onSubmit={async (values, onStatusUpdate) => {
              interactWithSmartContract(
                contract.methods[name],
                values,
                onStatusUpdate
              );
            }}
          />
        ))}
    </Fragment>
  );
};

const Storage = ({ storage, onRefresh }) => {
  return (
    <Fragment>
      <h3>Contract Storage</h3>
      <Label>{storage}</Label>
      <Button onClick={onRefresh}>Refresh</Button>
    </Fragment>
  );
};

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

  const [loading, setLoading] = useState(false);
  const [contractAddr, setContractAddr] = useState("");
  const [error, setError] = useState("");
  const [storage, setStorage] = useState("");
  let [contract, setContract] = useState({});
  let [methods, setMethods] = useState([]);

  const onShowSmartContract = async () => {
    setLoading(true);
    try {
      let ctr = await readContract(contractAddr);
      setContract(ctr);
      let ctrMethods = await getContractMethods(ctr);
      setMethods(ctrMethods);

      showStorage(contractAddr);
    } catch (err) {
      setError(err.message);
    }
  };

  const showStorage = async (address) => {
    const contractStorage = await getStorageOfSmartContract(address);
    setStorage(JSON.stringify(contractStorage));
  };

  const onChangeContractAddress = (e) => {
    setContractAddr(e.target.value);
  };

  return (
    <Container>
      <h1>Smart Contract Interaction</h1>
      <Label>Smart Contract Address (Carthagenet):</Label>
      <Input
        onChange={onChangeContractAddress}
        value={contractAddr}
        disabled={loading}
      />
      <Button onClick={onShowSmartContract}>Show Smart Contract Methods</Button>

      {contract && <H2>{contract.address}</H2>}

      {storage && (
        <Storage
          storage={storage}
          onRefresh={async () => {
            await showStorage(contract.address);
          }}
        />
      )}
      {methods && renderContract(contract, methods)}

      {error && <ErrorLabel>{error}</ErrorLabel>}
    </Container>
  );
};
