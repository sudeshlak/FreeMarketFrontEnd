describe("Product Item Cart Flow", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should handle empty cart, add item, update quantity, and delete item", () => {
    // Step 1: Click on shopping cart icon - should open empty cart
    cy.getWithTestId("shopping-cart-icon").click();
    cy.getWithTestId("empty-cart").as("empty-cart").should("be.visible");

    // Step 2: Add quantity 2 and click add to cart
    cy.getWithTestId("product-6a09322b383594589d217b6e").within(() => {
      cy.getWithTestId("product-count").type("2");
      cy.getWithTestId("product-add-btn").click();
    });

    // Verify non-empty cart with Qty.2
    cy.getWithTestId("shopping-cart-icon").click();
    cy.getWithTestId("non-empty-cart")
      .as("non-empty-cart")
      .should("be.visible")
      .within(() => {
        cy.getWithTestId("cart-product")
          .should("be.visible")
          .within(() => {
            cy.getWithTestId("cart-product-qty").should(
              "contain.text",
              "Qty.2",
            );
          });
      });

    // Step 3: Change quantity to 4 and click update
    cy.getWithTestId("product-6a09322b383594589d217b6e").within(() => {
      cy.getWithTestId("product-count").type("4");
      cy.getWithTestId("product-update-btn").click();
    });

    // Verify non-empty cart with Qty.2
    cy.getWithTestId("shopping-cart-icon").click();
    cy.getWithTestId("non-empty-cart")
      .as("non-empty-cart")
      .should("be.visible")
      .within(() => {
        cy.getWithTestId("cart-product-6a09322b383594589d217b6e")
          .should("be.visible")
          .within(() => {
            cy.getWithTestId("cart-product-qty").should(
              "contain.text",
              "Qty.4",
            );
            cy.getWithTestId("cart-product-delete-btn").click();
          });
      });

    cy.get("@empty-cart").should("be.visible");
  });
});

describe.only("Checkout Page Cart Flow", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it.only("should handle checkout page cart operations", () => {
    // Step 1: Add quantity 2 and click add to cart
    cy.getWithTestId("product-6a09326a3835941499217b72").within(() => {
      cy.getWithTestId("product-add-btn").click();
    });

    // Step 2: Click shopping cart icon and navigate to checkout
    cy.getWithTestId("shopping-cart-icon").click();
    cy.getWithTestId("cart-checkout-btn").click();

    // Verify navigation to checkout page
    cy.url().should("include", "/checkout");

    // Step 3: Verify table with one tr containing td with text 2
    cy.getWithTestId("checkout-table-area")
      .find("table")
      .should("exist")
      .within(() => {
        cy.get("tbody tr")
          .should("have.length", 1)
          .within(() => {
            cy.get("td").contains("1").should("exist");
            cy.getWithTestId("plus-circle-6a09326a3835941499217b72").click();
          });
      });

    // Open cart and verify Qty.3
    cy.getWithTestId("shopping-cart-icon").click();
    cy.getWithTestId("non-empty-cart")
      .should("be.visible")
      .within(() => {
        cy.getWithTestId("cart-product-6a09326a3835941499217b72")
          .should("exist")
          .within(() => {
            cy.getWithTestId("cart-product-qty").should(
              "contain.text",
              "Qty.2",
            );
          });
      });

    // Step 5: Click minus-circle to decrease quantity
    cy.getWithTestId("checkout-table-area")
      .find("table")
      .within(() => {
        cy.get("tbody tr").within(() => {
          cy.getWithTestId("minus-circle-6a09326a3835941499217b72").click();
        });
      });

    // Open cart and verify Qty.1
    cy.getWithTestId("shopping-cart-icon").click();
    cy.getWithTestId("non-empty-cart").within(() => {
      cy.getWithTestId("cart-product-6a09326a3835941499217b72").within(() => {
        cy.getWithTestId("cart-product-qty").should("contain.text", "Qty.1");
      });
    });

    // Step 5: Click minus-circle to decrease quantity
    cy.getWithTestId("checkout-table-area")
      .find("table")
      .within(() => {
        cy.get("tbody tr").within(() => {
          //Click remove button - should show empty cart
          cy.getWithTestId("remove-btn").click();
        });
      });

    //Verify empty cart
    cy.getWithTestId("shopping-cart-icon").click();
    cy.getWithTestId("empty-cart").should("be.visible");
  });
});
