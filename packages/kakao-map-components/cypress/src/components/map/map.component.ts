import '@/components/api-loader/api-loader';
import '@/components/map/map';
import { KakaoMap } from '@/components/map/map';
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
      </kakao-api-loader>
    `);

    // assert
    cy.get('@created').should('be.called');
  });

  it('should fires proper events when moving location', () => {
    // arrange
    const mapCreated = cy.spy().as('created');
    const centerChanged = cy.spy().as('centerChanged');
    const boundsChanged = cy.spy().as('boundsChanged');
    const idle = cy.spy().as('idle');
    const appkey = Cypress.env('appkey');
    cy.mount(html`
      <kakao-api-loader appkey=${appkey}>
        <kakao-map
          .center=${{ lat: 37.4983, lng: 126.8778 }}
          @map-created=${(e: CustomEvent) => mapCreated(e)}
          @center-changed=${(e: CustomEvent) => centerChanged(e)}
          @bounds-changed=${(e: CustomEvent) => boundsChanged(e)}
          @idle=${(e: CustomEvent) => idle(e)}
        ></kakao-map>
      </kakao-api-loader>
    `);
    cy.get('@created').should('be.called');

    // act
    cy.get('kakao-map').then(($el) => {
      const mapComponent = ($el[0] as KakaoMap);
      const map = mapComponent.getMap();
      const moveTo: kakao.maps.LatLng = new kakao.maps.LatLng(38.4983, 127.8778);
      map?.panTo(moveTo);
    })

    // assert
    cy.get('@centerChanged').should('be.called');
    cy.get('@boundsChanged').should('be.called');
    cy.get('@idle').should('be.called');
  });

  it('should fires proper events when zooming map', () => {
    // arrange
    const mapCreated = cy.spy().as('created');
    const zoomStart = cy.spy().as('zoomStart');
    const zoomChanged = cy.spy().as('zoomChanged');
    const idle = cy.spy().as('idle');
    const appkey = Cypress.env('appkey');
    cy.mount(html`
      <kakao-api-loader appkey=${appkey}>
        <kakao-map
          .center=${{ lat: 37.4983, lng: 126.8778 }}
          .level=${3}
          @map-created=${(e: CustomEvent) => mapCreated(e)}
          @zoom-start=${(e: CustomEvent) => zoomStart(e)}
          @zoom-changed=${(e: CustomEvent) => zoomChanged(e)}
          @idle=${(e: CustomEvent) => idle(e)}
        ></kakao-map>
      </kakao-api-loader>
    `);
    cy.get('@created').should('be.called');

    // act
    cy.get('kakao-map')
      .trigger('wheel', { clientX: 100, clientY: 100, deltaY: 100 });

    // assert
    cy.get('@zoomStart').should('be.called');
    cy.get('@zoomChanged').should('be.called');
    cy.get('@idle').should('be.called');
  });

  it('should fires proper events when clicking map', () => {
    // arrange
    const mapCreated = cy.spy().as('created');
    const clickEvent = cy.spy().as('clickEvent');

    const appkey = Cypress.env('appkey');
    cy.mount(html`
      <kakao-api-loader appkey=${appkey}>
        <kakao-map
          .center=${{ lat: 37.4983, lng: 126.8778 }}
          @map-created=${(e: CustomEvent) => mapCreated(e)}
          @click=${(e: CustomEvent) => clickEvent(e)}
        ></kakao-map>
      </kakao-api-loader>
    `);
    cy.get('@created').should('be.called');

    // act
    cy.get('kakao-map').click(50, 50);

    // assert
    cy.get('@clickEvent').should('be.called');
  });

  it('should handle right click events correctly', () => {
    // arrange & act
    const mapCreated = cy.spy().as('created');
    const rightClickEvent = cy.spy().as('rightClickEvent');

    const appkey = Cypress.env('appkey');
    cy.mount(html`
      <kakao-api-loader appkey=${appkey}>
        <kakao-map
          .center=${{ lat: 37.4983, lng: 126.8778 }}
          @map-created=${(e: CustomEvent) => mapCreated(e)}
          @rightclick=${(e: CustomEvent) => rightClickEvent(e)}
        ></kakao-map>
      </kakao-api-loader>
    `);
    cy.get('@created').should('be.called');

    // act
    cy.get('kakao-map').rightclick(50, 50);

    // assert
    cy.get('@rightClickEvent').should('be.called');
  });

  it('should handle double click events correctly', () => {
    // arrange & act
    const mapCreated = cy.spy().as('created');
    const dblClickEvent = cy.spy().as('dblClickEvent');

    const appkey = Cypress.env('appkey');
    cy.mount(html`
      <kakao-api-loader appkey=${appkey}>
        <kakao-map
          .center=${{ lat: 37.4983, lng: 126.8778 }}
          @map-created=${(e: CustomEvent) => mapCreated(e)}
          @dblclick=${(e: CustomEvent) => dblClickEvent(e)}
        ></kakao-map>
      </kakao-api-loader>
    `);
    cy.get('@created').should('be.called');

    // act
    cy.get('kakao-map').dblclick(50, 50);

    // assert
    cy.get('@dblClickEvent').should('be.called');
  });

  it('should handle mouse move events correctly', () => {
    // arrange & act
    const mapCreated = cy.spy().as('created');
    const mouseMoveEvent = cy.spy().as('mouseMoveEvent');

    const appkey = Cypress.env('appkey');
    cy.mount(html`
      <kakao-api-loader appkey=${appkey}>
        <kakao-map
          .center=${{ lat: 37.4983, lng: 126.8778 }}
          @map-created=${(e: CustomEvent) => mapCreated(e)}
          @mousemove=${(e: CustomEvent) => mouseMoveEvent(e)}
        ></kakao-map>
      </kakao-api-loader>
    `);
    cy.get('@created').should('be.called');

    // act
    cy.get('kakao-map')
      .trigger('mousemove', { clientX: 100, clientY: 100 })
      .trigger('mousemove', { clientX: 150, clientY: 150 });

    // assert
    cy.get('@mouseMoveEvent').should('be.called');
  });

  it('should handle draggable property correctly', () => {
    // arrange
    const mapCreated = cy.spy().as('created');
    const dragStart = cy.spy().as('dragStart');
    const drag = cy.spy().as('drag');
    const dragEnd = cy.spy().as('dragEnd');
    const appkey = Cypress.env('appkey');
    cy.mount(html`
      <kakao-api-loader appkey=${appkey}>
        <kakao-map
          .center=${{ lat: 37.4983, lng: 126.8778 }}
          .draggable=${false}
          @map-created=${(e: CustomEvent) => mapCreated(e)}
          @dragstart=${(e: CustomEvent) => dragStart(e)}
          @drag=${(e: CustomEvent) => drag(e)}
          @dragend=${(e: CustomEvent) => dragEnd(e)}
        ></kakao-map>
      </kakao-api-loader>
    `);
    cy.get('@created').should('be.called');

    // act
    cy.get('kakao-map')
      .trigger('mousedown', { clientX: 100, clientY: 100 })
      .trigger('mousemove', { clientX: 200, clientY: 200 })
      .trigger('mouseup', { clientX: 200, clientY: 200 });

    // assert
    cy.get('@dragStart').should('not.be.called');
    cy.get('@drag').should('not.be.called');
    cy.get('@dragEnd').should('not.be.called');
    cy.get('kakao-map').then(($el) => {
      const component = $el[0] as KakaoMap;
      const map = component.getMap();
      expect(map).to.not.be.undefined;
      expect(map?.getDraggable()).to.be.false;
      const center = {
        lat: map?.getCenter().getLat().toFixed(4),
        lng: map?.getCenter().getLng().toFixed(4)
      }
      expect(center).to.deep.equal({ lat: "37.4983", lng: "126.8778" });
    })
  });

  it('should handle zoomable property correctly', () => {
    // arrange
    const mapCreated = cy.spy().as('created');
    const zoomStart = cy.spy().as('zoomStart');
    const zoomChanged = cy.spy().as('zoomChanged');
    const appkey = Cypress.env('appkey');
    cy.mount(html`
      <kakao-api-loader appkey=${appkey}>
        <kakao-map
          .center=${{ lat: 37.4983, lng: 126.8778 }}
          .zoomable=${false}
          .level=${3}
          @map-created=${(e: CustomEvent) => mapCreated(e)}
          @zoom-start=${(e: CustomEvent) => zoomStart(e)}
          @zoom-changed=${(e: CustomEvent) => zoomChanged(e)}
        ></kakao-map>
      </kakao-api-loader>
    `);
    cy.get('@created').should('be.called');

    // act
    cy.get('kakao-map')
      .trigger('wheel', { clientX: 100, clientY: 100, deltaY: 100 });

    // assert
    cy.get('@zoomStart').should('not.be.called');
    cy.get('@zoomChanged').should('not.be.called');
    cy.get('kakao-map').then(($el) => {
      const component = $el[0] as KakaoMap;
      const map = component.getMap();
      expect(map).to.not.be.undefined;
      expect(map?.getZoomable()).to.be.false;
      expect(map?.getLevel()).to.equal(3);
    })
  });

  it('should handle mapTypeId property correctly', () => {
    // arrange
    const mapCreated = cy.spy().as('created');
    const appkey = Cypress.env('appkey');
    cy.mount(html`
      <kakao-api-loader appkey=${appkey}>
        <kakao-map
          .center=${{ lat: 37.4983, lng: 126.8778 }}
          mapTypeId="ROADMAP"
          @map-created=${(e: CustomEvent) => mapCreated(e)}
        ></kakao-map>
      </kakao-api-loader>
    `);
    cy.get('@created').should('be.called');

    cy.get('kakao-map').then(($el) => {
      const component = $el[0] as KakaoMap;
      const map = component.getMap();
      expect(map).to.not.be.undefined;
      expect(map?.getMapTypeId()).to.equal(kakao.maps.MapTypeId.ROADMAP);
    })
  });
})