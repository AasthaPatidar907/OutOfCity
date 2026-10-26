import { Link } from "react-router-dom";
import { Calendar, Mail, MapPin, Phone, Trash2, User } from "lucide-react";
import { getHostelById } from "@/data/hostels";
import { useEnquiries } from "@/context/EnquiriesContext";
import { formatDate } from "@/lib/storage";

export default function MyBookings() {
  const { enquiries, removeEnquiry, clearAll } = useEnquiries();

  return (
    <div className="container-app py-8">
      <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-slate-900">My Bookings</h1>
          <p className="text-slate-500 mt-1">
            Your demo enquiries. No real bookings are made on this platform.
          </p>
        </div>
        {enquiries.length > 0 && (
          <button onClick={clearAll} className="btn-ghost text-sm text-rose-600 hover:bg-rose-50">Clear all</button>
        )}
      </div>

      {enquiries.length === 0 ? (
        <div className="card p-12 text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-slate-100 text-slate-400">
            <Calendar size={26} />
          </span>
          <h3 className="mt-4 font-display font-semibold text-slate-900">No enquiries yet</h3>
          <p className="mt-1 text-sm text-slate-500">
            Open a hostel and submit the enquiry form to see it here.
          </p>
          <Link to="/explore" className="btn-primary mt-5 inline-flex">Explore hostels</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {enquiries.map((e) => {
            const hostel = getHostelById(e.hostelId);
            return (
              <div key={e.id} className="card p-5 flex flex-col sm:flex-row gap-4">
                {hostel && (
                  <Link to={`/hostel/${hostel.id}`} className="shrink-0">
                    <img src={hostel.images[0]} alt={hostel.name} className="h-24 w-full sm:w-32 rounded-lg object-cover" />
                  </Link>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link to={`/hostel/${e.hostelId}`} className="font-display font-semibold text-slate-900 hover:text-brand-700">
                        {e.hostelName}
                      </Link>
                      <p className="text-xs text-slate-400">Enquired on {formatDate(e.createdAt)}</p>
                    </div>
                    <button
                      onClick={() => removeEnquiry(e.id)}
                      className="text-slate-400 hover:text-rose-600"
                      aria-label="Delete enquiry"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2 text-sm">
                    <span className="flex items-center gap-2 text-slate-600"><User size={14} className="text-brand-500" /> {e.name}</span>
                    <span className="flex items-center gap-2 text-slate-600"><Mail size={14} className="text-brand-500" /> {e.email}</span>
                    <span className="flex items-center gap-2 text-slate-600"><Phone size={14} className="text-brand-500" /> {e.phone}</span>
                    <span className="flex items-center gap-2 text-slate-600"><Calendar size={14} className="text-brand-500" /> {formatDate(e.moveInDate)}</span>
                  </div>

                  {hostel && (
                    <p className="mt-2 flex items-center gap-1 text-xs text-slate-500">
                      <MapPin size={12} className="text-brand-500" /> {hostel.locality}
                    </p>
                  )}
                  <p className="mt-2 text-sm text-slate-600 bg-slate-50 rounded-lg p-3">{e.message}</p>

                  <span className="mt-2 inline-flex items-center gap-1 badge bg-amber-100 text-amber-700">
                    Demo enquiry — not a confirmed booking
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
