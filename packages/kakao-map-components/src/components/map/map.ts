import { mapContext } from "@/context";
import { SIGNATURE } from "@/util/constants";
import { Loader } from "@/util/loader";
import { provide } from "@lit/context";
import { LitElement, PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";

/**
 * 카카오 지도 컴포넌트
 * 
 * @property {LatLng | Point} center - 지도의 중심 좌표
 * @property {number} level - 지도의 확대 수준 (기본값: 3)
 * @property {number} maxLevel - 지도의 최대 확대 수준
 * @property {number} minLevel - 지도의 최소 확대 수준
 * @property {kakao.maps.MapTypeId} mapTypeId - 지도 종류 (기본값: 일반 지도)
 * @property {string} projectionId - 투영법 지정 (기본값: kakao.maps.ProjectionId.WCONG)
 * @property {boolean} draggable - 마우스 드래그, 휠, 모바일 터치를 이용한 시점 변경(이동, 확대, 축소) 가능 여부
 * @property {boolean} zoomable - 마우스 휠이나 멀티터치로 지도 확대, 축소 기능을 막습니다
 * @property {boolean} scrollwheel - 마우스 휠, 모바일 터치를 이용한 확대 및 축소 가능 여부
 * @property {boolean} disableDoubleClick - 더블클릭 이벤트 및 더블클릭 확대 가능 여부
 * @property {boolean} disableDoubleClickZoom - 더블클릭 확대 가능 여부
 * @property {boolean} tileAnimation - 지도 타일 애니메이션 설정 여부 (기본값: true)
 * @property {boolean} isPanto - 중심을 이동시킬 때 Panto를 사용할것인지 (기본값: false)
 * @property {boolean} keyboardShortcuts - 키보드의 방향키와 +, – 키로 지도 이동,확대,축소 가능 여부 (기본값: false)
 * @property {number} padding - 중심 좌표를 지정한 좌표 또는 영역으로 부드럽게 이동할 때의 padding (기본값: 32)
 * 
 * @fires map-created - map 생성 후 발생한다, 매개변수로 map 인스턴스를 전달한다.
 * @fires center-changed - 중심 좌표가 변경되면 발생한다.
 * @fires zoom-start - 확대 수준이 변경되기 직전 발생한다.
 * @fires zoom-changed - 확대 수준이 변경되면 발생한다.
 * @fires bounds-changed - 지도 영역이 변경되면 발생한다.
 * @fires click - 지도를 클릭하면 발생한다.
 * @fires dblclick - 지도를 더블클릭하면 발생한다.
 * @fires rightclick - 지도를 마우스 오른쪽 버튼으로 클릭하면 발생한다.
 * @fires mousemove - 지도에서 마우스를 움직이면 발생한다.
 * @fires dragstart - 드래그를 시작할 때 발생한다.
 * @fires drag - 드래그를 하는 동안 발생한다.
 * @fires dragend - 드래그가 끝날 때 발생한다.
 * @fires idle - 중심 좌표나 확대 수준이 변경되면 발생한다. 단, 애니메이션 도중에는 발생하지 않는다.
 * @fires tilesloaded - 확대수준 변경 및 지도 이동 등의 이벤트 후 타일 로드가 완료되면 발생한다.
 * @fires maptypeid-changed - 지도 타입이 변경되면 발생한다.
 */
@customElement('kakao-map')
export class KakaoMap extends LitElement {
  @provide({ context: mapContext })
  @state()
  private _map?: kakao.maps.Map;

  @property({ type: Object })
  center?: LatLng | Point;

  @property({ type: Number })
  level: number = 3;

  @property({ type: Number })
  maxLevel?: number;

  @property({ type: Number })
  minLevel?: number;

  @property({ type: String })
  mapTypeId?: kakao.maps.MapTypeId;

  @property({ type: String })
  projectionId?: string;

  @property({ type: Boolean })
  draggable: boolean = true;

  @property({ type: Boolean })
  zoomable: boolean = true;

  @property({ type: Boolean })
  scrollwheel: boolean = true;

  @property({ type: Boolean })
  disableDoubleClick: boolean = false;

  @property({ type: Boolean })
  disableDoubleClickZoom: boolean = false;

  @property({ type: Boolean })
  tileAnimation: boolean = true;

  @property({ type: Boolean })
  isPanto: boolean = false;

  @property({ type: Boolean })
  keyboardShortcuts: boolean = false;

  @property({ type: Number })
  padding: number = 32;

  @state()
  private _container: HTMLDivElement | null = null;

  private _loadCallback: ((err?: Event | string) => void) | null = null;
  private _eventListeners: Map<string, (e?: any) => void> = new Map();

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this._container = document.createElement('div');
    this._container.id = `${SIGNATURE}_Map_Container`;
    this._container.style.width = '100%';
    this._container.style.height = '100%';
    this.appendChild(this._container);

    if (window.kakao && window.kakao.maps) {
      this._initializeMap();
    } else {
      const apiLoader = this.closest('kakao-api-loader');
      if (apiLoader) {
        apiLoader.addEventListener('kakao-api-loaded', () => {
          if (window.kakao && window.kakao.maps) {
            this._initializeMap();
          }
        }, { once: true });
      } else {
        throw new Error('Kakao Maps API is not loaded');
      }
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._removeEventListeners();

    if (this._loadCallback) {
      Loader.removeLoadEventLisnter(this._loadCallback);
      this._loadCallback = null;
    }

    if (this._container) {
      this._container.innerHTML = '';
      if (this._container.parentNode === this) {
        this.removeChild(this._container);
      }
      this._container = null;
    }

    this._map = undefined;
  }

  updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);

    if (!this._map) return;

    if (changedProperties.has('center') && this.center) {
      this._updateCenter();
    }

    if (changedProperties.has('level') && this.level !== undefined) {
      this._map.setLevel(this.level);
    }

    if (changedProperties.has('maxLevel') && this.maxLevel !== undefined) {
      this._map.setMaxLevel(this.maxLevel);
    }

    if (changedProperties.has('minLevel') && this.minLevel !== undefined) {
      this._map.setMinLevel(this.minLevel);
    }

    if (changedProperties.has('mapTypeId') && this.mapTypeId !== undefined) {
      this._map.setMapTypeId(this.mapTypeId);
    }

    if (changedProperties.has('draggable') && this.draggable !== undefined) {
      this._map.setDraggable(this.draggable);
    }

    if (changedProperties.has('zoomable') && this.zoomable !== undefined) {
      this._map.setZoomable(this.zoomable);
    }

    if (changedProperties.has('keyboardShortcuts') && this.keyboardShortcuts !== undefined) {
      this._map.setKeyboardShortcuts(this.keyboardShortcuts);
    }
  }

  private _initializeMap() {
    if (!this._container) {
      throw new Error('Map container is not found');
    }

    const initialCenter = this._getLatLngFromCenter();
    if (!initialCenter) {
      throw new Error('Initial center is not found');
    }

    const options: kakao.maps.MapOptions = {
      center: initialCenter,
      level: this.level,
      mapTypeId: this.mapTypeId,
      draggable: this.draggable,
      scrollwheel: this.scrollwheel,
      disableDoubleClick: this.disableDoubleClick,
      disableDoubleClickZoom: this.disableDoubleClickZoom,
      projectionId: this.projectionId,
      tileAnimation: this.tileAnimation,
      keyboardShortcuts: this.keyboardShortcuts
    };

    this._map = new kakao.maps.Map(this._container, options);

    if (this.maxLevel !== undefined) this._map.setMaxLevel(this.maxLevel);
    if (this.minLevel !== undefined) this._map.setMinLevel(this.minLevel);

    this._setupEventListeners();

    this.dispatchEvent(new CustomEvent('map-created', {
      detail: { map: this._map },
      bubbles: true,
      composed: true
    }));
  }

  private _getLatLngFromCenter(): kakao.maps.LatLng | null {
    if (!this.center) return null;

    if ('lat' in this.center) {
      return new kakao.maps.LatLng(this.center.lat, this.center.lng);
    } else if ('x' in this.center) {
      return new kakao.maps.Coords(this.center.x, this.center.y).toLatLng();
    }

    return null;
  }

  private _updateCenter() {
    if (!this._map || !this.center) return;

    const newCenter = this._getLatLngFromCenter();
    if (!newCenter) return;

    if (this.isPanto) {
      this._map.panTo(newCenter, this.padding);
    } else {
      this._map.setCenter(newCenter);
    }
  }

  private _setupEventListeners() {
    if (!this._map) return;

    this._addEventListeners('bounds_changed', () => {
      this.dispatchEvent(new CustomEvent('bounds-changed', {
        detail: { target: this._map },
        bubbles: true,
        composed: true
      }));
    });

    this._addEventListeners('center_changed', () => {
      this.dispatchEvent(new CustomEvent('center-changed', {
        detail: { target: this._map },
        bubbles: true,
        composed: true
      }));
    });

    this._addEventListeners('click', (mouseEvent: kakao.maps.event.MouseEvent) => {
      this.dispatchEvent(new CustomEvent('click', {
        detail: { target: this._map, mouseEvent },
        bubbles: true,
        composed: true
      }));
    });

    this._addEventListeners('dblclick', (mouseEvent: kakao.maps.event.MouseEvent) => {
      this.dispatchEvent(new CustomEvent('dblclick', {
        detail: { target: this._map, mouseEvent },
        bubbles: true,
        composed: true
      }));
    });

    this._addEventListeners('rightclick', (mouseEvent: kakao.maps.event.MouseEvent) => {
      this.dispatchEvent(new CustomEvent('rightclick', {
        detail: { target: this._map, mouseEvent },
        bubbles: true,
        composed: true
      }));
    });

    this._addEventListeners('mousemove', (mouseEvent: kakao.maps.event.MouseEvent) => {
      this.dispatchEvent(new CustomEvent('mousemove', {
        detail: { target: this._map, mouseEvent },
        bubbles: true,
        composed: true
      }));
    });

    this._addEventListeners('dragstart', (mouseEvent: kakao.maps.event.MouseEvent) => {
      this.dispatchEvent(new CustomEvent('dragstart', {
        detail: { target: this._map, mouseEvent },
        bubbles: true,
        composed: true
      }));
    });

    this._addEventListeners('drag', (mouseEvent: kakao.maps.event.MouseEvent) => {
      this.dispatchEvent(new CustomEvent('drag', {
        detail: { target: this._map, mouseEvent },
        bubbles: true,
        composed: true
      }));
    });

    this._addEventListeners('dragend', (mouseEvent: kakao.maps.event.MouseEvent) => {
      this.dispatchEvent(new CustomEvent('dragend', {
        detail: { target: this._map, mouseEvent },
        bubbles: true,
        composed: true
      }));
    });

    this._addEventListeners('zoom_start', () => {
      this.dispatchEvent(new CustomEvent('zoom-start', {
        detail: { target: this._map },
        bubbles: true,
        composed: true
      }));
    });

    this._addEventListeners('zoom_changed', () => {
      this.dispatchEvent(new CustomEvent('zoom-changed', {
        detail: { target: this._map },
        bubbles: true,
        composed: true
      }));
    });

    this._addEventListeners('idle', () => {
      this.dispatchEvent(new CustomEvent('idle', {
        detail: { target: this._map },
        bubbles: true,
        composed: true
      }));
    });

    this._addEventListeners('tilesloaded', () => {
      this.dispatchEvent(new CustomEvent('tilesloaded', {
        detail: { target: this._map },
        bubbles: true,
        composed: true
      }));
    });

    this._addEventListeners('maptypeid_changed', () => {
      this.dispatchEvent(new CustomEvent('maptypeid-changed', {
        detail: { target: this._map },
        bubbles: true,
        composed: true
      }));
    });
  }

  private _addEventListeners(type: string, handler: Function) {
    if (!this._map) return;

    kakao.maps.event.addListener(this._map, type, handler as any);
    this._eventListeners.set(type, handler as any);
  }

  private _removeEventListeners() {
    if (!this._map) return;

    this._eventListeners.forEach((handler, type) => {
      kakao.maps.event.removeListener(this._map!, type, handler);
    });

    this._eventListeners.clear();
  }

  getMap(): kakao.maps.Map | undefined {
    return this._map;
  }

  setCenter(center: LatLng | Point): void {
    this.center = center;
    this._updateCenter();
  }

  setLevel(level: number): void {
    this.level = level;
    if (this._map) {
      this._map.setLevel(level);
    }
  }
}
