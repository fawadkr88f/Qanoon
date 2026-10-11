import { groupCitiesByCountry } from '@/lib/directory';
import type { DirectoryFilters, MethodFilter } from '@/lib/directory';
import type { PractitionerProfile } from '@/types/practitioner';

interface DirectoryFiltersProps {
  readonly filters: DirectoryFilters;
  readonly practitioners: readonly PractitionerProfile[];
  readonly onFilterChange: (updated: Partial<DirectoryFilters>) => void;
}

export function DirectoryFiltersBar({
  filters,
  practitioners,
  onFilterChange,
}: DirectoryFiltersProps) {
  const cityGroups = groupCitiesByCountry(practitioners);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
      <div className="grid gap-4 sm:grid-cols-3">
        {/* Search Query */}
        <div className="space-y-1.5">
          <label htmlFor="search-practitioners" className="text-xs font-semibold text-slate-700">
            Search Keyword / Specialty
          </label>
          <input
            id="search-practitioners"
            type="text"
            value={filters.query}
            onChange={(e) => onFilterChange({ query: e.target.value })}
            placeholder="e.g. digestive, uric, Lahore..."
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
        </div>

        {/* City Filter */}
        <div className="space-y-1.5">
          <label htmlFor="city-filter" className="text-xs font-semibold text-slate-700">
            Filter by City
          </label>
          <select
            id="city-filter"
            value={filters.city}
            onChange={(e) => onFilterChange({ city: e.target.value })}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          >
            <option value="all">All Cities</option>
            {cityGroups.map((group) => (
              <optgroup key={group.country} label={group.country}>
                {group.cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        {/* Consultation Method Filter */}
        <div className="space-y-1.5">
          <label htmlFor="method-filter" className="text-xs font-semibold text-slate-700">
            Consultation Method
          </label>
          <select
            id="method-filter"
            value={filters.method}
            onChange={(e) => onFilterChange({ method: e.target.value as MethodFilter })}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          >
            <option value="all">All Methods</option>
            <option value="in-person">In-Person Clinic</option>
            <option value="remote">Remote / Video Consult</option>
          </select>
        </div>
      </div>
    </div>
  );
}
