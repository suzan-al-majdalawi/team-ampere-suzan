describe("Mina uppgifter", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("loggar in och öppnar Mina uppgifter", () => {
    cy.get('input[type="text"]').type("test@example.com");

    cy.get('input[type="password"]').type("password");

    cy.contains("button", "Logga in").click();

    cy.url().should("include", "/");

    cy.contains("Mina uppgifter").click();

    cy.url().should("include", "/profil");

    cy.contains("h1", "Mina uppgifter").should("be.visible");
  });
});
