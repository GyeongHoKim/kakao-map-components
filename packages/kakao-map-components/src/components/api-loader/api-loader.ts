import { Loader, LoaderOptions } from "@/util/loader";
import { html, LitElement, PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";

declare global {
  interface HTMLElementTagNameMap {
    "kakao-api-loader": KakaoApiLoader;
  }
}

/**
 * 카카오 맵 API 로더
 *
 * @property {string} appkey - 앱키
 * @property {LoaderOptions} options - 옵션
 *
 * @event kakao-api-loaded - 카카오 맵 API 로드 완료 이벤트
 * @event kakao-api-error - 카카오 맵 API 로드 에러 이벤트
 *
 * @slot - 로드 완료 시 노출할 슬롯
 * @slot error - 로드 에러 시 노출할 슬롯
 * @slot loading - 로드 중 노출할 슬롯
 */
@customElement("kakao-api-loader")
export class KakaoApiLoader extends LitElement {
  private static instance?: KakaoApiLoader;

  @property({ type: String })
  appkey?: string;

  @property({ type: Object })
  options: LoaderOptions = {
    appkey: "",
  };

  @state()
  loading: boolean = true;

  @state()
  error: ErrorEvent | undefined;

  override connectedCallback(): void {
    super.connectedCallback();
    if (KakaoApiLoader.instance) {
      console.warn(
        "Found multiple instances of this element on the same page. The Kakao Maps JavaScript API can only be configured once. Please ensure you only have a single instance."
      );
    } else {
      KakaoApiLoader.instance = this;
    }
  }

  protected willUpdate(_changedProperties: PropertyValues): void {
    super.willUpdate(_changedProperties);
    if (_changedProperties.has("appkey") && this.appkey) {
      this.options.appkey = this.appkey;
    }
  }

  protected override updated(_changedProperties: PropertyValues): void {
    super.updated(_changedProperties);
    if (_changedProperties.has("options") && this.options) {
      new Loader({
        ...this.options,
      })
        .load()
        .then(() => {
          this.loading = false;
        })
        .catch((error) => {
          this.error = error;
        });
    }
    if (_changedProperties.has("loading") && !this.loading) {
      this.dispatchEvent(new CustomEvent("kakao-api-loaded"));
    }
    if (_changedProperties.has("error") && this.error) {
      this.dispatchEvent(new CustomEvent("kakao-api-error", { detail: this.error }));
    }
  }

  override render(): unknown {
    if (!this.loading) {
      return html`<slot></slot>`;
    }
    if (this.error) {
      return html`<slot name="error"></slot>`;
    }
    return html`<slot name="loading"></slot>`;
  }
}
