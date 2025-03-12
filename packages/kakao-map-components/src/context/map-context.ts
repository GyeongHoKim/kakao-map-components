import { createContext } from '@lit/context';

export const mapContext = createContext<kakao.maps.Map>('map');
export type MapContext = typeof mapContext;
