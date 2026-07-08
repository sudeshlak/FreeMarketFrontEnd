import { screen, render } from "@testing-library/react";
import React from "react";
import Footer from "../src/components/Footer";
import { MemoryRouter } from "react-router-dom";
import '@testing-library/jest-dom';

describe("Footer", () => {
  it("Check footer title", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );
    const text = screen.getByText('React Base - Free Industrial Training');
    expect(text).toBeInTheDocument();
  });
});
