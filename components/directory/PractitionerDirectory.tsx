'use client';

import { useMemo, useState } from 'react';
import { PRACTITIONERS } from '@/data/practitioners';
import { filterPractitioners, DEFAULT_FILTERS } from '@/lib/directory';
import { DirectoryFiltersBar } from '@/components/directory/DirectoryFilters';
import { PractitionerCard } from '@/components/directory/PractitionerCard';
import type { DirectoryFilters } from '@/lib/directory';

export function PractitionerDirectory() {
  const [filters, setFilters] = useState<DirectoryFilters>(DEFAULT_FILTERS);

  const filteredList = useMemo(() => {
    return filterPractitioners(PRACTITIONERS, filters);
  }, [filters]);

  const handleFilterChange = (updated: Partial<DirectoryFilters>) => {
    setFilters((prev) => ({ ...prev, ...updated }));
  };

  return (
    <div className="space-y-8">
      <DirectoryFiltersBar
        filters={filters}
        practitioners={PRACTITIONERS}
        onFilterChange={handleFilterChange}
      />

      <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-1">
        <span>
          Showing <strong>{filteredList.length}</strong> verified practitioner{filteredList.length === 1 ? '' : 's'}
        </span>
        {(filters.city !== 'all' || filters.method !== 'all' || filters.query !== '') && (
          <button
            type="button"
            onClick={() => setFilters(DEFAULT_FILTERS)}
            className="text-brand-700 hover:underline"
          >
            Reset Filters
          </button>
        )}
      </div>

      {filteredList.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredList.map((practitioner) => (
            <PractitionerCard key={practitioner.id} practitioner={practitioner} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center">
          <p className="text-sm font-semibold text-slate-700">No practitioners found</p>
          <p className="mt-1 text-xs text-slate-500">
            Try adjusting your search criteria or resetting filters to see all available listings.
          </p>
        </div>
      )}
    </div>
  );
}
