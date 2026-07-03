import { render } from "@testing-library/react";
import Footer from "../src/components/Footer";
import React from "react";
import { MemoryRouter } from "react-router-dom";

it("Render footer unchanged", () => {
  const { asFragment } = render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});
