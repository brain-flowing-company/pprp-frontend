/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add(
  "create_property",
  (
    name: string,
    listingType: string,
    propertyType: string,
    rentPrice: string,
    salePrice: string,
    description: string,
    address: string,
    bedrooms: string,
    bathrooms: string,
    floor: string,
    floorSize: string,
    unitNumber: string,
    image: string
  ) => {
    cy.get("#name").type(name).should("have.value", name);
    cy.get(`[for="${listingType}"]`).click();
    cy.get(".dropdown-select")
      .select(propertyType)
      .should("have.value", propertyType);
    cy.get("#rent-price").type(rentPrice).should("have.value", rentPrice);
    cy.get("#sale-price").type(salePrice).should("have.value", salePrice);
    cy.get("#description").type(description).should("have.value", description);
    cy.get("#address").type(address);
    cy.contains("Next").click();
    cy.contains("Ready").click();
    cy.get("#bedrooms").type(bedrooms);
    cy.get("#bathrooms").type(bathrooms);
    cy.get("#floor").type(floor);
    cy.get("#floorSize").type(floorSize);
    cy.get("#unitNumber").type(unitNumber);
    cy.get('input[type="file"]').selectFile(image, {
      force: true,
    });
    cy.contains("Submit").click();
  }
);
