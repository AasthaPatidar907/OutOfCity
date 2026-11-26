import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Building2, Eye, EyeOff, Lock, Mail, ShieldAlert, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { isEmail, isRequired, minLength, type FieldErrors } from "@/lib/validation";

export default function Register() {
  const { user, register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | undefined>();

  useEffect(() => {
    if (user) navigate("/explore", { replace: true });
  }, [user, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(undefined);
    const er: FieldErrors = {};
    if (!isRequired(name)) er.name = "Enter your name.";
    else if (!minLength(name, 2)) er.name = "Name is too short.";
    if (!isRequired(email)) er.email = "Enter your email.";
    else if (!isEmail(email)) er.email = "Enter a valid email.";
    if (!isRequired(password)) er.password = "Enter a password.";
    else if (!minLength(password, 6)) er.password = "Use at least 6 characters.";
    if (!isRequired(confirm)) er.confirm = "Confirm your password.";
    else if (confirm !== password) er.confirm = "Passwords do not match.";
    setErrors(er);
    if (Object.keys(er).length) return;
    const res = await register(name, email, password);
    if (!res.ok) setFormError(res.error);
    else navigate("/explore");
  };

  return (
    <div className="container-app py-12">
      <div className="mx-auto max-w-md">
        <div className="text-center mb-6">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-brand-600 text-white">
            <Building2 size={24} />
          </span>
          <h1 className="mt-4 font-display text-2xl font-bold text-slate-900">Create your account</h1>
          <p className="text-slate-500 text-sm">Save hostels and track your demo enquiries.</p>
        </div>

  

        <form onSubmit={submit} noValidate className="card p-6 space-y-4">
          <div>
            <label className="label" htmlFor="name">Full name</label>
            <div className="relative">
              <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input id="name" className={`input pl-9 ${errors.name ? "border-rose-400" : ""}`} value={name} onChange={(e) => { setName(e.target.value); setErrors((x) => ({ ...x, name: undefined })); }} placeholder="Your name" />
            </div>
            {errors.name && <p className="mt-1 text-xs text-rose-600">{errors.name}</p>}
          </div>

          <div>
            <label className="label" htmlFor="email">Email</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input id="email" type="email" className={`input pl-9 ${errors.email ? "border-rose-400" : ""}`} value={email} onChange={(e) => { setEmail(e.target.value); setErrors((x) => ({ ...x, email: undefined })); }} placeholder="you@example.com" />
            </div>
            {errors.email && <p className="mt-1 text-xs text-rose-600">{errors.email}</p>}
          </div>

          <div>
            <label className="label" htmlFor="password">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input id="password" type={show ? "text" : "password"} className={`input pl-9 pr-10 ${errors.password ? "border-rose-400" : ""}`} value={password} onChange={(e) => { setPassword(e.target.value); setErrors((x) => ({ ...x, password: undefined })); }} placeholder="At least 6 characters" />
              <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-600" aria-label={show ? "Hide password" : "Show password"}>
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-xs text-rose-600">{errors.password}</p>}
          </div>

          <div>
            <label className="label" htmlFor="confirm">Confirm password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input id="confirm" type={show ? "text" : "password"} className={`input pl-9 ${errors.confirm ? "border-rose-400" : ""}`} value={confirm} onChange={(e) => { setConfirm(e.target.value); setErrors((x) => ({ ...x, confirm: undefined })); }} placeholder="Re-enter password" />
            </div>
            {errors.confirm && <p className="mt-1 text-xs text-rose-600">{errors.confirm}</p>}
          </div>

          {formError && <p className="text-sm text-rose-600 bg-rose-50 rounded-lg px-3 py-2">{formError}</p>}

          <button type="submit" className="btn-primary w-full">Create account</button>

          <p className="text-center text-sm text-slate-600">
            Already have an account? <Link to="/login" className="font-semibold text-brand-700 hover:text-brand-800">Log in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
