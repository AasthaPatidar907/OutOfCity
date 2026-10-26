import { Link } from "react-router-dom";
import { Building2 } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container-app py-24 text-center">
      <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-brand-100 text-brand-700">
        <Building2 size={30} />
      </span>
      <h1 className="mt-6 font-display text-3xl font-bold text-slate-900">Page not found</h1>
      <p className="mt-2 text-slate-500">The page you're looking for doesn't exist or has moved.</p>
      <Link to="/" className="btn-primary mt-6 inline-flex">Back to home</Link>
    </div>
  );
}
