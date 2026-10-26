import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Search } from "lucide-react";

import { HOSTELS, LOCALITIES } from "@/data/hostels";
import { formatINR } from "@/lib/storage";
import HostelCard from "@/components/HostelCard";

export default function Home() {
  const navigate = useNavigate();
  const [locality, setLocality] = useState("");
  const [budget, setBudget] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (locality) params.set("locality", locality);
    if (budget) params.set("max", budget);

    navigate(`/explore?${params.toString()}`);
  };

  const featuredHostels = HOSTELS.slice(0, 4);

  return (
    <main className="container-app py-8 sm:py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-medium text-[#657D61]">
          Welcome to OutOfCity
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Find your stay in Indore.
        </h1>

        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
          Explore hostels and PGs, compare monthly rents and find a place
          that fits your needs and budget.
        </p>

        <form
          onSubmit={handleSearch}
          className="mt-6 grid gap-3 rounded-xl border border-[#E5E3DA] bg-white p-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end"
        >
          <div>
            <label className="label" htmlFor="locality">
              Locality
            </label>
            <select
              id="locality"
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
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
            <label className="label" htmlFor="budget">
              Maximum monthly rent
            </label>
            <select
              id="budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="input"
            >
              <option value="">Any budget</option>
              <option value="6000">Up to {formatINR(6000)}</option>
              <option value="8000">Up to {formatINR(8000)}</option>
              <option value="10000">Up to {formatINR(10000)}</option>
            </select>
          </div>

          <button type="submit" className="btn-primary">
            <Search size={17} />
            Search
          </button>
        </form>

       
      </section>

      <section className="mt-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Featured hostels</h2>
            <p className="mt-1 text-sm text-slate-600">
              Explore a few sample stays in Indore.
            </p>
          </div>

          <Link
            to="/explore"
            className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-[#52694F] hover:underline"
          >
            View all <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredHostels.map((hostel) => (
            <HostelCard key={hostel.id} hostel={hostel} />
          ))}
        </div>
      </section>
    </main>
  );
} 