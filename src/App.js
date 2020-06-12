import React, { Fragment } from "react";
import logo from "./icon.png";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { configTezos } from "./tezos";
import Home from "./screens/Home";
import CheckBalance from "./screens/CheckBalance";
import SecretKey from "./screens/SecretKey";
import FaucetKey from "./screens/FaucetKey";
import SmartContract from "./screens/SmartContract";
import Transfer from "./screens/Transfer";
import { Provider, useSelector } from "react-redux";
import store from "./redux";

configTezos();

const Container = styled.div`
  background-color: #f7f7f7;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  margin-top: 1rem;
  margin-bottom: 5rem;
  text-align: center;

  img {
    width: 3rem;
  }
`;

const Content = styled.div``;

const NavBar = styled.div`
  text-align: center;
  margin-left: 0.5rem;
  margin-right: 0.5rem;

  a {
    color: #467eef;
    padding-right: 0.5rem;
    padding-left: 0.5rem;
    margin-bottom: 0.5rem;
    text-decoration: none;
    display: inline-block;
  }

  a + a {
    border-left: 1px solid #333;
  }
`;

const Navigator = () => {
  const account = useSelector((state) => state.account);
  return (
    <div>
      <NavBar>
        <Link to="/secret-key">Add Secret Key</Link>
        <Link to="/faucet-key">Add Faucet Key</Link>
        <Link to="/balance">Check Balance</Link>
        {account && (
          <Fragment>
            <Link to="/transfer">Transfer</Link>
            <Link to="/contract">Smart Contract</Link>
          </Fragment>
        )}
      </NavBar>
      {account && <p>Account: {account}</p>}
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Container>
          <Header>
            <img src={logo} className="App-logo" alt="logo" />
            <Navigator />
          </Header>
          <Content>
            <Switch>
              <Route path="/transfer">
                <Transfer />
              </Route>
              <Route path="/secret-key">
                <SecretKey />
              </Route>
              <Route path="/faucet-key">
                <FaucetKey />
              </Route>
              <Route path="/contract">
                <SmartContract />
              </Route>
              <Route path="/balance">
                <CheckBalance />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Content>
        </Container>
        <ToastContainer />
      </Router>
    </Provider>
  );
}

export default App;
