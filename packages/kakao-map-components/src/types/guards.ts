/**
 * type guard for LatLng
 */
export function isLatLng(value: any): value is LatLng {
  return value &&
    'lat' in value &&
    'lng' in value &&
    typeof value.lat === 'number' &&
    typeof value.lng === 'number';
}

/**
 * type guard for Point
 */
export function isPoint(value: any): value is Point {
  return value &&
    'x' in value &&
    'y' in value &&
    typeof value.x === 'number' &&
    typeof value.y === 'number';
}