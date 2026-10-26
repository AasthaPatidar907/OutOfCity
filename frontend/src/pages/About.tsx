import { Link } from "react-router-dom";
import { Building2, Compass, Heart, MapPin, ShieldCheck, Users } from "lucide-react";
import { AREAS } from "@/data/areas";
import DemoBanner from "@/components/DemoBanner";

export default function About() {
  return (
    <div className="container-app py-10">
      <div className="max-w-3xl">
        <span className="badge bg-brand-100 text-brand-700">About OutOfCity</span>
        <h1 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-slate-900">
          Helping students find a place to stay in Indore
        </h1>
        <p className="mt-4 text-slate-600 leading-relaxed">
          OutOfCity is a hostel and PG discovery platform built for students relocating to Indore
          for higher studies. Moving to a new city is stressful — finding a safe, affordable place
          to live shouldn't require dozens of phone calls and uncertain visits. We bring hostel
          listings, locality information and rent comparisons into one place so you can shortlist
          before you arrive.
        </p>

        <div className="mt-6">
          <DemoBanner message="OutOfCity is a demo student project. Listings are sample data, not real or verified properties, and no actual bookings can be made." />
        </div>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { icon: MapPin, title: "Locality-first discovery", text: "Compare rent ranges and vibes across Vijay Nagar, Bhawarkua, Palasia and Rau." },
          { icon: Heart, title: "Wishlist what you like", text: "Save hostels to a wishlist that persists on your device between visits." },
          { icon: ShieldCheck, title: "Honest demo data", text: "We clearly label listings as sample data and never claim verified reviews or availability." },
        ].map((b) => (
          <div key={b.title} className="card p-6">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-100 text-brand-700">
              <b.icon size={20} />
            </span>
            <h3 className="mt-4 font-display font-semibold text-slate-900">{b.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{b.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <h2 className="font-display text-xl font-semibold text-slate-900 flex items-center gap-2">
            <Compass size={20} className="text-brand-600" /> How it works
          </h2>
          <ol className="mt-4 space-y-3 text-sm text-slate-600">
            <li className="flex gap-3"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-700 text-xs font-bold">1</span> Use the home search or explore page to filter by locality, budget and amenities.</li>
            <li className="flex gap-3"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-700 text-xs font-bold">2</span> Open a hostel to see photos, rent, amenities and a description.</li>
            <li className="flex gap-3"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-700 text-xs font-bold">3</span> Save favourites to your wishlist and submit a demo enquiry.</li>
            <li className="flex gap-3"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-700 text-xs font-bold">4</span> Review your enquiries in My Bookings.</li>
          </ol>
        </div>
        <div className="card p-6">
          <h2 className="font-display text-xl font-semibold text-slate-900 flex items-center gap-2">
            <Users size={20} className="text-brand-600" /> Areas we cover
          </h2>
          <ul className="mt-4 space-y-3">
            {AREAS.map((a) => (
              <li key={a.name} className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 text-brand-500 shrink-0" />
                <div>
                  <p className="font-medium text-slate-900">{a.name}</p>
                  <p className="text-sm text-slate-500">{a.blurb}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-12 rounded-2xl bg-brand-700 px-6 py-10 text-center text-white">
        <Building2 size={28} className="mx-auto" />
        <h2 className="mt-3 font-display text-2xl font-bold">Start exploring Indore hostels</h2>
        <p className="mt-2 text-brand-100">Browse sample listings and shortlist your favourites today.</p>
        <Link to="/explore" className="btn bg-white text-brand-700 mt-5 px-6 py-3 hover:bg-brand-50">Explore hostels</Link>
      </div>
    </div>
  );
}
