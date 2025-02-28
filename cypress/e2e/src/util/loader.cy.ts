describe("Loader Class", () => {
  it("should set kakao object to window", () => {
    const appkey = Cypress.env("appkey");
    cy.visit(`/?appkey=${appkey}`);

    cy.window().then((window) => {
      cy.wrap(window).its("kakao").should("exist");
    });
  });
});
