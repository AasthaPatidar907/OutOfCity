import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { HOSTELS, ALL_AMENITIES, LOCALITIES, CATEGORIES } from "@/data/hostels";
import type { Category } from "@/types";
import HostelCard from "@/components/HostelCard";
import DemoBanner from "@/components/DemoBanner";
import { formatINR } from "@/lib/storage";

type SortKey = "rent-asc" | "rent-desc" | "rating";

export default function Explore() {
  const [params, setParams] = useSearchParams();

  const [locality, setLocality] = useState(params.get("locality") ?? "");
  const [maxRent, setMaxRent] = useState(params.get("max") ?? "");
  const [category, setCategory] = useState((params.get("category") as Category | "") ?? "");
  const [search, setSearch] = useState("");
  const [amenities, setAmenities] = useState<string[]>([]);
  const [sort, setSort] = useState<SortKey>("rent-asc");

  // sync URL -> state when navigating from Home search card
  useEffect(() => {
    setLocality(params.get("locality") ?? "");
    setMaxRent(params.get("max") ?? "");
    setCategory((params.get("category") as Category | "") ?? "");
  }, [params]);

  // sync state -> URL so filters are shareable & survive refresh
  useEffect(() => {
    const next: Record<string, string> = {};
    if (locality) next.locality = locality;
    if (maxRent) next.max = maxRent;
    if (category) next.category = category;
    setParams(next, { replace: true });
  }, [locality, maxRent, category, setParams]);

  const toggleAmenity = (a: string) =>
    setAmenities((prev) => (prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]));

  const clearAll = () => {
    setLocality("");
    setMaxRent("");
    setCategory("");
    setSearch("");
    setAmenities([]);
    setSort("rent-asc");
    setParams({}, { replace: true });
  };

  const filtered = useMemo(() => {
    let list = HOSTELS.filter((h) => {
      if (locality && h.locality !== locality) return false;
      if (maxRent && h.rent > Number(maxRent)) return false;
      if (category && h.category !== category) return false;
      if (search && !h.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (amenities.length > 0 && !amenities.every((a) => h.amenities.includes(a))) return false;
      return true;
    });
    list = [...list].sort((a, b) => {
      if (sort === "rent-asc") return a.rent - b.rent;
      if (sort === "rent-desc") return b.rent - a.rent;
      return b.rating - a.rating;
    });
    return list;
  }, [locality, maxRent, category, search, amenities, sort]);

  const activeCount =
    (locality ? 1 : 0) + (maxRent ? 1 : 0) + (category ? 1 : 0) + amenities.length + (search ? 1 : 0);

  return (
    <div className="container-app py-8">
      <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-slate-900">Explore hostels</h1>
          <p className="text-slate-500 mt-1">Filter by locality, budget, category and amenities.</p>
        </div>
        <DemoBanner />
      </div>

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        {/* Filters */}
        <aside className="card p-5 h-fit lg:sticky lg:top-20">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-slate-900 flex items-center gap-2">
              <SlidersHorizontal size={18} /> Filters
            </h2>
            {activeCount > 0 && (
              <button onClick={clearAll} className="text-xs font-medium text-brand-700 hover:text-brand-800 inline-flex items-center gap-1">
                <X size={13} /> Clear ({activeCount})
              </button>
            )}
          </div>

          <div className="space-y-5">
            <div>
              <label className="label" htmlFor="search">Search by name</label>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="e.g. Sunrise"
                  className="input pl-9"
                />
              </div>
            </div>

            <div>
              <label className="label" htmlFor="locality">Locality</label>
              <select id="locality" value={locality} onChange={(e) => setLocality(e.target.value)} className="input">
                <option value="">All localities</option>
                {LOCALITIES.map((l) => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>

            <div>
              <label className="label" htmlFor="maxRent">Max monthly rent</label>
              <select id="maxRent" value={maxRent} onChange={(e) => setMaxRent(e.target.value)} className="input">
                <option value="">Any budget</option>
                <option value="5000">Up to {formatINR(5000)}</option>
                <option value="6000">Up to {formatINR(6000)}</option>
                <option value="7000">Up to {formatINR(7000)}</option>
                <option value="8000">Up to {formatINR(8000)}</option>
                <option value="10000">Up to {formatINR(10000)}</option>
              </select>
            </div>

            <div>
              <span className="label">Category</span>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCategory((prev) => (prev === c ? "" : c))}
                    className={`badge px-3 py-1.5 border transition ${
                      category === c
                        ? "bg-brand-600 text-white border-brand-600"
                        : "bg-white text-slate-600 border-slate-200 hover:border-brand-300"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="label">Amenities</span>
              <div className="flex flex-wrap gap-1.5">
                {ALL_AMENITIES.map((a) => (
                  <button
                    key={a}
                    type="button"
                    onClick={() => toggleAmenity(a)}
                    className={`badge px-2.5 py-1 border transition ${
                      amenities.includes(a)
                        ? "bg-brand-50 text-brand-700 border-brand-400"
                        : "bg-white text-slate-500 border-slate-200 hover:border-brand-200"
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Results */}
        <section>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <p className="text-sm text-slate-600">
              <span className="font-semibold text-slate-900">{filtered.length}</span> hostel{filtered.length !== 1 && "s"} found
            </p>
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-sm text-slate-600">Sort:</label>
              <select id="sort" value={sort} onChange={(e) => setSort(e.target.value as SortKey)} className="input w-auto py-2 text-sm">
                <option value="rent-asc">Rent: Low to High</option>
                <option value="rent-desc">Rent: High to Low</option>
                <option value="rating">Top rated</option>
              </select>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="card p-10 text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-slate-100 text-slate-400">
                <Search size={26} />
              </div>
              <h3 className="mt-4 font-display font-semibold text-slate-900">No hostels match your filters</h3>
              <p className="mt-1 text-sm text-slate-500">Try widening your budget or removing some amenities.</p>
              <button onClick={clearAll} className="btn-secondary mt-5">Clear all filters</button>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((h) => (
                <HostelCard key={h.id} hostel={h} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
