import userEvent from "@testing-library/user-event";
import { renderWithRedux } from "../src/util/testUtils";
import React from "react";
import ShoppingAreaNavBar from "../src/components/shoppingAreaNavBar/ShoppingAreaNavBar";
import { screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Scroll from "react-scroll";
jest.mock("react-scroll", () => ({
    scroller: {
      scrollTo: jest.fn(), // Jest will track this mock function globally
    },
}));

describe("Shopping area nav bar", () => {
  // 1. Define your array of test data
  const categories = ["Grocery", "Pharmacy", "Food", "Electronic", "All"];

  // 2. Use it.each to loop through them
  it.each(categories)("updates Redux state correctly when clicking '%s'", async (categoryName) => {
    const user = userEvent.setup();
    const { store } = renderWithRedux(
      <MemoryRouter>
        <ShoppingAreaNavBar />
      </MemoryRouter>,
    );
    
    // Open the dropdown
    const categoryDropdownBtn = screen.getByRole("button", { name: /categories/i });
    await user.click(categoryDropdownBtn);

    // Find and click the specific category item
    const categoryItem = screen.getByText(categoryName);
    await user.click(categoryItem);

    // Assert the state updates correctly
    expect(store.getState().categoryList.category.searchedString).toBe("");
    expect(store.getState().categoryList.category.title).toBe(categoryName);
  });

  it.each(categories)("Category change scroll", async (categoryName) => {
    const user = userEvent.setup();
    renderWithRedux(
      <MemoryRouter>
        <ShoppingAreaNavBar />
      </MemoryRouter>,
    );

    const categoryDropdownBtn = screen.getByRole("button", { name: /categories/i });
    await user.click(categoryDropdownBtn);

    // Find and click the specific category item
    const categoryItem = screen.getByText(categoryName);
    await user.click(categoryItem);

    expect(Scroll.scroller.scrollTo).toHaveBeenCalledWith("products", {
        smooth: false,
        offset: -140,
    });

  });
});
