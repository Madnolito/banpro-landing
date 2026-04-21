import { type Dot } from './ChileMap';

// ── Types ──────────────────────────────────────────────
export interface Sucursal {
  id: string;
  name: string;
  zone: 'Norte' | 'Centro' | 'Sur';
  address: string;
  phone: string;
  /** SVG coordinate space — viewBox 0 0 1000 1000 */
  svgX: number;
  svgY: number;
}

export type SubGroup  = { label: string; cities: Sucursal[] };
export type ZoneGroup = { zone: string; subGroups: SubGroup[] };

// ── Branches ───────────────────────────────────────────
// svgX/Y mapped from real lat/lng to the Simplemaps 1000×1000 SVG projection
export const SUCURSALES: Sucursal[] = [
  // ── NORTE
  { id: 'iquique',     name: 'Iquique',     zone: 'Norte',  svgX: 526, svgY: 137, address: 'Av. Test 1823, Of. 201',        phone: '+56 57 2 123 456' },
  { id: 'antofagasta', name: 'Antofagasta', zone: 'Norte',  svgX: 520, svgY: 216, address: 'Av. Test 1823, Of. 201',        phone: '+56 55 2 123 456' },
  { id: 'laserena',    name: 'La Serena',   zone: 'Norte',  svgX: 501, svgY: 359, address: 'Av. Test 1823, Of. 201',        phone: '+56 51 2 123 456' },
  // ── CENTRO
  { id: 'losandes',    name: 'Los Andes',   zone: 'Centro', svgX: 516, svgY: 426, address: 'Av. Test 1823, Of. 201',        phone: '+56 34 2 123 456' },
  { id: 'talca',       name: 'Talca',       zone: 'Centro', svgX: 492, svgY: 485, address: 'Av. Test 1823, Of. 201',        phone: '+56 71 2 123 456' },
  { id: 'chillan',     name: 'Chillán',     zone: 'Centro', svgX: 481, svgY: 512, address: 'Av. Test 1823, Of. 201',        phone: '+56 42 2 123 456' },
  { id: 'concepcion',  name: 'Concepción',  zone: 'Centro', svgX: 460, svgY: 517, address: 'Av. Test 1823, Of. 201',        phone: '+56 41 2 123 456' },
  { id: 'losangeles',  name: 'Los Ángeles', zone: 'Centro', svgX: 476, svgY: 532, address: 'Av. Test 1823, Of. 201',        phone: '+56 43 2 123 456' },
  // ── SUR
  { id: 'osorno',      name: 'Osorno',      zone: 'Sur',    svgX: 464, svgY: 594, address: 'Av. Test 1823, Of. 201',        phone: '+56 64 2 123 456' },
  { id: 'puertomontt', name: 'Puerto Montt',zone: 'Sur',    svgX: 469, svgY: 604, address: 'Av. Test 1823, Of. 201',        phone: '+56 65 2 123 456' },
  { id: 'puntaarenas', name: 'Punta Arenas',zone: 'Sur',    svgX: 509, svgY: 891, address: 'Av. Test 1823, Of. 201',        phone: '+56 61 2 123 456' },
];

export const ZONES = ['Norte', 'Centro', 'Sur'] as const;

// Maps city name → sidebar sub-group label
export const ZONE_SUBLABELS: Record<string, Record<string, string>> = {
  Norte:  { Iquique: 'Norte Grande', Antofagasta: 'Norte Grande', 'La Serena': 'Norte Chico' },
  Centro: { 'Los Andes': 'Zona Central', Talca: 'Zona Central', Chillán: 'Zona Central', Concepción: 'Zona Central', 'Los Ángeles': 'Zona Central' },
  Sur:    { Osorno: 'Zona Sur', 'Puerto Montt': 'Zona Sur', 'Punta Arenas': 'Patagonia' },
};

// Dots for the SVG overlay — derived from SUCURSALES
export const DOTS: Dot[] = SUCURSALES.map(({ id, svgX, svgY }) => ({ id, svgX, svgY }));

// Sidebar list pre-grouped — computed once at module load
export const SIDEBAR_GROUPS: ZoneGroup[] = ZONES.map(zone => {
  const grouped: Record<string, Sucursal[]> = {};
  for (const city of SUCURSALES.filter(s => s.zone === zone)) {
    const label = ZONE_SUBLABELS[zone][city.name] ?? zone;
    if (!grouped[label]) grouped[label] = [];
    grouped[label].push(city);
  }
  return {
    zone,
    subGroups: Object.entries(grouped).map(([label, cities]) => ({ label, cities })),
  };
});
