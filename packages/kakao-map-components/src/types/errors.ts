/**
 * 카카오맵 컴포넌트의 기본 에러 클래스입니다.
 * 모든 카카오맵 관련 에러의 기본이 되는 클래스입니다.
 * 
 * @class
 * @extends {Error}
 */
export class KakaoMapError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'KakaoMapError';
  }
}

/**
 * 카카오맵 에러 이벤트의 상세 정보를 정의하는 인터페이스입니다.
 * 
 * @interface
 * @property {KakaoMapError} error - 발생한 에러 객체
 * @property {HTMLElement} target - 에러가 발생한 컴포넌트
 */
export interface KakaoMapErrorEventDetail {
  /** 발생한 에러 객체 */
  error: KakaoMapError;
  /** 에러가 발생한 컴포넌트 */
  target: HTMLElement;
}

/**
 * 카카오맵 에러 이벤트 타입을 정의하는 타입입니다.
 * 
 * @typedef {CustomEvent<KakaoMapErrorEventDetail>} KakaoMapErrorEvent
 */
export type KakaoMapErrorEvent = CustomEvent<KakaoMapErrorEventDetail>;

/**
 * 카카오맵 API 로딩 관련 에러 클래스입니다.
 * API가 정상적으로 로드되지 않았거나, kakao-api-loader가 없는 경우 발생합니다.
 * 
 * @class
 * @extends {KakaoMapError}
 */
export class KakaoMapAPIError extends KakaoMapError {
  constructor(message: string = 'Kakao Maps API is not loaded') {
    super(message);
    this.name = 'KakaoMapAPIError';
  }
}

/**
 * 카카오맵 컨테이너 초기화 관련 에러 클래스입니다.
 * 맵을 렌더링할 DOM 컨테이너가 없거나 초기화에 실패한 경우 발생합니다.
 * 
 * @class
 * @extends {KakaoMapError}
 */
export class KakaoMapContainerError extends KakaoMapError {
  constructor(message: string = 'Map container is not found') {
    super(message);
    this.name = 'KakaoMapContainerError';
  }
}

/**
 * 카카오맵 옵션 관련 에러 클래스입니다.
 * 맵 생성 시 필요한 옵션이 잘못되었거나 누락된 경우 발생합니다.
 * 예를 들어, center 좌표가 잘못되었거나 필수 옵션이 누락된 경우 발생합니다.
 * 
 * @class
 * @extends {KakaoMapError}
 */
export class KakaoMapOptionsError extends KakaoMapError {
  constructor(message: string = 'Invalid map options provided') {
    super(message);
    this.name = 'KakaoMapOptionsError';
  }
}