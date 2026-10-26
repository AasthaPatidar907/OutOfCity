import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Check, Heart, MapPin, ShieldCheck } from "lucide-react";
import { getHostelById } from "@/data/hostels";
import { formatINR } from "@/lib/storage";
import { useWishlist } from "@/context/WishlistContext";
import StarRating from "@/components/StarRating";
import EnquiryForm from "@/components/EnquiryForm";
import DemoBanner from "@/components/DemoBanner";

export default function HostelDetail() {
  const { id } = useParams();
  const hostel = id ? getHostelById(id) : undefined;
  const { isWishlisted, toggle } = useWishlist();
  const [activeImg, setActiveImg] = useState(0);

  if (!hostel) {
    return (
      <div className="container-app py-20 text-center">
        <h1 className="font-display text-2xl font-bold text-slate-900">Hostel not found</h1>
        <p className="text-slate-500 mt-2">This listing may have been removed or the link is incorrect.</p>
        <Link to="/explore" className="btn-primary mt-6">Back to explore</Link>
      </div>
    );
  }

  const active = isWishlisted(hostel.id);
  const categoryColor =
    hostel.category === "Girls"
      ? "bg-pink-100 text-pink-700"
      : hostel.category === "Boys"
      ? "bg-brand-100 text-brand-700"
      : "bg-emerald-100 text-emerald-700";

  return (
    <div className="container-app py-8">
      <Link to="/explore" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-brand-700 mb-4">
        <ArrowLeft size={16} /> Back to explore
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        {/* Gallery + info */}
        <div>
          <div className="relative overflow-hidden rounded-2xl">
            <img src={hostel.images[activeImg]} alt={hostel.name} className="h-72 sm:h-96 w-full object-cover" />
            <span className={`absolute top-4 left-4 badge ${categoryColor}`}>{hostel.category}</span>
            <button
              type="button"
              onClick={() => toggle(hostel.id)}
              className="absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-sm font-medium text-slate-700 shadow hover:bg-white"
            >
              <Heart size={16} className={active ? "text-rose-500 fill-rose-500" : ""} />
              {active ? "Saved" : "Save"}
            </button>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {hostel.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`overflow-hidden rounded-lg border-2 transition ${activeImg === i ? "border-brand-500" : "border-transparent hover:border-brand-200"}`}
              >
                <img src={img} alt={`${hostel.name} ${i + 1}`} loading="lazy" className="h-20 w-full object-cover" />
              </button>
            ))}
          </div>

          <div className="mt-6">
            <h1 className="font-display text-3xl font-bold text-slate-900">{hostel.name}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-slate-600">
              <span className="flex items-center gap-1"><MapPin size={15} className="text-brand-500" /> {hostel.locality}</span>
              <StarRating rating={hostel.rating} reviews={hostel.reviews} />
            </div>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-3xl font-bold text-slate-900">{formatINR(hostel.rent)}</span>
              <span className="text-slate-500">/month</span>
            </div>

            <div className="mt-4">
              <DemoBanner message="Demo listing — sample data only. Not a real or bookable property." />
            </div>

            <h2 className="mt-6 font-display text-lg font-semibold text-slate-900">About this hostel</h2>
            <p className="mt-2 text-slate-600 leading-relaxed">{hostel.description}</p>

            <h2 className="mt-6 font-display text-lg font-semibold text-slate-900">Amenities</h2>
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {hostel.amenities.map((a) => (
                <div key={a} className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700">
                  <Check size={15} className="text-emerald-600" /> {a}
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
              <ShieldCheck size={18} className="text-slate-400" />
              Ratings and review counts shown are sample data and do not represent verified reviews.
            </div>
          </div>
        </div>

        {/* Enquiry */}
        <div className="lg:sticky lg:top-20 h-fit">
          <EnquiryForm hostel={hostel} />
        </div>
      </div>
    </div>
  );
}
