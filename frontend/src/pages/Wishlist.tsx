
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Search } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import HostelCard from "@/components/HostelCard";

export default function Wishlist() {
  const { ids, clear } = useWishlist();
  const [hostels, setHostels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const fetchHostels = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/hostels");

        if (!response.ok) {
          throw new Error("Could not load hostels");
        }

        const data = await response.json();
        const records = Array.isArray(data)
          ? data
          : data.hostels ?? [];

        if (active) {
          setHostels(
            records.map((h: any) => ({
              ...h,
              id: String(h._id ?? h.id),
            }))
          );
        }
      } catch (error) {
        console.error("Wishlist loading failed:", error);
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchHostels();

    return () => {
      active = false;
    };
  }, []);

  const saved = hostels.filter((h) => ids.includes(String(h.id)));

  return (
    <div className="container-app py-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold text-slate-900">
            Your wishlist
          </h1>
          <p className="mt-1 text-slate-500">
            Hostels you've saved for later.
          </p>
        </div>

        {saved.length > 0 && (
          <button
            onClick={clear}
            className="btn-ghost text-sm text-rose-600 hover:bg-rose-50"
          >
            Clear wishlist
          </button>
        )}
      </div>

      {loading ? (
        <p className="text-slate-500">Loading your saved hostels...</p>
      ) : saved.length === 0 ? (
        <div className="card p-12 text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-rose-50 text-rose-400">
            <Heart size={26} />
          </span>

          <h3 className="mt-4 font-display font-semibold text-slate-900">
            No saved hostels yet
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Tap the heart icon on any hostel to save it here.
          </p>

          <Link to="/explore" className="btn-primary mt-5 inline-flex">
            <Search size={16} /> Explore hostels
          </Link>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {saved.map((hostel) => (
            <HostelCard key={hostel.id} hostel={hostel} />
          ))}
        </div>
      )}
    </div>
  );
}
