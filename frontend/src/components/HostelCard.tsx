import { Heart, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import type { Hostel } from "@/types";
import { formatINR } from "@/lib/storage";
import { useWishlist } from "@/context/WishlistContext";
import StarRating from "@/components/StarRating";

export default function HostelCard({ hostel }: { hostel: Hostel }) {
  const { isWishlisted, toggle } = useWishlist();
  const active = isWishlisted(hostel.id);

  const categoryColor =
    hostel.category === "Girls"
      ? "bg-pink-100 text-pink-700"
      : hostel.category === "Boys"
      ? "bg-brand-100 text-brand-700"
      : "bg-emerald-100 text-emerald-700";

  return (
    <div className="card group overflow-hidden flex flex-col hover:-translate-y-1 hover:shadow-card-hover">
      <div className="relative h-48 overflow-hidden">
        <img
          src={hostel.images[0]}
          alt={hostel.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <button
          type="button"
          aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => toggle(hostel.id)}
          className="absolute top-3 right-3 rounded-full bg-white/90 p-2 shadow hover:bg-white transition"
        >
          <Heart
            size={18}
            className={active ? "text-rose-500 fill-rose-500" : "text-slate-500"}
          />
        </button>
        <span className={`absolute top-3 left-3 badge ${categoryColor}`}>{hostel.category}</span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display font-semibold text-slate-900 leading-snug">
            {hostel.name}
          </h3>
        </div>
        <div className="mt-1 flex items-center gap-1 text-sm text-slate-500">
          <MapPin size={14} className="text-brand-500" />
          {hostel.locality}
        </div>

        <div className="mt-2">
          <StarRating rating={hostel.rating} reviews={hostel.reviews} />
        </div>

        <p className="mt-3 text-sm text-slate-600 line-clamp-2">{hostel.description}</p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {hostel.amenities.slice(0, 4).map((a) => (
            <span key={a} className="badge bg-slate-100 text-slate-600">
              {a}
            </span>
          ))}
          {hostel.amenities.length > 4 && (
            <span className="badge bg-slate-100 text-slate-500">
              +{hostel.amenities.length - 4}
            </span>
          )}
        </div>

        <div className="mt-4 flex items-end justify-between pt-3 border-t border-slate-100">
          <div>
            <span className="text-lg font-bold text-slate-900">{formatINR(hostel.rent)}</span>
            <span className="text-sm text-slate-500">/mo</span>
          </div>
          <Link
            to={`/hostel/${hostel.id}`}
            className="text-sm font-semibold text-brand-700 hover:text-brand-800"
          >
            View details →
          </Link>
        </div>
      </div>
    </div>
  );
}
