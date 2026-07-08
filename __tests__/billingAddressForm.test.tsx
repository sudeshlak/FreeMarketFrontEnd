import { renderWithRedux } from "../src/util/testUtils";
import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import BillingAddressForm from "../src/components/shoppingFormArea/BillingAddressForm";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';

describe("Billing address form", () => {
  it("Full name valid", async () => {
    const user = userEvent.setup();
    const { store } = renderWithRedux(<BillingAddressForm loading={false} />);
    const fullNameInput = screen.getByPlaceholderText("Your Full Name");

    await user.type(fullNameInput, "John Doe");
    expect(store.getState().shippingForm.fullName).toBe("John Doe");
    expect(store.getState().shippingForm.fullNameError).toBe("");
  });
  it("Full name invalid", async () => {
    const user = userEvent.setup();
    renderWithRedux(<BillingAddressForm loading={false} />);
    const fullNameInput = screen.getByPlaceholderText("Your Full Name");

    await user.type(fullNameInput, "John123"); // simulate typing
    expect(screen.getByText("Enter valid full name")).toBeInTheDocument();
    await user.clear(fullNameInput); // clear field
    await user.type(fullNameInput, "John Doe"); // type valid value
    expect(screen.queryByText("Enter valid full name")).not.toBeInTheDocument();
  });

  it("Email valid", async () => {
    const user = userEvent.setup();
    const { store } = renderWithRedux(<BillingAddressForm loading={false} />);
    const emailInput = screen.getByPlaceholderText("Email");
    await user.type(emailInput, "test@test.com");
    expect(store.getState().shippingForm.email).toBe("test@test.com");
    expect(store.getState().shippingForm.emailError).toBe("");
  });
  it("Email invalid", async () => {
    const user = userEvent.setup();
    renderWithRedux(<BillingAddressForm loading={false} />);
    const emailInput = screen.getByPlaceholderText("Email");
    await user.type(emailInput, "test.com");
    expect(screen.getByText("Enter valid email address")).toBeInTheDocument();
    await user.clear(emailInput);
    await user.type(emailInput, "test@test.com");
    expect(screen.queryByText("Enter valid email address")).not.toBeInTheDocument();
  });

  it("City valid", async () => {
    const user = userEvent.setup();
    const { store } = renderWithRedux(<BillingAddressForm loading={false} />);
    const cityInput = screen.getByPlaceholderText("City / suburb");
    await user.type(cityInput, "New York");
    expect(store.getState().shippingForm.city).toBe("New York");
    expect(store.getState().shippingForm.cityError).toBe("");
  });
  it("City invalid", async () => {
    const user = userEvent.setup();
    renderWithRedux(<BillingAddressForm loading={false} />);
    const cityInput = screen.getByPlaceholderText("City / suburb");
    await user.type(cityInput, "12345");
    expect(screen.getByText("Enter valid city")).toBeInTheDocument();
    await user.clear(cityInput);
    await user.type(cityInput, "New York");
    expect(screen.queryByText("Enter valid city")).not.toBeInTheDocument();
  });

  it("Address valid", async () => {
    const user = userEvent.setup();
    const { store } = renderWithRedux(<BillingAddressForm loading={false} />);
    const addressInput = screen.getByPlaceholderText("Street Address");
    await user.type(addressInput, "123 Main St");
    expect(store.getState().shippingForm.address).toBe("123 Main St");
    expect(store.getState().shippingForm.addressError).toBe("");
  });
  it("Address invalid", async () => {
    const user = userEvent.setup();
    renderWithRedux(<BillingAddressForm loading={false} />);
    const addressInput = screen.getByPlaceholderText("Street Address");
    await user.type(addressInput, "@#$");
    expect(screen.getByText("Enter valid address")).toBeInTheDocument();
    await user.clear(addressInput);
    await user.type(addressInput, "123 Main St");
    expect(screen.queryByText("Enter valid address")).not.toBeInTheDocument();
  });

  it("Postal code valid", async () => {
    const user = userEvent.setup();
    const { store } = renderWithRedux(<BillingAddressForm loading={false} />);
    const postalCodeInput = screen.getByPlaceholderText("Postal Code");
    await user.type(postalCodeInput, "12345Aa");
    expect(store.getState().shippingForm.postalCode).toBe("12345Aa");
    expect(store.getState().shippingForm.postalCodeError).toBe("");
  });
  it("Postal code invalid", async () => {
    const user = userEvent.setup();
    renderWithRedux(<BillingAddressForm loading={false} />);
    const postalCodeInput = screen.getByPlaceholderText("Postal Code");
    await user.type(postalCodeInput,"!@#");
    expect(screen.getByText("Enter valid postal code")).toBeInTheDocument();
    await user.clear(postalCodeInput);
    await user.type(postalCodeInput, "12345Aa");
    expect(screen.queryByText("Enter valid postal code")).not.toBeInTheDocument();
  });

  it("Contact number valid", async () => {
    const user = userEvent.setup();
    const { store } = renderWithRedux(<BillingAddressForm loading={false} />);
    const contactNumberInput = screen.getByLabelText(/contact number/i);
    await user.type(contactNumberInput, "1234567890");
    expect(store.getState().shippingForm.contactNumber).toBe("1234567890");
    expect(store.getState().shippingForm.contactNumberError).toBe("");
  });
  it("Contact number invalid", async () => {
    const user = userEvent.setup();
    renderWithRedux(<BillingAddressForm loading={false} />);
    const contactNumberInput = screen.getByLabelText(/contact number/i);
    await user.type(contactNumberInput, "@jvd");
    expect(screen.getByText("Enter valid contact number")).toBeInTheDocument();
    await user.clear(contactNumberInput);
    await user.type(contactNumberInput, "1234567890");
    expect(screen.queryByText("Enter valid contact number")).not.toBeInTheDocument();
  });

  it("Retype email valid", async () => {
    const user = userEvent.setup();
    const { store } = renderWithRedux(<BillingAddressForm loading={false} />);
    const emailInput = screen.getByPlaceholderText("Email");
    const retypeEmailInput = screen.getByLabelText(/retype email/i);
    fireEvent.change(emailInput, { target: { value: 'test@test.com' } })
    await user.type(retypeEmailInput, "test@test.com");
    expect(store.getState().shippingForm.retypeEmail).toBe("test@test.com");
    expect(store.getState().shippingForm.retypeEmailError).toBe("");
  });
  it("Retype email invalid", async () => {
    const user = userEvent.setup();
    renderWithRedux(<BillingAddressForm loading={false} />);
    const retypeEmailInput = screen.getByLabelText(/retype email/i);
    const emailInput = screen.getByPlaceholderText("Email");
    fireEvent.change(emailInput, { target: { value: 'test@test.com' } })
    await user.type(retypeEmailInput, "testRetype@test.com");
    expect(screen.getByText("Email and Retype Email should be equal")).toBeInTheDocument();
    await user.clear(retypeEmailInput);
    await user.type(retypeEmailInput, "test@test.com");
    expect(screen.queryByText("Email and Retype Email should be equal")).not.toBeInTheDocument();
  });
});
