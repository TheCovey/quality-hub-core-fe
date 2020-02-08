import React from "react";
import * as rtl from "@testing-library/react";
import { MockedProvider, MockedResponse } from "@apollo/react-testing";
import Dashboard from "./Dashboard";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import { Router, NavLink, BrowserRouter } from "react-router-dom";
import { createMemoryHistory } from "history";

beforeEach(rtl.cleanup);
afterEach(rtl.cleanup);
const container = document.body;

it("Dashboard renders", () => {
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
  const history = createMemoryHistory({ initialEntries: ["/dashboard"] });
  rtl.render(
    <ApolloProvider client={client}>
      <Router history={history}>
        <Dashboard />
      </Router>
    </ApolloProvider>
  );
});

it("renders showing basic info, linkedaccoutns, payment info", () => {
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
  const history = createMemoryHistory({ initialEntries: ["/dashboard"] });
  rtl.render(
    <ApolloProvider client={client}>
      <Router history={history}>
        <Dashboard />
      </Router>
    </ApolloProvider>
  );
  rtl.getByText(container, "Basic Info");
  rtl.getByText(container, "Linked Accounts");
  rtl.getByText(container, "Payment Info");
});

it("router works", () => {
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
  const history = createMemoryHistory({ initialEntries: ["/dashboard"] });
  rtl.render(
    <ApolloProvider client={client}>
      <Router history={history}>
        <Dashboard />
      </Router>
    </ApolloProvider>
  );
  rtl.fireEvent.click(rtl.getByText(container, "Schedule"));
  expect(history.location.pathname).toBe("/dashboard/schedule");
  rtl.fireEvent.click(rtl.getByText(container, "Settings"));
  expect(history.location.pathname).toBe("/dashboard/settings");
});
