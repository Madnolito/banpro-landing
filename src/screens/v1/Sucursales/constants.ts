import { type Dot } from './CountryMap';

// ── Types ──────────────────────────────────────────────
export interface Sucursal {
  id: string;
  name: string;
  zone: string;
  address: string;
  phone: string;
  /** SVG coordinate space — viewBox 0 0 1000 1000 */
  svgX: number;
  svgY: number;
}

export type SubGroup  = { label: string; cities: Sucursal[] };
export type ZoneGroup = { zone: string; subGroups: SubGroup[] };

// ── Chile branches ─────────────────────────────────────
// svgX/Y mapped from real lat/lng to the Simplemaps 1000×1000 SVG projection
export const SUCURSALES_CL: Sucursal[] = [
  // ── NORTE
  { id: 'iquique',     name: 'Iquique',      zone: 'Norte',  svgX: 526, svgY: 137, address: 'Av. Test 1823, Of. 201', phone: '+56 57 2 123 456' },
  { id: 'antofagasta', name: 'Antofagasta',  zone: 'Norte',  svgX: 520, svgY: 216, address: 'Av. Test 1823, Of. 201', phone: '+56 55 2 123 456' },
  { id: 'laserena',    name: 'La Serena',    zone: 'Norte',  svgX: 501, svgY: 359, address: 'Av. Test 1823, Of. 201', phone: '+56 51 2 123 456' },
  // ── CENTRO
  { id: 'losandes',    name: 'Los Andes',    zone: 'Centro', svgX: 516, svgY: 426, address: 'Av. Test 1823, Of. 201', phone: '+56 34 2 123 456' },
  { id: 'talca',       name: 'Talca',        zone: 'Centro', svgX: 492, svgY: 485, address: 'Av. Test 1823, Of. 201', phone: '+56 71 2 123 456' },
  { id: 'chillan',     name: 'Chillán',      zone: 'Centro', svgX: 481, svgY: 512, address: 'Av. Test 1823, Of. 201', phone: '+56 42 2 123 456' },
  { id: 'concepcion',  name: 'Concepción',   zone: 'Centro', svgX: 460, svgY: 517, address: 'Av. Test 1823, Of. 201', phone: '+56 41 2 123 456' },
  { id: 'losangeles',  name: 'Los Ángeles',  zone: 'Centro', svgX: 476, svgY: 532, address: 'Av. Test 1823, Of. 201', phone: '+56 43 2 123 456' },
  // ── SUR
  { id: 'osorno',      name: 'Osorno',       zone: 'Sur',    svgX: 464, svgY: 594, address: 'Av. Test 1823, Of. 201', phone: '+56 64 2 123 456' },
  { id: 'puertomontt', name: 'Puerto Montt', zone: 'Sur',    svgX: 469, svgY: 604, address: 'Av. Test 1823, Of. 201', phone: '+56 65 2 123 456' },
  { id: 'puntaarenas', name: 'Punta Arenas', zone: 'Sur',    svgX: 509, svgY: 891, address: 'Av. Test 1823, Of. 201', phone: '+56 61 2 123 456' },
];

// ── Peru branches ──────────────────────────────────────
export const SUCURSALES_PE: Sucursal[] = [
  // ── NORTE
  { id: 'piura',      name: 'Piura',      zone: 'Norte',  svgX: 355, svgY: 195, address: 'Urb. San Eduardo Mz. A Lote 2A, Of. 07, Cámara de Comercio de Piura', phone: '+51 946 113 715' },
  { id: 'trujillo',   name: 'Trujillo',   zone: 'Norte',  svgX: 400, svgY: 335, address: 'Av. España 305, Of. 403, La Libertad',                                phone: '+51 946 101 964' },
  // ── CENTRO
  { id: 'lima',       name: 'Lima',       zone: 'Centro', svgX: 432, svgY: 495, address: 'Av. Javier Prado Este 492, Of. 603, San Isidro',                      phone: '+51 905 479 966' },
  { id: 'lima-norte', name: 'Lima Norte', zone: 'Centro', svgX: 422, svgY: 487, address: 'Jr. Saturno 106 Urb. Sol de Oro, Of. 205, Los Olivos',                phone: '+51 908 841 276' },
  // ── SUR
  { id: 'arequipa',   name: 'Arequipa',   zone: 'Sur',    svgX: 590, svgY: 720, address: 'Av. Trinidad Morán H-14, Edif. San Miguel Of. 302, Cayma',            phone: '+51 946 135 143' },
];

// ── Dots for SVG overlay ───────────────────────────────
export const DOTS_CL: Dot[] = SUCURSALES_CL.map(({ id, svgX, svgY }) => ({ id, svgX, svgY }));
export const DOTS_PE: Dot[] = SUCURSALES_PE.map(({ id, svgX, svgY }) => ({ id, svgX, svgY }));

// ── Sidebar grouping helpers ───────────────────────────
function buildSidebarGroups(
  sucursales: Sucursal[],
  zones: readonly string[],
  sublabels: Record<string, Record<string, string>>,
): ZoneGroup[] {
  return zones
    .filter(zone => sucursales.some(s => s.zone === zone))
    .map(zone => {
      const grouped: Record<string, Sucursal[]> = {};
      for (const city of sucursales.filter(s => s.zone === zone)) {
        const label = sublabels[zone]?.[city.name] ?? zone;
        if (!grouped[label]) grouped[label] = [];
        grouped[label].push(city);
      }
      return {
        zone,
        subGroups: Object.entries(grouped).map(([label, cities]) => ({ label, cities })),
      };
    });
}

const ZONES_CL = ['Norte', 'Centro', 'Sur'] as const;
const ZONE_SUBLABELS_CL: Record<string, Record<string, string>> = {
  Norte:  { Iquique: 'Norte Grande', Antofagasta: 'Norte Grande', 'La Serena': 'Norte Chico' },
  Centro: { 'Los Andes': 'Zona Central', Talca: 'Zona Central', Chillán: 'Zona Central', Concepción: 'Zona Central', 'Los Ángeles': 'Zona Central' },
  Sur:    { Osorno: 'Zona Sur', 'Puerto Montt': 'Zona Sur', 'Punta Arenas': 'Patagonia' },
};

const ZONES_PE = ['Norte', 'Centro', 'Sur'] as const;
const ZONE_SUBLABELS_PE: Record<string, Record<string, string>> = {
  Norte:  { Piura: 'Costa Norte', Trujillo: 'Costa Norte' },
  Centro: { Lima: 'Costa Central', 'Lima Norte': 'Costa Central' },
  Sur:    { Arequipa: 'Sur Andino' },
};

export const SIDEBAR_GROUPS_CL: ZoneGroup[] = buildSidebarGroups(SUCURSALES_CL, ZONES_CL, ZONE_SUBLABELS_CL);
export const SIDEBAR_GROUPS_PE: ZoneGroup[] = buildSidebarGroups(SUCURSALES_PE, ZONES_PE, ZONE_SUBLABELS_PE);
