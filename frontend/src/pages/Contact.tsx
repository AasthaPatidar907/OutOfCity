import { useState } from "react";
import { CheckCircle2, Mail, MapPin, MessageSquare, Phone, Send, User } from "lucide-react";
import { isEmail, isPhoneIN, isRequired, minLength, type FieldErrors } from "@/lib/validation";

export default function Contact() {
  const [values, setValues] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [sent, setSent] = useState(false);

  const update = (field: string, value: string) => {
    setValues((v) => ({ ...v, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: FieldErrors = {};
    if (!isRequired(values.name)) er.name = "Enter your name.";
    else if (values.name.trim().length < 2) er.name = "Name is too short.";
    if (!isRequired(values.email)) er.email = "Enter your email.";
    else if (!isEmail(values.email)) er.email = "Enter a valid email.";
    if (values.phone && !isPhoneIN(values.phone)) er.phone = "Enter a valid 10-digit Indian number.";
    if (!isRequired(values.message)) er.message = "Enter a message.";
    else if (values.message.trim().length < 10) er.message = "Message should be at least 10 characters.";
    setErrors(er);
    if (Object.keys(er).length) return;
    setSent(true);
    setValues({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="container-app py-10">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <span className="badge bg-brand-100 text-brand-700">Contact us</span>
          <h1 className="mt-3 font-display text-3xl font-bold text-slate-900">Get in touch</h1>
          <p className="mt-3 text-slate-600">
            Questions, feedback or listing requests? Send us a message and we'll get back to you.

          </p>

          <div className="mt-8 space-y-4">
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand-100 text-brand-700"><Mail size={18} /></span>
              <div>
                <p className="font-medium text-slate-900">Email</p>
                <p className="text-sm text-slate-500">hello@outofcity.demo</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand-100 text-brand-700"><Phone size={18} /></span>
              <div>
                <p className="font-medium text-slate-900">Phone</p>
                <p className="text-sm text-slate-500">+91 98765 43210 (demo)</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand-100 text-brand-700"><MapPin size={18} /></span>
              <div>
                <p className="font-medium text-slate-900">Address</p>
                <p className="text-sm text-slate-500">Vijay Nagar, Indore, Madhya Pradesh (demo)</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          {sent ? (
            <div className="card p-8 text-center">
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-emerald-100 text-emerald-600">
                <CheckCircle2 size={26} />
              </span>
              <h3 className="mt-4 font-display font-semibold text-slate-900">Message received</h3>
              <p className="mt-1 text-sm text-slate-600">
                Thanks for reaching out. This is a demo form, so no message was actually sent.
              </p>
              <button onClick={() => setSent(false)} className="btn-secondary mt-5">Send another message</button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="card p-6 space-y-4">
              <div>
                <label className="label" htmlFor="c-name">Name</label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input id="c-name" className={`input pl-9 ${errors.name ? "border-rose-400" : ""}`} value={values.name} onChange={(e) => update("name", e.target.value)} placeholder="Your name" />
                </div>
                {errors.name && <p className="mt-1 text-xs text-rose-600">{errors.name}</p>}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="label" htmlFor="c-email">Email</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input id="c-email" type="email" className={`input pl-9 ${errors.email ? "border-rose-400" : ""}`} value={values.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" />
                  </div>
                  {errors.email && <p className="mt-1 text-xs text-rose-600">{errors.email}</p>}
                </div>
                <div>
                  <label className="label" htmlFor="c-phone">Phone (optional)</label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input id="c-phone" type="tel" className={`input pl-9 ${errors.phone ? "border-rose-400" : ""}`} value={values.phone} onChange={(e) => update("phone", e.target.value)} placeholder="9876543210" />
                  </div>
                  {errors.phone && <p className="mt-1 text-xs text-rose-600">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label className="label" htmlFor="c-msg">Message</label>
                <div className="relative">
                  <MessageSquare size={16} className="absolute left-3 top-3 text-slate-400" />
                  <textarea id="c-msg" rows={5} className={`input pl-9 resize-none ${errors.message ? "border-rose-400" : ""}`} value={values.message} onChange={(e) => update("message", e.target.value)} placeholder="How can we help?" />
                </div>
                {errors.message && <p className="mt-1 text-xs text-rose-600">{errors.message}</p>}
              </div>

              <button type="submit" className="btn-primary w-full"><Send size={16} /> Send message</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
