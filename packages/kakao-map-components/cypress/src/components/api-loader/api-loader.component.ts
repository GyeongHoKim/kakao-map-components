import '@/components/api-loader/api-loader';
import { html } from "lit";

describe('kakao-api-loader', () => {
  it('should render loading state initially and success state after kakao script loads', () => {
    // arrange
    const appkey = Cypress.env('appkey');
    cy.mount<"kakao-api-loader">(html`
      <kakao-api-loader appkey=${appkey}></kakao-api-loader>
    `);

    // act & assert
    cy.window().then((win) => {
      cy.wrap(win).should('have.property', 'kakao');
    });
  })
})