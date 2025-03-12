import '@/components/api-loader/api-loader';
import '@/components/map/map';
import { html } from "lit";

describe('kakao-map', () => {
  it('should fires map-created event when map is created', () => {
    // arrange & act
    const mapCreated = cy.spy().as('created');
    const appkey = Cypress.env('appkey');
    cy.mount(html`
      <kakao-api-loader
        appkey=${appkey}
      >
        <kakao-map
          .center=${{ lat: 37.4983, lng: 126.8778 }}
          @map-created=${(e: CustomEvent) => mapCreated(e)}
        ></kakao-map>
        <div slot="loading">loading</div>
        <div slot="error">error</div>
      </kakao-api-loader>
    `);

    // assert
    cy.get('@created').should('be.called');
  })
})