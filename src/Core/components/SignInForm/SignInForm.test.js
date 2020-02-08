import React, { useEffect, useState } from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import * as rtl from "@testing-library/react";
import ApolloClient from "apollo-boost";
import SignInForm from "./SignInForm";
import "@testing-library/jest-dom/extend-expect";
import { Router, NavLink, BrowserRouter, link } from "react-router-dom";
import { createMemoryHistory } from "history";

beforeEach(rtl.cleanup);
afterEach(rtl.cleanup);
const container = document.body;

const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return;
    }
    // originalError.call(console, ...args)
  };
});

afterAll(() => {
  console.error = originalError;
});

test("is rendering", () => {
  const getToken = () => {
    let token = localStorage.getItem("token");
    return token ? `Bearer ${token}` : "";
  };

  const client = new ApolloClient({
    uri: "https://quality-hub-gateway-staging.herokuapp.com/",
    request: operation => {
      operation.setContext({
        headers: {
          Authorization: getToken()
        }
      });
    }
  });
  const history = createMemoryHistory({ initialEntries: ["/signin"] });
  rtl.render(
    <ApolloProvider client={client}>
      <Router history={history}>
        <SignInForm />
      </Router>
    </ApolloProvider>
  );
});

test("form", () => {
  const getToken = () => {
    let token = localStorage.getItem("token");
    return token ? `Bearer ${token}` : "";
  };

  const client = new ApolloClient({
    uri: "https://quality-hub-gateway-staging.herokuapp.com/",
    request: operation => {
      operation.setContext({
        headers: {
          Authorization: getToken()
        }
      });
    }
  });
  const history = createMemoryHistory({ initialEntries: ["/signin"] });
  rtl.render(
    <ApolloProvider client={client}>
      <Router history={history}>
        <SignInForm />
      </Router>
    </ApolloProvider>
  );
  //fills out the form and clicks Sign in button
  rtl.fireEvent.change(rtl.getByLabelText(container, "Email address"), {target: { value: "dan@quail.com" }});
  rtl.fireEvent.change(rtl.getByLabelText(container, "Password"), {target: { value: "danquail" }});
  rtl.fireEvent.click(rtl.getByText(container, "Sign in"));
  // Forgot password and Sign up links not working yet will add tests for those when they are active
});
