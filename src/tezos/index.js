import { Tezos } from "@taquito/taquito";
import { validateAddress, ValidationResult } from "@taquito/utils";
import { TezBridgeSigner } from "@taquito/tezbridge-signer";
import { importKey } from "@taquito/signer";
import { NODE_URL } from "../utils/config";

export const configTezos = (signer = undefined) => {
  if (!signer) {
    Tezos.setProvider({
      rpc: NODE_URL,
      signer: new TezBridgeSigner(),
    });
    return;
  }
  Tezos.setProvider({
    rpc: NODE_URL,
    signer,
  });
};

export const getBalance = async (account) => Tezos.tz.getBalance(account);

export const transfer = (account, amount, onStatusUpdate) =>
  Tezos.contract
    .transfer({ to: account, amount: amount })
    .then((op) => {
      onStatusUpdate(`Waiting for ${op.hash} to be confirmed...`);
      return op.confirmation(1).then(() => op.hash);
    })
    .then((hash) => {
      onStatusUpdate(
        `Operation injected: https://carthagenet.tzstats.com/${hash}`
      );
      onStatusUpdate("Done");
    })
    .catch((error) =>
      onStatusUpdate(`Error: ${error} ${JSON.stringify(error, null, 2)}`)
    );

export const isValidAddress = (address) => {
  return ValidationResult[validateAddress(address)] === ValidationResult[3];
};

export const importFaucetKey = async (faucetKey) => {
  return await importKey(
    Tezos,
    faucetKey.email,
    faucetKey.password,
    faucetKey.mnemonic.join(" "),
    faucetKey.secret
  );
};

export const interactWithSmartContract = (method, values, onStatusUpdate) => {
  method(values)
    .send()
    .then((op) => {
      onStatusUpdate(`Waiting for ${op.hash} to be confirmed...`);
      return op.confirmation(1).then(() => op.hash);
    })
    .then((hash) => {
      onStatusUpdate(
        `Operation injected: https://carthagenet.tzstats.com/${hash}`
      );
      onStatusUpdate("Done");
    })
    .catch((error) =>
      onStatusUpdate(`Error: ${JSON.stringify(error, null, 2)}`)
    );
};

export const readContract = async (address) => {
  return await Tezos.contract.at(address);
};

export const getContractMethods = async (contract) =>
  await contract.parameterSchema.ExtractSignatures();

export const getStorageOfSmartContract = async (address) => {
  const contract = await Tezos.contract.at(address);
  const storage = await contract.storage();
  return storage;
};
