import React, { useEffect, useState } from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import * as rtl from "@testing-library/react";
import ApolloClient from "apollo-boost";
import SignUpForm from "./SignUpForm";
import GeneralSignUp from "./3-GeneralSignUp";
import ExpSignUp from "./4-ExpSignUp";
import "@testing-library/jest-dom/extend-expect";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
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

async function wait(ms = 0) {
  await rtl.act(() => {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  });
}

test("is rendering", async () => {
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
  const history = createMemoryHistory({ initialEntries: ["/signup"] });
  rtl.render(
    <ApolloProvider client={client}>
      <Router history={history}>
        <SignUpForm />
      </Router>
    </ApolloProvider>
  );
  await wait();
});

test("form", async () => {
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
  const history = createMemoryHistory({ initialEntries: ["/signup"] });
  rtl.render(
    <ApolloProvider client={client}>
      <Router history={history}>
        <SignUpForm />
      </Router>
    </ApolloProvider>
  );

  //fill out the form
  rtl.fireEvent.change(rtl.getByLabelText(container, "Email address"), {target: { value: "justintesting@live.com" }});
  // rtl.fireEvent.change(rtl.getByLabelText(container, " Password "), {target: { value: "justin" }});
  
  rtl.fireEvent.click(rtl.getByText(container, "Sign Up"))
});
 