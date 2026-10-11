import type { ConsultationMethod, PractitionerProfile } from '@/types/practitioner';

export type MethodFilter = 'all' | ConsultationMethod;

export interface DirectoryFilters {
  /** City name or "all". */
  readonly city: string;
  readonly method: MethodFilter;
  readonly query: string;
}

export const DEFAULT_FILTERS: DirectoryFilters = { city: 'all', method: 'all', query: '' };

export const METHOD_LABELS: Readonly<Record<ConsultationMethod, string>> = {
  'in-person': 'In-person',
  remote: 'Remote / video',
};

type SearchParams = Readonly<Record<string, string | string[] | undefined>>;

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

/** Parses and validates URL search params against known values. */
export function parseFilters(params: SearchParams, knownCities: readonly string[]): DirectoryFilters {
  const city = first(params.city);
  const method = first(params.method);
  const query = first(params.q)?.slice(0, 80) ?? '';
  return {
    city: city && knownCities.includes(city) ? city : 'all',
    method: method === 'in-person' || method === 'remote' ? method : 'all',
    query,
  };
}

export function serializeFilters(filters: DirectoryFilters): string {
  const params = new URLSearchParams();
  if (filters.city !== 'all') params.set('city', filters.city);
  if (filters.method !== 'all') params.set('method', filters.method);
  if (filters.query.trim()) params.set('q', filters.query.trim());
  return params.toString();
}

function normalise(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

export function filterPractitioners(
  list: readonly PractitionerProfile[],
  { city, method, query }: DirectoryFilters,
): PractitionerProfile[] {
  const q = normalise(query.trim());
  return list
    .filter((p) => city === 'all' || p.city === city)
    .filter((p) => method === 'all' || p.methods.includes(method))
    .filter((p) => {
      if (!q) return true;
      const haystack = normalise(
        [p.name, p.clinicName, p.city, ...p.specialties, ...p.languages].join(' '),
      );
      return haystack.includes(q);
    })
    .sort((a, b) => a.city.localeCompare(b.city) || a.name.localeCompare(b.name));
}

export interface CityGroup {
  readonly country: string;
  readonly cities: readonly string[];
}

export function groupCitiesByCountry(list: readonly PractitionerProfile[]): CityGroup[] {
  const map = new Map<string, Set<string>>();
  for (const p of list) {
    const set = map.get(p.country) ?? new Set<string>();
    set.add(p.city);
    map.set(p.country, set);
  }
  return [...map.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([country, cities]) => ({ country, cities: [...cities].sort((a, b) => a.localeCompare(b)) }));
}

export function allCities(list: readonly PractitionerProfile[]): string[] {
  return [...new Set(list.map((p) => p.city))];
}
