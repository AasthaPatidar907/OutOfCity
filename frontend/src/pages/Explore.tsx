import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, X } from "lucide-react";

import { ALL_AMENITIES, LOCALITIES, CATEGORIES } from "@/data/hostels";
import type { Hostel, Category } from "@/types";
import HostelCard from "@/components/HostelCard";

import { formatINR } from "@/lib/storage";

type SortKey = "rent-asc" | "rent-desc" | "rating";

export default function Explore() {
  const [params, setParams] = useSearchParams();

  const [hostels, setHostels] = useState<Hostel[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  const [locality, setLocality] = useState(params.get("locality") ?? "");
  const [maxRent, setMaxRent] = useState(params.get("max") ?? "");
  const [category, setCategory] = useState(
    (params.get("category") as Category | "") ?? ""
  );
  const [search, setSearch] = useState("");
  const [amenities, setAmenities] = useState<string[]>([]);
  const [sort, setSort] = useState<SortKey>("rent-asc");

  // Fetch hostel listings from the backend.
  useEffect(() => {
    const controller = new AbortController();

    const fetchHostels = async () => {
      try {
        setLoading(true);
        setFetchError("");

        const response = await fetch("http://localhost:5000/api/hostels", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Could not load hostels.");
        }

        const data = await response.json();


if (!Array.isArray(data.hostels)) {
  throw new Error("The server returned an invalid hostel list.");
}

const formattedHostels = data.hostels.map((h: any) => ({
  ...h,
  id: h._id ?? h.id,
  rent: typeof h.rent === "number" ? h.rent : 0,
  rating: typeof h.rating === "number" ? h.rating : 0,
  reviews: typeof h.reviews === "number" ? h.reviews : 0,
  amenities: Array.isArray(h.amenities) ? h.amenities : [],
  images: Array.isArray(h.images)
    ? h.images
    : h.image
      ? [h.image]
      : [],
}));

setHostels(formattedHostels);


        if (!Array.isArray(data.hostels)) {
          throw new Error("The server returned an invalid hostel list.");
        }

      
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }

        console.error("Failed to fetch hostels:", error);
        setFetchError(
          "Could not load hostels. Please make sure the backend is running."
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchHostels();

    return () => controller.abort();
  }, []);

  // Sync URL -> state when navigating from the Home search card.
  useEffect(() => {
    setLocality(params.get("locality") ?? "");
    setMaxRent(params.get("max") ?? "");
    setCategory((params.get("category") as Category | "") ?? "");
  }, [params]);

  // Sync state -> URL so filters are shareable and survive refresh.
  useEffect(() => {
    const next: Record<string, string> = {};

    if (locality) next.locality = locality;
    if (maxRent) next.max = maxRent;
    if (category) next.category = category;

    const current = params.toString();
    const updated = new URLSearchParams(next).toString();

    if (current !== updated) {
      setParams(next, { replace: true });
    }
  }, [locality, maxRent, category, params, setParams]);

  const toggleAmenity = (amenity: string) => {
    setAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((item) => item !== amenity)
        : [...prev, amenity]
    );
  };

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
  let list = hostels.filter((hostel) => {
  
if (locality) {
  const normalize = (value: string) =>
    value.toLowerCase().replace(/[^a-z0-9]/g, "");

  const selected = normalize(locality);
  const actual = normalize(hostel.locality || "");

  const localityAliases: Record<string, string[]> = {
    bhawarkua: ["bhanwarkuwa", "bhanwarkua", "bhawarkuwa"],
    schemeno54: ["scheme54", "scheme no54", "scheme no 54"],
    schemeno78: ["scheme78", "scheme no78", "scheme no 78"],
    geetabhawan: ["geetabhavan", "geetabhawan", "geeta bhavan"],
    newpalasia: ["palasia"],
  };

  const aliases = localityAliases[selected] || [];

  const matches =
    actual.includes(selected) ||
    aliases.some((alias) => actual.includes(normalize(alias)));

  if (!matches) return false;
}


    if (
      maxRent &&
      (hostel.rent <= 0 || hostel.rent > Number(maxRent))
    ) {
      return false;
    }

    if (category && hostel.category !== category) return false;

    if (
      search &&
      !`${hostel.name} ${hostel.locality}`
        .toLowerCase()
        .includes(search.toLowerCase())
    ) {
      return false;
    }

    if (
      amenities.length > 0 &&
      !amenities.every((amenity) => hostel.amenities.includes(amenity))
    ) {
      return false;
    }

    return true;
  });

  list = [...list].sort((a, b) => {
    if (sort === "rent-asc") {
      if (a.rent <= 0 && b.rent > 0) return 1;
      if (b.rent <= 0 && a.rent > 0) return -1;
      return a.rent - b.rent;
    }

    if (sort === "rent-desc") {
      if (a.rent <= 0 && b.rent > 0) return 1;
      if (b.rent <= 0 && a.rent > 0) return -1;
      return b.rent - a.rent;
    }

    return b.rating - a.rating;
  });

  return list;
}, [hostels, locality, maxRent, category, search, amenities, sort]);


  const activeCount =
    (locality ? 1 : 0) +
    (maxRent ? 1 : 0) +
    (category ? 1 : 0) +
    amenities.length +
    (search ? 1 : 0);

  return (
    <div className="container-app py-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold text-slate-900">
            Explore hostels
          </h1>
          <p className="mt-1 text-slate-500">
            Filter by locality, budget, category and amenities.
          </p>
        </div>

      </div>

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        {/* Filters */}
        <aside className="card h-fit p-5 lg:sticky lg:top-20">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-display font-semibold text-slate-900">
              <SlidersHorizontal size={18} />
              Filters
            </h2>

            {activeCount > 0 && (
              <button
                type="button"
                onClick={clearAll}
                className="inline-flex items-center gap-1 text-xs font-medium text-brand-700 hover:text-brand-800"
              >
                <X size={13} />
                Clear ({activeCount})
              </button>
            )}
          </div>

          <div className="space-y-5">
            <div>
              <label className="label" htmlFor="search">
                Search by name or locality
              </label>
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  id="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="e.g. Sunrise or Vijay Nagar"
                  className="input pl-9"
                />
              </div>
            </div>

            <div>
              <label className="label" htmlFor="locality">
                Locality
              </label>
              <select
                id="locality"
                value={locality}
                onChange={(event) => setLocality(event.target.value)}
                className="input"
              >
                <option value="">All localities</option>
               {LOCALITIES.map((item) => (
  <option key={item} value={item}>
    {item}
  </option>
))}
              </select>
            </div>

            <div>
              <label className="label" htmlFor="maxRent">
                Max monthly rent
              </label>
              <select
                id="maxRent"
                value={maxRent}
                onChange={(event) => setMaxRent(event.target.value)}
                className="input"
              >
                <option value="">Any budget</option>
               {[2000, 3000, 4000, 5000, 6000, 8000, 10000, 15000, 20000].map(
  (amount) => (
    <option key={amount} value={amount}>
      Up to {formatINR(amount)}
    </option>
  )
)}
              </select>
            </div>

            <div>
              <span className="label">Category</span>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() =>
                      setCategory((previous) =>
                        previous === item ? "" : item
                      )
                    }
                    className={`badge border px-3 py-1.5 transition ${
                      category === item
                        ? "border-brand-600 bg-brand-600 text-white"
                        : "border-slate-200 bg-white text-slate-600 hover:border-brand-300"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="label">Amenities</span>
              <div className="flex flex-wrap gap-1.5">
                {ALL_AMENITIES.map((amenity) => (
                  <button
                    key={amenity}
                    type="button"
                    onClick={() => toggleAmenity(amenity)}
                    className={`badge border px-2.5 py-1 transition ${
                      amenities.includes(amenity)
                        ? "border-brand-400 bg-brand-50 text-brand-700"
                        : "border-slate-200 bg-white text-slate-500 hover:border-brand-200"
                    }`}
                  >
                    {amenity}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Results */}
        <section>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-slate-600">
              <span className="font-semibold text-slate-900">
                {loading ? "…" : filtered.length}
              </span>{" "}
              hostel{filtered.length !== 1 ? "s" : ""} found
            </p>

            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-sm text-slate-600">
                Sort:
              </label>
              <select
                id="sort"
                value={sort}
                onChange={(event) =>
                  setSort(event.target.value as SortKey)
                }
                className="input w-auto py-2 text-sm"
              >
                <option value="rent-asc">Rent: Low to High</option>
                <option value="rent-desc">Rent: High to Low</option>
                <option value="rating">Top rated</option>
              </select>
            </div>
          </div>

          {loading ? (
            <p className="py-10 text-center text-slate-500">
              Loading hostels...
            </p>
          ) : fetchError ? (
            <div className="card p-8 text-center">
              <p className="text-rose-600">{fetchError}</p>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="btn-secondary mt-4"
              >
                Try again
              </button>
            </div>
          ) : filtered.length === 0 ? (
            <div className="card p-10 text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-slate-100 text-slate-400">
                <Search size={26} />
              </div>
              <h3 className="mt-4 font-display font-semibold text-slate-900">
                No hostels match your filters
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Try widening your budget or removing some amenities.
              </p>
              <button
                type="button"
                onClick={clearAll}
                className="btn-secondary mt-5"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((hostel) => (
                <HostelCard key={hostel.id} hostel={hostel} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}