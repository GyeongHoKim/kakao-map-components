describe("Loader class", () => {
  it("should return kakao object after load method", () => {
    const appkey = Cypress.env("appkey");
    cy.visit(`/cypress/src/util/index.html?appkey=${appkey}`);
    cy.window().then((win) => {
      cy.wrap(win).its("kakao").should("exist");
    });
  });
});