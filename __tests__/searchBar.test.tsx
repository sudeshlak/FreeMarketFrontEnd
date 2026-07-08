import { act, render, screen } from "@testing-library/react";
import React from "react";
import { renderWithRedux } from "../src/util/testUtils";
import SearchBar from "../src/components/adminProductListSearchBar/SearchBar";
import "@testing-library/jest-dom"
import userEvent from "@testing-library/user-event";
import { setInitProducts } from "../src/state/actions/productActions";

describe("Search Bar", () => {
    const mockProduct = {
        id: "1",
        title: "Apple",
        category: { id: 1, title: "Grocery" },
        quantity: 10,
        regular_price: 100,
        discount_price: 90,
        image: "apple.jpg",
      };
      it("category change search bar", async () => {
        const user = userEvent.setup();
        const { store } = renderWithRedux(<SearchBar />);
        act(() => {
            store.dispatch(setInitProducts([mockProduct]));
        });
        const searchBar = screen.getByRole("combobox");
        await user.type(searchBar, "Apple");
        await user.click(await screen.findByRole("option", { name: "Apple" }));
        expect(store.getState().adminProductList.category.searchedString).toBe("Apple");
      });
});