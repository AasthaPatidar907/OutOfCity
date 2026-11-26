import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Building2, Heart, LayoutDashboard, LogOut, Menu, User as UserIcon, X } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/explore", label: "Explore Hostels" },
  { to: "/wishlist", label: "Wishlist" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
const { count, clear } = useWishlist();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

const handleLogout = () => {
  clear();
  localStorage.removeItem("ooc_wishlist");
  logout();
  setOpen(false);
  navigate("/");
};
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-200">
      <nav className="container-app flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-600 text-white">
            <Building2 size={20} />
          </span>
          <span className="font-display text-lg font-extrabold tracking-tight text-slate-900">
            Out<span className="text-brand-600">Of</span>City
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `relative px-3 py-2 text-sm font-medium rounded-lg transition ${
                  isActive
                    ? "text-brand-700 bg-brand-50"
                    : "text-slate-600 hover:text-brand-700 hover:bg-slate-50"
                }`
              }
            >
              {item.label}
              {item.to === "/wishlist" && count > 0 && (
                <span className="ml-1.5 inline-flex items-center justify-center rounded-full bg-rose-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                  {count}
                </span>
              )}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2">
          {user ? (
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-2 text-sm text-slate-600">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-brand-100 text-brand-700">
                  <UserIcon size={16} />
                </span>
                {user.name.split(" ")[0]}
              </span>
              <button onClick={handleLogout} className="btn-ghost" aria-label="Log out">
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn-ghost text-sm">Log in</Link>
              <Link to="/register" className="btn-primary text-sm">Sign up</Link>
            </>
          )}
        </div>

        <button
          className="md:hidden btn-ghost"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="container-app py-3 flex flex-col gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium ${
                    isActive ? "text-brand-700 bg-brand-50" : "text-slate-700 hover:bg-slate-50"
                  }`
                }
              >
                {item.to === "/wishlist" ? <Heart size={16} /> : item.to === "/bookings" ? <LayoutDashboard size={16} /> : null}
                {item.label}
                {item.to === "/wishlist" && count > 0 && (
                  <span className="ml-auto rounded-full bg-rose-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                    {count}
                  </span>
                )}
              </NavLink>
            ))}
            <div className="mt-2 pt-3 border-t border-slate-100 flex flex-col gap-2">
              {user ? (
                <>
                  <span className="px-3 text-sm text-slate-600">Signed in as {user.name}</span>
                  <button onClick={handleLogout} className="btn-secondary">Log out</button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setOpen(false)} className="btn-secondary">Log in</Link>
                  <Link to="/register" onClick={() => setOpen(false)} className="btn-primary">Sign up</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
