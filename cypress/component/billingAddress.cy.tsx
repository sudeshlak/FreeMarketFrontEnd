import { Provider } from "react-redux";
import BillingAddress from "../../src/components/shoppingFormArea/BillingAddress";
import { createStore } from "redux";
import { rootReducer } from "../../src/state/reducers";
import { ApolloProvider } from "@apollo/client";
import client from "../../src/apollo/apollo";
import { FORM_RESET_VALUES } from "../../src/components/shoppingFormArea/billingFormConstants";
import { changeFormData } from "../../src/state/actions/shippingFormActions";

describe("Billing address form", () => {
  const store = createStore(rootReducer);

  beforeEach(() => {
    store.dispatch(
      setInitProducts({
        id: "test-product-1",
        title: "Test Product",
        category: { id: 1, title: "Test Category" },
        quantity: 1,
        regular_price: 100,
        discount_price: 10,
        image: "test.jpg",
      }),
    );
  });

  afterEach(() => {
    store.dispatch({ type: "CLEAR_CART" });
    FORM_RESET_VALUES.forEach((entry) => store.dispatch(changeFormData(entry)));
    cy.clearAllLocalStorage();
  });

  it("Email already exists shows error toast", () => {
    // Intercept GraphQL to return error for addUser
    cy.intercept("POST", "/graphql", (req) => {
      if (req.body.operationName === "addUser") {
        req.reply({
          errors: [
            {
              message: "Email already exists",
            },
          ],
        });
      }
    }).as("graphql");

    cy.mount(
      <ApolloProvider client={client}>
        <Provider store={store}>
          <BillingAddress />
        </Provider>
      </ApolloProvider>,
    );

    // Fill form fields
    cy.get('input[placeholder="Your Full Name"]').type("Test User");
    cy.get('input[placeholder="Street Address"]').type("123 Test St");
    cy.get('input[placeholder="City / suburb"]').type("Test City");
    cy.get('input[placeholder="Postal Code"]').type("12345");
    cy.get('input[type="tel"]').type("1234567890");
    cy.get('input[placeholder="Email"]').type("existing@example.com");
    cy.get('input[placeholder="Retype Email"]').type("existing@example.com");
    cy.get('input[type="password"]').clear().type("StrongPassword123!");

    //Keep default country as selected

    cy.getWithTestId("money-bill").click();

    // Click order button
    cy.get("button").contains("Order").click();

    // Wait for mutation and verify error message
    cy.wait("@graphql");
    cy.contains("Email already exists").should("be.visible");
  });

  it("Order submission failed", () => {
    cy.intercept("POST", "/graphql", (req) => {
      if (req.body.operationName === "addUser") {
        req.reply({ fixture: "successOrder.json" });
      } else if (req.body.operationName === "token") {
        req.reply({ fixture: "tokenResponse.json" });
      } else if (req.body.operationName === "addOrder") {
        req.reply({
          errors: [
            {
              message: "Order submission failed",
            },
          ],
        });
      }
    }).as("graphql");

    cy.mount(
      <ApolloProvider client={client}>
        <Provider store={store}>
          <BillingAddress />
        </Provider>
      </ApolloProvider>,
    );

    // Fill form fields
    cy.get('input[placeholder="Your Full Name"]').type("Test User");
    cy.get('input[placeholder="Street Address"]').type("123 Test St");
    cy.get('input[placeholder="City / suburb"]').type("Test City");
    cy.get('input[placeholder="Postal Code"]').type("12345");
    cy.get('input[type="tel"]').type("1234567890");
    cy.get('input[placeholder="Email"]').type("test@example.com");
    cy.get('input[placeholder="Retype Email"]').type("test@example.com");
    cy.get('input[type="password"]').type("Password@123");

    // Select country keep default

    // Select payment method (you may need to adjust selector based on Payment component)
    cy.getWithTestId("money-bill").click();

    // Click order button
    cy.get("button").contains("Order").click();

    // Wait for mutations and verify success toast
    cy.wait("@graphql");
    cy.contains("Failed to place order").should("be.visible");
  });

  it("Order submission success", () => {
    cy.intercept("POST", "/graphql", (req) => {
      if (req.body.operationName === "addUser") {
        req.reply({ fixture: "successOrder.json" });
      } else if (req.body.operationName === "token") {
        req.reply({ fixture: "tokenResponse.json" });
      } else if (req.body.operationName === "addOrder") {
        req.reply({ fixture: "addOrderResponse.json" });
      }
    }).as("graphql");

    cy.mount(
      <ApolloProvider client={client}>
        <Provider store={store}>
          <BillingAddress />
        </Provider>
      </ApolloProvider>,
    );

    // Fill form fields
    cy.get('input[placeholder="Your Full Name"]').type("Test User");
    cy.get('input[placeholder="Street Address"]').type("123 Test St");
    cy.get('input[placeholder="City / suburb"]').type("Test City");
    cy.get('input[placeholder="Postal Code"]').type("12345");
    cy.get('input[type="tel"]').type("1234567890");
    cy.get('input[placeholder="Email"]').type("test@example.com");
    cy.get('input[placeholder="Retype Email"]').type("test@example.com");
    cy.get('input[type="password"]').clear().type("Password@123");

    // Select country keep default

    // Select payment method (you may need to adjust selector based on Payment component)
    cy.getWithTestId("money-bill").click();

    // Click order button
    cy.get("button").contains("Order").click();

    // Wait for mutations and verify success toast
    cy.wait("@graphql");
    cy.contains("Order placed successfully!").should("be.visible");
  });
});
