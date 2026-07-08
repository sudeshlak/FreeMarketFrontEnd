import userEvent from "@testing-library/user-event";
import { renderWithRedux } from "../src/util/testUtils";
import React from "react";
import ChangingShippingAddress from "../src/components/shoppingFormArea/ChangingShippingAddress";
import { screen } from "@testing-library/react";
import '@testing-library/jest-dom';

describe("Changing shipping address", () => {
  it("Name valid", async () => {
    const user = userEvent.setup();
    const { store } = renderWithRedux(
      <ChangingShippingAddress loading={false} />,
    );
    const otherNameInput = screen.getByLabelText(/name/i);
    await user.type(otherNameInput, "John Doe");
    expect(store.getState().shippingForm.otherAddressName).toBe("John Doe");
    expect(store.getState().shippingForm.otherAddressNameError).toBe("");
  });
  it("Name invalid", async () => {
    const user = userEvent.setup();
    renderWithRedux(<ChangingShippingAddress loading={false} />);
    const otherNameInput = screen.getByLabelText(/name/i);
    await user.type(otherNameInput, "12345@");
    expect(screen.getByText("Enter valid name")).toBeInTheDocument();
  });

  it("Billing address valid", async () => {
    const user = userEvent.setup();
    const { store } = renderWithRedux(
      <ChangingShippingAddress loading={false} />,
    );
    const otherBillingAddressInput = screen.getByLabelText(/billing address/i);
    await user.type(otherBillingAddressInput, "123 Main St");
    expect(store.getState().shippingForm.otherAddressBillingAddress).toBe(
      "123 Main St",
    );
    expect(store.getState().shippingForm.otherAddressBillingAddressError).toBe(
      "",
    );
  });
  it("Billing address invalid", async () => {
    const user = userEvent.setup();
    renderWithRedux(<ChangingShippingAddress loading={false} />);
    const otherBillingAddressInput = screen.getByLabelText(/billing address/i);
    await user.type(otherBillingAddressInput, "@#$");
    expect(screen.getByText("Enter valid address")).toBeInTheDocument();
    await user.clear(otherBillingAddressInput);
    await user.type(otherBillingAddressInput, "123 Main St");
    expect(screen.queryByText("Enter valid address")).not.toBeInTheDocument();
  });

  it("City valid", async () => {
    const user = userEvent.setup();
    const { store } = renderWithRedux(
      <ChangingShippingAddress loading={false} />,
    );
    const otherCityInput = screen.getByPlaceholderText("City / suburb");
    await user.type(otherCityInput, "New York");
    expect(store.getState().shippingForm.otherAddressCity).toBe("New York");
    expect(store.getState().shippingForm.otherAddressCityError).toBe("");
  });
  it("City invalid", async () => {
    const user = userEvent.setup();
    renderWithRedux(<ChangingShippingAddress loading={false} />);
    const otherCityInput = screen.getByPlaceholderText("City / suburb");
    await user.type(otherCityInput, "12345");
    expect(screen.getByText("Enter valid city")).toBeInTheDocument();
    await user.clear(otherCityInput);
    await user.type(otherCityInput, "New York");
    expect(screen.queryByText("Enter valid city")).not.toBeInTheDocument();
  });

  it("Postal code valid", async () => {
    const user = userEvent.setup();
    const { store } = renderWithRedux(
      <ChangingShippingAddress loading={false} />,
    );
    const otherPostalCodeInput = screen.getByPlaceholderText("Postal Code");
    await user.type(otherPostalCodeInput, "12345Aa");
    expect(store.getState().shippingForm.otherAddressPostelCode).toBe(
      "12345Aa",
    );
    expect(store.getState().shippingForm.otherAddressPostelCodeError).toBe("");
  });
  it("Postal code invalid", async () => {
    const user = userEvent.setup();
    renderWithRedux(<ChangingShippingAddress loading={false} />);
    const otherPostalCodeInput = screen.getByPlaceholderText("Postal Code");
    await user.type(otherPostalCodeInput, "!@#");
    expect(screen.getByText("Enter valid postal code")).toBeInTheDocument();
    await user.clear(otherPostalCodeInput);
    await user.type(otherPostalCodeInput, "12345Aa");
    expect(
      screen.queryByText("Enter valid postal code"),
    ).not.toBeInTheDocument();
  });

  it("Contact number valid", async () => {
    const user = userEvent.setup();
    const { store } = renderWithRedux(
      <ChangingShippingAddress loading={false} />,
    );
    const otherContactNumberInput = screen.getByLabelText(/contact number/i);
    await user.type(otherContactNumberInput, "1234567890");
    expect(store.getState().shippingForm.otherAddressContactNumber).toBe(
      "1234567890",
    );
    expect(store.getState().shippingForm.otherAddressContactNumberError).toBe(
      "",
    );
  });
  it("Contact number invalid", async () => {
    const user = userEvent.setup();
    renderWithRedux(<ChangingShippingAddress loading={false} />);
    const otherContactNumberInput = screen.getByLabelText(/contact number/i);
    await user.type(otherContactNumberInput, "@jvd");
    expect(screen.getByText("Enter valid contact number")).toBeInTheDocument();
    await user.clear(otherContactNumberInput);
    await user.type(otherContactNumberInput, "1234567890");
    expect(
      screen.queryByText("Enter valid contact number"),
    ).not.toBeInTheDocument();
  });
});
