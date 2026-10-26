import { Link } from "react-router-dom";
import { Heart, Search } from "lucide-react";
import { HOSTELS, getHostelById } from "@/data/hostels";
import { useWishlist } from "@/context/WishlistContext";
import HostelCard from "@/components/HostelCard";

export default function Wishlist() {
  const { ids, clear } = useWishlist();
  const saved = ids.map(getHostelById).filter(Boolean) as typeof HOSTELS;

  return (
    <div className="container-app py-8">
      <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-slate-900">Your wishlist</h1>
          <p className="text-slate-500 mt-1">Hostels you've saved for later. Stored on this device.</p>
        </div>
        {saved.length > 0 && (
          <button onClick={clear} className="btn-ghost text-sm text-rose-600 hover:bg-rose-50">Clear wishlist</button>
        )}
      </div>

      {saved.length === 0 ? (
        <div className="card p-12 text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-rose-50 text-rose-400">
            <Heart size={26} />
          </span>
          <h3 className="mt-4 font-display font-semibold text-slate-900">No saved hostels yet</h3>
          <p className="mt-1 text-sm text-slate-500">Tap the heart icon on any hostel to save it here.</p>
          <Link to="/explore" className="btn-primary mt-5 inline-flex">
            <Search size={16} /> Explore hostels
          </Link>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {saved.map((h) => (
            <HostelCard key={h.id} hostel={h} />
          ))}
        </div>
      )}
    </div>
  );
}
