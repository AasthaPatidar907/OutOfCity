import { Link } from "react-router-dom";
import { Building2, Github, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white">
      <div className="container-app py-12 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-600 text-white">
              <Building2 size={20} />
            </span>
            <span className="font-display text-lg font-extrabold tracking-tight text-slate-900">
              Out<span className="text-brand-600">Of</span>City
            </span>
          </Link>
          <p className="mt-3 text-sm text-slate-600 max-w-sm">
            Helping students relocating to Indore find a comfortable place to stay. Browse demo
            hostel listings, compare localities and save your favourites.
          </p>
          <p className="mt-3 text-xs text-slate-400">
            Demo platform. Listings are sample data, not verified real properties.
          </p>
        </div>

        <div>
          <h4 className="font-display font-semibold text-slate-900 mb-3">Explore</h4>
          <ul className="space-y-2 text-sm text-slate-600">
            <li><Link to="/explore" className="hover:text-brand-700">Hostels</Link></li>
            <li><Link to="/wishlist" className="hover:text-brand-700">Wishlist</Link></li>
            <li><Link to="/bookings" className="hover:text-brand-700">My Bookings</Link></li>
            <li><Link to="/about" className="hover:text-brand-700">About</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-slate-900 mb-3">Get in touch</h4>
          <ul className="space-y-2 text-sm text-slate-600">
            <li className="flex items-center gap-2"><Mail size={15} className="text-brand-500" /> hello@outofcity.demo</li>
            <li className="flex items-center gap-2"><MapPin size={15} className="text-brand-500" /> Indore, Madhya Pradesh</li>
            <li className="flex items-center gap-2"><Github size={15} className="text-brand-500" /> outofcity/demo</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-100 py-5 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} OutOfCity. Built as a student project. Not affiliated with any real hostel business.
      </div>
    </footer>
  );
}
