
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Search, MapPin, ShieldCheck, BedDouble } from "lucide-react";

import { LOCALITIES } from "@/data/hostels";
import { formatINR } from "@/lib/storage";
import HostelCard from "@/components/HostelCard";
import type { Hostel } from "@/types";

type HomeHostel = Hostel & {
  roomTypes?: string[];
  phone?: string;
  deposit?: number;
};

export default function Home() {
  const navigate = useNavigate();
  const [locality, setLocality] = useState("");
  const [budget, setBudget] = useState("");
  const [hostels, setHostels] = useState<HomeHostel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function loadHostels() {
      try {
        const response = await fetch("http://localhost:5000/api/hostels", {
          signal: controller.signal,
        });

        if (!response.ok) throw new Error("Could not load hostels");

        const data = await response.json();
        const records = Array.isArray(data.hostels) ? data.hostels : [];

        setHostels(
          records.map((h: any) => ({
            ...h,
            id: h._id || h.id,
            rent: typeof h.rent === "number" ? h.rent : 0,
            rating: typeof h.rating === "number" ? h.rating : 0,
            reviews: typeof h.reviews === "number" ? h.reviews : 0,
            amenities: Array.isArray(h.amenities) ? h.amenities : [],
            images: Array.isArray(h.images) ? h.images : [],
          }))
        );
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") return;
        setHostels([]);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    loadHostels();
    return () => controller.abort();
  }, []);

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const params = new URLSearchParams();
    if (locality) params.set("locality", locality);
    if (budget) params.set("max", budget);

    navigate(`/explore?${params.toString()}`);
  }

  const featuredHostels = hostels.slice(0, 4);

  return (
    <main className="min-h-screen bg-[#f8f9fb]">
      <section className="relative overflow-hidden bg-white">
        <div className="container-app grid gap-10 py-12 sm:py-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-20">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600">
              <MapPin size={14} />
              Find your stay in Indore
            </span>

            <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              A better stay.
              <span className="block text-brand-700">A simpler search.</span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
              Discover hostels and PGs, compare monthly rents, explore
              facilities, and find a stay that fits your budget.
            </p>

            <form
              onSubmit={handleSearch}
              className="mt-8 grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-lg shadow-slate-200/40 sm:grid-cols-2"
            >
              <div>
                <label className="label" htmlFor="home-locality">
                  Preferred locality
                </label>
                <select
                  id="home-locality"
                  value={locality}
                  onChange={(event) => setLocality(event.target.value)}
                  className="input"
                >
                  <option value="">All localities</option>
                  {LOCALITIES.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label" htmlFor="home-budget">
                  Monthly budget
                </label>
                <select
                  id="home-budget"
                  value={budget}
                  onChange={(event) => setBudget(event.target.value)}
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

              <button
                type="submit"
                className="btn-primary flex items-center justify-center gap-2 sm:col-span-2"
              >
                <Search size={18} />
                Find my stay
                <ArrowRight size={17} />
              </button>
            </form>

            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
              <span className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-brand-700" />
                Compare accommodation options
              </span>
              <span className="flex items-center gap-2">
                <BedDouble size={16} className="text-brand-700" />
                Explore room arrangements
              </span>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1100&q=85"
              alt="Comfortable hostel-style accommodation"
              className="h-[300px] w-full rounded-3xl object-cover sm:h-[420px]"
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.style.display = "none";
              }}
            />
            <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/60 bg-white/95 p-4 shadow-lg backdrop-blur">
              <p className="text-sm font-semibold text-slate-900">
                Your next stay starts here
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                Compare listed prices, locations, and available property
                information before deciding.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-app py-12 sm:py-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-brand-700">
              Explore accommodation
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
              Featured hostels
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Browse listings with their available details.
            </p>
          </div>

          <Link
            to="/explore"
            className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-brand-700 hover:underline"
          >
            View all <ArrowRight size={16} />
          </Link>
        </div>

        {loading ? (
          <div className="py-16 text-center text-sm text-slate-500">
            Loading hostels...
          </div>
        ) : featuredHostels.length > 0 ? (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredHostels.map((hostel) => (
              <HostelCard key={hostel.id} hostel={hostel} />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-8 text-center">
            <h3 className="font-semibold text-slate-900">
              Hostels could not be loaded
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Make sure your backend is running on port 5000, then refresh.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="btn-primary mt-4"
            >
              Try again
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
