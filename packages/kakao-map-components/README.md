# Kakao Map Components

Kakao 지도 API를 Web Component에 맞게 레핑한 라이브러리입니다.

## Usage

이 라이브러리를 사용하기 위해서는 **필수적**으로 Kakao 지도 API를 불러와야 합니다.

[Kakao 지도 Javscript API](https://apis.map.kakao.com/web/guide/)

### HTML Script Tag를 이용하여 Kakao 지도 API 불러오기

```html
<script
  type="text/javascript"
  src="//dapi.kakao.com/v2/maps/sdk.js?appkey=발급받은 APP KEY를 넣으시면 됩니다.&libraries=services,clusterer"
></script>
```

### kakao-api-loader 컴포넌트를 이용하여 Kakao 지도 API 불러오기

```ts
export class MyWebComponent extends HTMLElement {
  connectedCallback() {
    this.shadowRoot = this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `<kakao-api-loader
      appkey="발급받은 APP KEY를 넣으시면 됩니다."
    >
      <your-web-component>성공시에 표출됩니다</your-web-component>
      <your-web-component slot="loading">로딩 중 표출됩니다</your-web-component>
      <your-web-component slog="error">실패시 표출됩니다</your-web-component>
    </kakao-api-loader>`;
  }
}
```

## TypeScript

타입스크립트 사용자는 [kakao.maps.d.ts](https://github.com/JaeSeoKim/kakao.maps.d.ts) 패키지를 사용하시면 됩니다.

`tsconfig.json`의 `compilerOptions.types` 속성에 `kakao.maps.d.ts` 패키지를 추가하시면 됩니다.

```js
{
  ...,
  "compilerOptions": {
    ...,
    "types": [
      ...,
      "kakao.maps.d.ts"
    ]
  }
}
```

## Install

```bash
npm install kakao-map-components
# or
yarn add kakao-map-components
# or
pnpm add kakao-map-components
```

## Simple Usage

### 맵위에 마커와 인포윈도우 올리기

```ts
export class MyWebComponent extends HTMLElement {
  render() {
    return `
      <kakao-map
        center={{ lat: 33.5563, lng: 126.79581 }}
        style={{ width: "100%", height: "360px" }}
      >
        <kakao-map-marker position={{ lat: 33.55635, lng: 126.795841 }}>
          <div style={{color:"#000"}}>Hello World!</div>
        </kakao-map-marker>
      </kakao-map>
    `;
  }

  connectedCallback() {
    this.shadowRoot = this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = this.render();
  }
}
```

### 맵위에 커스텀오버레이 올리기

```ts
export class MyWebComponent extends HTMLElement {
  render() {
    return `
      <kakao-map
        center={{ lat: 33.5563, lng: 126.79581 }}
        style={{ width: "100%", height: "360px" }}
      >
        <kakao-map-custom-overlay position={{ lat: 33.55635, lng: 126.795841 }}>
          <div style={{padding:"42px", backgroundColor:"#fff", color:"#000"}}>Custom Overlay!</div>
        </kakao-map-custom-overlay>
      </kakao-map>
    `;
  }

  connectedCallback() {
    this.shadowRoot = this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = this.render();
  }
}
```

### 맵위에 마커 클러스터 올리기

> **※ 참고**: 해당 기능을 사용하기 위해서는 사용자는 반드시 `clusterer` library를 불러와야 합니다.

```ts
export class MyWebComponent extends HTMLElement {
  render() {
    return `
      <kakao-map
      center={{ lat: 36.2683, lng: 127.6358 }}
      style={{ width: "100%", height: "360px" }}
      level={14}
      >
        <kakao-map-marker-clusterer
          averageCenter={true}
          minLevel={10}
        >
          {clusterPositionsData.positions.map((pos) => (
            <kakao-map-marker
              key={`${pos.lat}-${pos.lng}`}
              position={pos}
            />
          ))}
        </kakao-map-marker-clusterer>
      </kakao-map>
    `;
  }

  connectedCallback() {
    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = this.render();
  }
}
```

## Working list

- [x] kakao-api-loader
- [ ] kakao-map
  - [ ] kakao-map-marker
  - [ ] kakao-map-info-window
  - [ ] kakao-map-custom-overlay
  - [ ] kakao-map-marker-clusterer
  - [ ] kakao-map-abstract-overlay
  - [ ] kakao-map-shape
    - [ ] kakao-map-circle
    - [ ] kakao-map-polyline
    - [ ] kakao-map-polygon
    - [ ] kakao-map-rectangle
    - [ ] kakao-map-ellipse
  - [ ] kakao-map-drawing-box
- [ ] kakao-map-roadview
  - [ ] kakao-map-roadview-marker
  - [ ] kakao-map-roadview-info-window
  - [ ] kakao-map-roadview-custom-overlay
- [ ] kakao-map-static
