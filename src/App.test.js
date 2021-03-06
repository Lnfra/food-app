import "jest-dom/extend-expect";
import "react-testing-library/cleanup-after-each";

import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, fireEvent, cleanup } from "react-testing-library";
import App from "./App";

beforeEach(cleanup);

test("Menu links to Home, Order and Admin navigate to the correct pages", () => {
  const history = createMemoryHistory({ initialEntries: ["/"] });
  const { getByTestId, getByText } = render(
    <Router history={history}>
      <App />
    </Router>
  );

  fireEvent.click(getByText(/home/i));
  expect(getByTestId("home-page")).toBeInTheDocument();

  fireEvent.click(getByText(/admin/i));
  expect(getByTestId("admin-page")).toBeInTheDocument();

  fireEvent.click(getByText(/orders/i));
  expect(getByTestId("order-page")).toBeInTheDocument();
});

test("Navigates to the create form when Create New button is clicked", () => {
  const history = createMemoryHistory({ initialEntries: ["/admin"] });
  const { getByText, getByTestId } = render(
    <Router history={history}>
      <App />
    </Router>
  );
  fireEvent.click(getByText(/admin/i));
  fireEvent.click(getByText(/create new/i));
  expect(getByTestId("create-page")).toBeInTheDocument();
});
