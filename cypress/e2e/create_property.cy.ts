import cypress from "cypress";

describe("Create Property Test", () => {
  beforeEach(() => {
    cy.setCookie("session", Cypress.env("session"));
    cy.setCookie("token", Cypress.env("session"));
    cy.viewport(1280, 1080);

    cy.visit(Cypress.env("create_property_url"));
  });
  it("TC1-1", () => {
    cy.create_property(
      "Condo Name",
      "rent",
      "Condominium",
      "10000",
      "2000000",
      "Stunning 2-Bedroom Condo in the Heart of Downtown",
      "66 Rama Rd, Phruttharam, Bang, Bangkok 10555",
      "2",
      "1",
      "23",
      "50",
      "2301",
      "cypress/e2e/tuk.png"
    );
  });
  it("TC1-2", () => {
    cy.get("#name").should("have.value", "");
    cy.get("#rent-price").should("have.value", "");
    cy.get("#sale-price").should("have.value", "");
    cy.get("#description").should("have.value", "");
    cy.contains("Next").should("be.disabled");
  });
  it("TC1-3", () => {
    cy.get("#name").type("Condo Name");
    cy.get(`[for="rent"]`).click();
    cy.get(".dropdown-select").select("Condominium");
    cy.get("#rent-price").type("10000");
    cy.get("#sale-price").type("2000000");
    cy.get("#description").type(
      "Stunning 2-Bedroom Condo in the Heart of Downtown"
    );
    cy.get("#address").type("66 Rama Rd, Phruttharam, Bang, Bangkok 10555");
    cy.contains("Next").click();
    cy.contains("Submit").should("be.disabled");
  });
});
