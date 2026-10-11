import { describe, expect, it } from 'vitest';
import { PRACTITIONERS } from '@/data/practitioners';
import {
  DEFAULT_FILTERS,
  allCities,
  filterPractitioners,
  groupCitiesByCountry,
  parseFilters,
  serializeFilters,
} from '@/lib/directory';

describe('practitioner directory', () => {
  it('returns everyone with default filters', () => {
    expect(filterPractitioners(PRACTITIONERS, DEFAULT_FILTERS)).toHaveLength(PRACTITIONERS.length);
  });

  it('filters by city', () => {
    const res = filterPractitioners(PRACTITIONERS, { ...DEFAULT_FILTERS, city: 'Lahore' });
    expect(res.length).toBeGreaterThan(0);
    expect(res.every((p) => p.city === 'Lahore')).toBe(true);
  });

  it('filters by consultation method', () => {
    const res = filterPractitioners(PRACTITIONERS, { ...DEFAULT_FILTERS, method: 'remote' });
    expect(res.every((p) => p.methods.includes('remote'))).toBe(true);
  });

  it('combines city + method', () => {
    const res = filterPractitioners(PRACTITIONERS, { city: 'Berlin', method: 'remote', query: '' });
    expect(res.map((p) => p.id)).toEqual(['p-ber-01']);
  });

  it('searches specialties case- and accent-insensitively', () => {
    const res = filterPractitioners(PRACTITIONERS, { ...DEFAULT_FILTERS, query: 'MÜNICH' });
    expect(res.map((p) => p.id)).toEqual(['p-muc-01']);
    const res2 = filterPractitioners(PRACTITIONERS, { ...DEFAULT_FILTERS, query: 'uric' });
    expect(res2.map((p) => p.id)).toContain('p-ber-02');
  });

  it('parses and validates URL params', () => {
    const cities = allCities(PRACTITIONERS);
    expect(parseFilters({ city: 'Multan', method: 'remote', q: 'skin' }, cities)).toEqual({
      city: 'Multan',
      method: 'remote',
      query: 'skin',
    });
    expect(parseFilters({ city: 'Atlantis', method: 'carrier-pigeon' }, cities)).toEqual(DEFAULT_FILTERS);
  });

  it('round-trips through serialisation', () => {
    expect(serializeFilters({ city: 'Karachi', method: 'in-person', query: ' liver ' })).toBe(
      'city=Karachi&method=in-person&q=liver',
    );
    expect(serializeFilters(DEFAULT_FILTERS)).toBe('');
  });

  it('groups cities by country', () => {
    const groups = groupCitiesByCountry(PRACTITIONERS);
    expect(groups.map((g) => g.country)).toEqual(['Germany', 'Pakistan']);
  });
});
