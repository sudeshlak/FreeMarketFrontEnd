import React from "react";
import { renderWithRedux } from "../src/util/testUtils";
import Category from "../src/components/category/Category";
import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
jest.mock("react-scroll", () => ({
    scroller: {
      scrollTo: jest.fn(), // Jest will track this mock function globally
    },
}));

describe("Category change", () => {
  // 1. Define your array of test data
  const categories = ["Grocery", "Pharmacy", "Food", "Electronic", "All"];

  // 2. Use it.each to loop through them
  it.each(categories)(
    "updates Redux state correctly when clicking '%s'",
    async (categoryName) => {
      const user = userEvent.setup();
      const { store } = renderWithRedux(<Category />);

      const categoryDiv = screen.getByText(categoryName.toLowerCase());

      // Now you can click it or check its classes
      await user.click(categoryDiv);

      // Assert the state updates correctly
      expect(store.getState().categoryList.category.searchedString).toBe("");
      expect(store.getState().categoryList.category.title).toBe(categoryName);
    },
  );
});
