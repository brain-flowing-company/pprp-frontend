describe('Register Page', () => {
  it('Successfully load', () => {
    cy.visit('/');
  })

  it('TID1-1', () => {
    cy.visit('/');

    const email = 'abc@email.com';
    const password = 'abcd1234';
    const confirmPassword = 'abcd1234';

    cy.get('input[id="txt"][type="email"][placeholder="Enter your email here"]').type(email);
    cy.get('input[id="txt"][type="password"][placeholder="Enter your password"]').type(password);
    // cy.get('input[id="txt"][type="password"][placeholder="Enter your password"]').blur();
    cy.get('input[id="txt"][type="password"][placeholder="Re-enter your password"]').type(confirmPassword);

    // cy
    // .contains("Password must be 8 or more characters and contain at least 1 number")
    // .should('be.visible');
    cy.get("[data-testid='page1-confirm-button']").should('be.enabled');
    cy.get("[data-testid='page1-confirm-button']").click();

    const verification_code = 'AbCd12';

    cy.get("input[data-testid='verification-input']").type(verification_code);

    cy.get("[data-testid='wrong-code']").should('not.exist');
    cy.get("[data-testid='verify-button']").click();

    const firstName = 'def';
    const lastName = 'fed';
    const phoneNumber = '0955555555';

    cy.get("[data-testid='firstName-input']").type(firstName);
    cy.get("[data-testid='lastName-input']").type(lastName);
    cy.get("[data-testid='phoneNumber-input']").type(phoneNumber);

    cy.get("[data-testid='next-button']").should('be.enabled');
    
    // not register so that the email will not be used yet
    // cy.get("[data-testid='next-button']").click();
  })
})