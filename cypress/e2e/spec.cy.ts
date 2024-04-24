describe("Register Page", () => {
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

    cy.get("input[data-testid='verification-input']", { timeout: 10000 }).type(verification_code);

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

  it('TID1-2', () => {
    cy.visit('/');

    const email = 'abc@';
    const password = 'abcd1234';
    const confirmPassword = 'abcd1234';

    cy.get('input[id="txt"][type="email"][placeholder="Enter your email here"]').type(email);
    cy.get('input[id="txt"][type="password"][placeholder="Enter your password"]').type(password);
    // cy.get('input[id="txt"][type="password"][placeholder="Enter your password"]').blur();
    cy.get('input[id="txt"][type="password"][placeholder="Re-enter your password"]').type(confirmPassword);

    // cy
    // .contains("Password must be 8 or more characters and contain at least 1 number")
    // .should('be.visible');

    cy.get("[data-testid='page1-confirm-button']").should('be.disabled');
    // cy.get("[data-testid='page1-confirm-button']").click();
  })

  it('TID1-3', () => {
    cy.visit('/');

    const email = 'def@email.com';
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
    cy.get("[data-testid='duplicate-email']").should("exist");
    // cy.get("[data-testid='page1-confirm-button']").click();
  })

  it('TID1-4', () => {
    cy.visit('/');

    const email = 'abc@email.com';
    const password = 'abcdefgh';
    const confirmPassword = 'abcdefgh';

    cy.get('input[id="txt"][type="email"][placeholder="Enter your email here"]').type(email);
    cy.get('input[id="txt"][type="password"][placeholder="Enter your password"]').type(password);
    // cy.get('input[id="txt"][type="password"][placeholder="Enter your password"]').blur();
    cy.get('input[id="txt"][type="password"][placeholder="Re-enter your password"]').type(confirmPassword);

    // cy
    // .contains("Password must be 8 or more characters and contain at least 1 number")
    // .should('be.visible');

    cy.get("[data-testid='page1-confirm-button']").should('be.disabled');
    cy.get("input[data-testid='password-field']").should('have.class', 'border-[#B3B3B3]');
    // cy.get("[data-testid='page1-confirm-button']").click();
  })

  it('TID1-5', () => {
    cy.visit('/');

    const email = 'abc@email.com';
    const password = '12345678';
    const confirmPassword = '12345678';

    cy.get('input[id="txt"][type="email"][placeholder="Enter your email here"]').type(email);
    cy.get('input[id="txt"][type="password"][placeholder="Enter your password"]').type(password);
    // cy.get('input[id="txt"][type="password"][placeholder="Enter your password"]').blur();
    cy.get('input[id="txt"][type="password"][placeholder="Re-enter your password"]').type(confirmPassword);

    // cy
    // .contains("Password must be 8 or more characters and contain at least 1 number")
    // .should('be.visible');

    cy.get("[data-testid='page1-confirm-button']").should('be.disabled');
    cy.get("input[data-testid='password-field']").should('have.class', 'border-[#B3B3B3]');
    // cy.get("[data-testid='page1-confirm-button']").click();
  })

  it('TID1-6', () => {
    cy.visit('/');

    const email = 'abc@email.com';
    const password = 'a1';
    const confirmPassword = 'a1';

    cy.get('input[id="txt"][type="email"][placeholder="Enter your email here"]').type(email);
    cy.get('input[id="txt"][type="password"][placeholder="Enter your password"]').type(password);
    // cy.get('input[id="txt"][type="password"][placeholder="Enter your password"]').blur();
    cy.get('input[id="txt"][type="password"][placeholder="Re-enter your password"]').type(confirmPassword);

    // cy
    // .contains("Password must be 8 or more characters and contain at least 1 number")
    // .should('be.visible');

    cy.get("[data-testid='page1-confirm-button']").should('be.disabled');
    cy.get("input[data-testid='password-field']").should('have.class', 'border-[#B3B3B3]');
    // cy.get("[data-testid='page1-confirm-button']").click();
  })

  it('TID1-7', () => {
    cy.visit('/');

    const email = 'abc@email.com';
    const password = 'abcd1234';
    const confirmPassword = 'abcd1243';

    cy.get('input[id="txt"][type="email"][placeholder="Enter your email here"]').type(email);
    cy.get('input[id="txt"][type="password"][placeholder="Enter your password"]').type(password);
    // cy.get('input[id="txt"][type="password"][placeholder="Enter your password"]').blur();
    cy.get('input[id="txt"][type="password"][placeholder="Re-enter your password"]').type(confirmPassword);

    // cy
    // .contains("Password must be 8 or more characters and contain at least 1 number")
    // .should('be.visible');

    cy.get("[data-testid='page1-confirm-button']").should('be.disabled');
    cy.get("input[data-testid='confirm-password-field']").should('have.class', 'border-[#B3B3B3]');
    // cy.get("[data-testid='page1-confirm-button']").click();
  })

  it('TID1-8', () => {
    cy.visit('/');

    const email = 'abc@email.com';
    const password = 'abcd1234';
    const confirmPassword = 'abcd1234';

    cy.get('input[id="txt"][type="email"][placeholder="Enter your email here"]').type(email);
    cy.get('input[id="txt"][type="password"][placeholder="Enter your password"]').type(password);
    cy.get('input[id="txt"][type="password"][placeholder="Re-enter your password"]').type(confirmPassword);

    cy.get("[data-testid='page1-confirm-button']").should('be.enabled');
    cy.get("[data-testid='page1-confirm-button']").click();

    const verCode = "555555"

    cy.get("[data-testid='verification-input']").type(verCode);
    cy.get("[data-testid='verify-button']").click();

    cy.get("[data-testid='wrong-code']").should('exist')

  })

  it("TID1-9", () => {
    cy.visit("/");

    const email = "abc@email.com";
    const password = "abcd1234";
    const confirmPassword = "abcd1234";

    cy.get(
      'input[id="txt"][type="email"][placeholder="Enter your email here"]'
    ).type(email);
    cy.get(
      'input[id="txt"][type="password"][placeholder="Enter your password"]'
    ).type(password);
    cy.get(
      'input[id="txt"][type="password"][placeholder="Re-enter your password"]'
    ).type(confirmPassword);

    cy.get("[data-testid='page1-confirm-button']").should("be.enabled");
    cy.get("[data-testid='page1-confirm-button']").click();

    const verCode = "AbCd12";

    cy.get("[data-testid='verification-input']", { timeout: 10000 }).type(verCode);
    cy.get("[data-testid='verify-button']").click();

    const firstName = "123";
    const lastName = "fed";
    const phoneNumber = "095 555 5555";

    cy.get("[data-testid='firstName-input']").type(firstName);
    cy.get("[data-testid='lastName-input']").type(lastName);
    cy.get("[data-testid='phoneNumber-input']").type(phoneNumber);

    cy.get("[data-testid='next-button']")
      .should("exist")
      .and(
        "have.class",
        "h-[60px]"
      );
    // cy.get("[data-testid='next-button']").click();
    cy.get("[data-testid='firstName-input']").should('have.value',"")
  });

  it("TID1-10", () => {
    cy.visit("/");

    const email = "abc@email.com";
    const password = "abcd1234";
    const confirmPassword = "abcd1234";

    cy.get(
      'input[id="txt"][type="email"][placeholder="Enter your email here"]'
    ).type(email);
    cy.get(
      'input[id="txt"][type="password"][placeholder="Enter your password"]'
    ).type(password);
    cy.get(
      'input[id="txt"][type="password"][placeholder="Re-enter your password"]'
    ).type(confirmPassword);

    cy.get("[data-testid='page1-confirm-button']").should("be.enabled");
    cy.get("[data-testid='page1-confirm-button']").click();

    const verCode = "AbCd12";

    cy.get("[data-testid='verification-input']", { timeout: 10000 }).type(verCode);
    cy.get("[data-testid='verify-button']").click();

    const firstName = "d1e2f3";
    const lastName = "fed";
    const phoneNumber = "095 555 5555";

    cy.get("[data-testid='firstName-input']").type(firstName);
    cy.get("[data-testid='lastName-input']").type(lastName);
    cy.get("[data-testid='phoneNumber-input']").type(phoneNumber);


    cy.get("[data-testid='firstName-input']").should('have.value',"def")
    // cy.get("[data-testid='next-button']").click();

  });

  it("TID1-11", () => {
    cy.visit("/");

    const email = "abc@email.com";
    const password = "abcd1234";
    const confirmPassword = "abcd1234";

    cy.get(
      'input[id="txt"][type="email"][placeholder="Enter your email here"]'
    ).type(email);
    cy.get(
      'input[id="txt"][type="password"][placeholder="Enter your password"]'
    ).type(password);
    cy.get(
      'input[id="txt"][type="password"][placeholder="Re-enter your password"]'
    ).type(confirmPassword);

    cy.get("[data-testid='page1-confirm-button']").should("be.enabled");
    cy.get("[data-testid='page1-confirm-button']").click();

    const verCode = "AbCd12";

    cy.get("[data-testid='verification-input']", { timeout: 10000 }).type(verCode);
    cy.get("[data-testid='verify-button']").click();

    const firstName = "def";
    const lastName = "01454!@@";
    const phoneNumber = "095 555 5555";

    cy.get("[data-testid='firstName-input']").type(firstName);
    cy.get("[data-testid='lastName-input']").type(lastName);
    cy.get("[data-testid='phoneNumber-input']").type(phoneNumber);


    cy.get("[data-testid='lastName-input']").should('have.value','')

  });

  it("TID1-12", () => {
    cy.visit("/");

    const email = "abc@email.com";
    const password = "abcd1234";
    const confirmPassword = "abcd1234";

    cy.get(
      'input[id="txt"][type="email"][placeholder="Enter your email here"]'
    ).type(email);
    cy.get(
      'input[id="txt"][type="password"][placeholder="Enter your password"]'
    ).type(password);
    cy.get(
      'input[id="txt"][type="password"][placeholder="Re-enter your password"]'
    ).type(confirmPassword);

    cy.get("[data-testid='page1-confirm-button']").should("be.enabled");
    cy.get("[data-testid='page1-confirm-button']").click();

    const verCode = "AbCd12";

    cy.get("[data-testid='verification-input']", { timeout: 10000 }).type(verCode);
    cy.get("[data-testid='verify-button']").click();

    const firstName = "def";
    const lastName = "01fed454!@@";
    const phoneNumber = "095 555 5555";

    cy.get("[data-testid='firstName-input']").type(firstName);
    cy.get("[data-testid='lastName-input']").type(lastName);
    cy.get("[data-testid='phoneNumber-input']").type(phoneNumber);


    cy.get("[data-testid='lastName-input']").should('have.value',"fed")

  });

  it("TID1-13", () => {
    cy.visit("/");

    const email = "abc@email.com";
    const password = "abcd1234";
    const confirmPassword = "abcd1234";

    cy.get(
      'input[id="txt"][type="email"][placeholder="Enter your email here"]'
    ).type(email);
    cy.get(
      'input[id="txt"][type="password"][placeholder="Enter your password"]'
    ).type(password);
    cy.get(
      'input[id="txt"][type="password"][placeholder="Re-enter your password"]'
    ).type(confirmPassword);

    cy.get("[data-testid='page1-confirm-button']").should("be.enabled");
    cy.get("[data-testid='page1-confirm-button']").click();

    const verCode = "AbCd12";

    cy.get("[data-testid='verification-input']", { timeout: 10000 }).type(verCode);
    cy.get("[data-testid='verify-button']").click();

    const firstName = "def";
    const lastName = "01fed454!@@";
    const phoneNumber = "abcde";

    cy.get("[data-testid='firstName-input']").type(firstName);
    cy.get("[data-testid='lastName-input']").type(lastName);
    cy.get("[data-testid='phoneNumber-input']").type(phoneNumber);


    cy.get("[data-testid='phoneNumber-input']").should('have.value',"")

  });

  it("TID1-14", () => {
    cy.visit("/");

    const email = "abc@email.com";
    const password = "abcd1234";
    const confirmPassword = "abcd1234";

    cy.get(
      'input[id="txt"][type="email"][placeholder="Enter your email here"]'
    ).type(email);
    cy.get(
      'input[id="txt"][type="password"][placeholder="Enter your password"]'
    ).type(password);
    cy.get(
      'input[id="txt"][type="password"][placeholder="Re-enter your password"]'
    ).type(confirmPassword);

    cy.get("[data-testid='page1-confirm-button']").should("be.enabled");
    cy.get("[data-testid='page1-confirm-button']").click();

    const verCode = "AbCd12";

    cy.get("[data-testid='verification-input']", { timeout: 10000 }).type(verCode);
    cy.get("[data-testid='verify-button']").click();

    const firstName = "def";
    const lastName = "01fed454!@@";
    const phoneNumber = "015 abc de55";

    cy.get("[data-testid='firstName-input']").type(firstName);
    cy.get("[data-testid='lastName-input']").type(lastName);
    cy.get("[data-testid='phoneNumber-input']").type(phoneNumber);


    cy.get("[data-testid='phoneNumber-input']").should('have.value',"015 55")

  });

  it("TID1-15", () => {
    cy.visit("/");

    const email = "abc@email.com";
    const password = "abcd1234";
    const confirmPassword = "abcd1234";

    cy.get(
      'input[id="txt"][type="email"][placeholder="Enter your email here"]'
    ).type(email);
    cy.get(
      'input[id="txt"][type="password"][placeholder="Enter your password"]'
    ).type(password);
    cy.get(
      'input[id="txt"][type="password"][placeholder="Re-enter your password"]'
    ).type(confirmPassword);

    cy.get("[data-testid='page1-confirm-button']").should("be.enabled");
    cy.get("[data-testid='page1-confirm-button']").click();

    const verCode = "AbCd12";

    cy.get("[data-testid='verification-input']", { timeout: 10000 }).type(verCode);
    cy.get("[data-testid='verify-button']").click();

    const firstName = "def";
    const lastName = "01fed454!@@";
    const phoneNumber = "012 345 6789 abcdef";

    cy.get("[data-testid='firstName-input']").type(firstName);
    cy.get("[data-testid='lastName-input']").type(lastName);
    cy.get("[data-testid='phoneNumber-input']").type(phoneNumber);


    cy.get("[data-testid='phoneNumber-input']").should('have.value',"012 345 6789")

  });
});
