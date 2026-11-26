
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  MapPin,
  Wallet,
  Wifi,
  Utensils,
  ShieldCheck,
  WashingMachine,
  Phone,
  Home,
  ExternalLink,
  BedDouble,
  CheckCircle2,
  Image as ImageIcon,
} from "lucide-react";
import { formatINR } from "@/lib/storage";
import { useWishlist } from "@/context/WishlistContext";
import type { Hostel } from "@/types";
type HostelDetails = Hostel & {
  address?: string;
  phone?: string;
  website?: string;
  deposit?: number;
  roomTypes?: string[];
};

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80";

const ABOUT_TEXT = [
  (name: string, locality: string) =>
    `${name} is listed in ${locality}, Indore. Use this page to review the listed rent, check the available property details, and contact the property before deciding whether it suits your stay.`,
  (name: string, locality: string) =>
    `Looking for accommodation around ${locality}? ${name} is one of the listings to consider. Confirm room availability, included services, house rules, and the total monthly cost directly with the property.`,
  (name: string, locality: string) =>
    `${name} appears in our accommodation directory for ${locality}, Indore. Compare its listed price with your budget and ask the property about room sharing, meals, facilities, and move-in requirements.`,
  (name: string, locality: string) =>
    `Explore ${name} as an accommodation option in ${locality}. Before booking, ask about the exact address, current vacancies, room arrangements, and which facilities are included in the rent.`,
];

const AMENITY_ICONS = [Wifi, Utensils, WashingMachine, ShieldCheck];

export default function HostelDetail() {
  const { id } = useParams();
  const { isWishlisted, toggle } = useWishlist();

  const [hostel, setHostel] = useState<HostelDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    if (!id) {
      setError("No hostel was selected.");
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    async function loadHostel() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `http://localhost:5000/api/hostels/${id}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Hostel not found.");
        }

        const data = await response.json();
        const h = data.hostel;

        if (!h) throw new Error("Hostel details are unavailable.");

        setHostel({
          ...h,
          id: h._id || h.id,
          rent: typeof h.rent === "number" ? h.rent : 0,
          rating: typeof h.rating === "number" ? h.rating : 0,
          reviews: typeof h.reviews === "number" ? h.reviews : 0,
          amenities: Array.isArray(h.amenities) ? h.amenities : [],
          roomTypes: Array.isArray(h.roomTypes) ? h.roomTypes : [],
          images: Array.isArray(h.images)
            ? h.images.filter(
                (image: unknown): image is string =>
                  typeof image === "string" && image.trim().length > 0
              )
            : [],
        });

        setActiveImg(0);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;
        setError("We couldn't load this hostel. Please try again.");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    loadHostel();

    return () => controller.abort();
  }, [id]);

  if (loading) {
    return (
      <div className="container-app py-24 text-center text-slate-500">
        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-brand-600" />
        Loading hostel details...
      </div>
    );
  }

  if (!hostel || error) {
    return (
      <div className="container-app py-24 text-center">
        <Home size={40} className="mx-auto mb-4 text-slate-400" />
        <h1 className="text-2xl font-bold text-slate-900">
          Hostel unavailable
        </h1>
        <p className="mt-2 text-slate-500">{error}</p>
        <Link to="/explore" className="btn-primary mt-6 inline-flex">
          Back to Explore
        </Link>
      </div>
    );
  }

  const saved = isWishlisted(hostel.id);
  const photos = hostel.images;
  const mainPhoto = photos[activeImg] || photos[0] || FALLBACK_IMAGE;
  const locality = hostel.locality || "Indore";
  const category = hostel.category || "Accommodation";

  const categoryStyle =
    category === "Girls"
      ? "bg-rose-50 text-rose-700"
      : category === "Boys"
        ? "bg-brand-50 text-brand-700"
        : "bg-emerald-50 text-emerald-700";

  const about = hostel.description?.trim()
    ? hostel.description
    : ABOUT_TEXT[hostel.name.length % ABOUT_TEXT.length](
        hostel.name,
        locality
      );

  const mapsQuery = encodeURIComponent(
    `${hostel.name}, ${hostel.address || locality}, Indore`
  );

  return (
    <main className="min-h-screen bg-[#f8f9fb]">
      <div className="container-app py-6 sm:py-8">
        <Link
          to="/explore"
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-brand-700"
        >
          <ArrowLeft size={17} />
          Back to Explore
        </Link>

        {/* Photo gallery */}
        <section className="grid gap-3 md:grid-cols-[1.6fr_1fr]">
          <div className="relative min-h-[280px] overflow-hidden rounded-3xl bg-slate-200 sm:min-h-[420px]">
            <img
              src={mainPhoto}
              alt={`${hostel.name} accommodation`}
              className="absolute inset-0 h-full w-full object-cover"
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = FALLBACK_IMAGE;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

            <div className="absolute bottom-5 left-5 right-5">
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${categoryStyle}`}
              >
                {category}
              </span>
              <h1 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
                {hostel.name}
              </h1>
              <p className="mt-2 flex items-center gap-2 text-sm text-white/90">
                <MapPin size={16} />
                {locality}, Indore
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {photos.length > 1 ? (
              photos.slice(0, 4).map((photo, index) => (
                <button
                  key={`${photo}-${index}`}
                  type="button"
                  onClick={() => setActiveImg(index)}
                  className={`relative min-h-28 overflow-hidden rounded-2xl bg-slate-200 ${
                    activeImg === index
                      ? "ring-2 ring-brand-600 ring-offset-2"
                      : ""
                  }`}
                  aria-label={`View photo ${index + 1}`}
                >
                  <img
                    src={photo}
                    alt={`${hostel.name}, photo ${index + 1}`}
                    className="absolute inset-0 h-full w-full object-cover"
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = FALLBACK_IMAGE;
                    }}
                  />
                </button>
              ))
            ) : (
              <div className="col-span-2 flex min-h-40 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center">
                <ImageIcon size={28} className="text-slate-400" />
                <p className="mt-3 text-sm font-semibold text-slate-700">
                  More photos coming soon
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  This listing does not have additional photos yet.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Overview and rent */}
        <section className="mt-7 flex flex-col justify-between gap-5 border-b border-slate-200 pb-7 md:flex-row md:items-center">
          <div>
            <span
              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${categoryStyle}`}
            >
              {category} Hostel
            </span>
            <h2 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">
              {hostel.name}
            </h2>
            <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
              <MapPin size={17} className="shrink-0 text-brand-600" />
              {hostel.address || locality}, Indore
            </p>
          </div>

          <div className="flex items-center justify-between gap-5 rounded-2xl border border-slate-200 bg-white p-4 md:min-w-60">
            <div>
              <p className="text-xs text-slate-500">Listed monthly rent</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">
                {hostel.rent > 0 ? formatINR(hostel.rent) : "On enquiry"}
              </p>
              {hostel.rent > 0 && (
                <p className="text-xs text-slate-500">per month</p>
              )}
            </div>

            <button
              type="button"
              onClick={() => toggle(hostel.id)}
              aria-label={saved ? "Remove from wishlist" : "Save hostel"}
              aria-pressed={saved}
              className="rounded-full border border-slate-200 p-3 transition hover:bg-rose-50"
            >
              <Heart
                size={21}
                className={
                  saved ? "fill-rose-500 text-rose-500" : "text-slate-600"
                }
              />
            </button>
          </div>
        </section>

        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1.5fr_0.8fr]">
          <div className="space-y-7">
            {/* About */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
              <h2 className="text-xl font-bold text-slate-900">
                About this hostel
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {about}
              </p>
              <p className="mt-3 text-xs leading-5 text-slate-500">
                Listing information may need confirmation with the property.
              </p>
            </section>

            {/* Room information */}
         <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
  <h2 className="text-xl font-bold text-slate-900">
    Room options
  </h2>

  <div className="mt-4 grid gap-3 sm:grid-cols-2">
    {(hostel.roomTypes?.length
      ? hostel.roomTypes
      : ["Room types available on enquiry"]
    ).map((room) => (
      <div
        key={room}
        className="rounded-xl border border-slate-200 bg-slate-50 p-4"
      >
        <div className="flex items-center gap-2 font-semibold text-slate-800">
          <BedDouble size={18} className="text-brand-700" />
          {room}
        </div>

        <p className="mt-2 text-sm text-slate-500">
          {hostel.rent > 0
            ? `Listed hostel rent: ${formatINR(hostel.rent)} per month`
            : "Monthly rent not listed"}
        </p>
      </div>
    ))}
  </div>
</section>

            {/* Amenities */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
              <h2 className="text-xl font-bold text-slate-900">
                Facilities & amenities
              </h2>

              {hostel.amenities.length > 0 ? (
                <>
                  <p className="mt-2 text-sm text-slate-500">
                    Facilities recorded for this listing
                  </p>
                  <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {hostel.amenities.map((amenity, index) => {
                      const Icon =
                        AMENITY_ICONS[index % AMENITY_ICONS.length];

                      return (
                        <div
                          key={`${amenity}-${index}`}
                          className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3"
                        >
                          <span className="rounded-lg bg-emerald-50 p-2 text-emerald-700">
                            <Icon size={18} />
                          </span>
                          <span className="text-sm font-medium text-slate-700">
                            {amenity}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div className="mt-4 rounded-xl bg-slate-50 p-4">
                  <p className="text-sm leading-6 text-slate-600">
                    Amenities have not been listed yet. Ask the property about
                    Wi-Fi, meals, laundry, housekeeping, security, and any
                    other facilities you need.
                  </p>
                </div>
              )}
            </section>

            {/* Location */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
              <h2 className="text-xl font-bold text-slate-900">Location</h2>
              <div className="mt-4 flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <MapPin size={23} />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-slate-900">
                    {locality}, Indore
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    {hostel.address ||
                      "The full street address has not been provided. Confirm the exact location before visiting."}
                  </p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:underline"
                  >
                    Find on Google Maps <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </section>
          </div>

          {/* Rent and contact */}
          <aside className="space-y-5 lg:sticky lg:top-24">
            <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-amber-50 p-3 text-amber-700">
                  <Wallet size={22} />
                </div>
                <h2 className="text-xl font-bold text-slate-900">
                  Rent breakdown
                </h2>
              </div>

              <div className="mt-5 space-y-4">
                <div className="flex justify-between gap-3 text-sm">
                  <span className="text-slate-500">Monthly rent</span>
                  <span className="text-right font-semibold text-slate-900">
                    {hostel.rent > 0 ? formatINR(hostel.rent) : "Not listed"}
                  </span>
                </div>

                <div className="flex justify-between gap-3 border-t border-slate-100 pt-4 text-sm">
                  <span className="text-slate-500">Security deposit</span>
                  <span className="text-right font-semibold text-slate-900">
                    {typeof hostel.deposit === "number"
                      ? formatINR(hostel.deposit)
                      : "Ask property"}
                  </span>
                </div>

                <div className="rounded-xl bg-amber-50 p-3 text-xs leading-5 text-amber-900">
                  Confirm whether food, electricity, maintenance, and other
                  charges are included. Ask about deposit refunds before paying.
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-emerald-50 p-3 text-emerald-700">
                  <Phone size={22} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Contact hostel
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">
                    Contact details shown only when available.
                  </p>
                </div>
              </div>

              {hostel.phone ? (
                <a
                  href={`tel:${hostel.phone}`}
                  className="btn-primary mt-5 flex w-full items-center justify-center gap-2"
                >
                  <Phone size={17} />
                  Call hostel
                </a>
              ) : (
                <div className="mt-5 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                  A phone number has not been provided for this listing yet.
                </div>
              )}

              {hostel.website && (
                <a
                  href={hostel.website}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Visit website <ExternalLink size={15} />
                </a>
              )}

              <p className="mt-4 flex items-start gap-2 text-xs leading-5 text-slate-500">
                <CheckCircle2
                  size={15}
                  className="mt-0.5 shrink-0 text-emerald-600"
                />
                Verify the property, availability, and payment terms before
                making a booking or paying a deposit.
              </p>
            </section>

            <Link
              to="/explore"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <ArrowLeft size={16} />
              Explore more hostels
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}
