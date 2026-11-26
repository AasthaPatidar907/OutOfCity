
import { Heart, MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Hostel } from "@/types";
import { formatINR } from "@/lib/storage";
import { useWishlist } from "@/context/WishlistContext";

const FALLBACK_HOSTEL_IMAGE =
  "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=900&q=80";

const HOSTEL_IMAGES: Record<string, string[]> = {
  Boys: [
    "https://d2hkfqy3au7use.cloudfront.net/images/original/8b29d3b60f37f0f9cb4d2c3b77e4fb81ce580db9.jpg",
    "https://rentalgini-website-images.s3.amazonaws.com/hl-property-image/643/property_main_image/27df0017-e2f6-4cc6-8740-fd819ec19cdc_ChatGPT_Image_Aug_25%2C_2026%2C_03_25_23_AM_%287%29.png",
  ],
  Girls: [
    "https://www.unionliving.in/_next/image?dpl=dpl_Git3cGA3mJEHFgicMNQQqrxZdSPA&q=75&url=https%3A%2F%2Fpub-6d08c79af1b441ba9ae8499c407fd9d0.r2.dev%2FProperty%2Fahmedabad%2Fahmedabad-triple.webp&w=1920",
    "https://4slonline.com/app_img/blog/category/Double%20Sharing%20Hostel-Affordable%20and%20Comfortable%20Stay%20Option%20in%20India.webp",
  ],
  "Co-Living": [
    "https://img.cofynd.com/images/latest_images_2024/e78e67b79a88295308674ac1d64db72e52d494a3.webp",
    "https://www.unionliving.in/_next/image?dpl=dpl_CWvTQFwFy7Axg7LRybpMrBS9x62y&q=75&url=%2F_next%2Fstatic%2Fmedia%2F3bhk.7f0f2bc6.webp&w=1920",
  ],
};

function getHostelImage(hostel: Hostel): string {
  if (hostel.images?.[0]) {
    return hostel.images[0];
  }

  const images =
    HOSTEL_IMAGES[hostel.category] ?? HOSTEL_IMAGES["Co-Living"];

  return images[hostel.name.length % images.length];
}

export default function HostelCard({ hostel }: { hostel: Hostel }) {
  const { isWishlisted, toggle } = useWishlist();
  const saved = isWishlisted(hostel.id);

  return (
    <article className="group min-w-0 overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative overflow-hidden bg-slate-100">
        <Link to={`/hostel/${hostel.id}`} className="block">
          <img
            src={getHostelImage(hostel)}
            alt={`${hostel.name} accommodation`}
            loading="lazy"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = FALLBACK_HOSTEL_IMAGE;
            }}
            className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        <button
          type="button"
          aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => toggle(hostel.id)}
          className="absolute right-3 top-3 rounded-full bg-white/95 p-2.5 shadow-sm transition hover:scale-110"
        >
          <Heart
            size={18}
            className={
              saved ? "fill-rose-500 text-rose-500" : "text-slate-600"
            }
          />
        </button>

        <span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-slate-800">
          {hostel.category}
        </span>
      </div>

      <div className="p-4">
        <Link to={`/hostel/${hostel.id}`} className="block">
          <h2 className="truncate font-display text-base font-bold text-slate-900 transition group-hover:text-brand-700 sm:text-lg">
            {hostel.name}
          </h2>
        </Link>

        <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-500">
          <MapPin size={15} className="shrink-0 text-brand-600" />
          <span className="truncate">{hostel.locality}, Indore</span>
        </p>

        <div className="mt-4 flex items-end justify-between gap-2 border-t border-slate-100 pt-3">
          <div className="min-w-0">
            <p className="text-xs text-slate-500">Monthly rent</p>
            <p className="mt-1 truncate text-lg font-bold text-slate-900">
              {hostel.rent > 0 ? formatINR(hostel.rent) : "Price on enquiry"}
              {hostel.rent > 0 && (
                <span className="text-xs font-normal text-slate-500">
                  {" "}/mo
                </span>
              )}
            </p>
          </div>

          <Link
            to={`/hostel/${hostel.id}`}
            className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-brand-700 transition hover:gap-2"
          >
            View Details <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </article>
  );
}
