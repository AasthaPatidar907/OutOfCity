import { useState } from "react";
import type { Hostel } from "@/types";
import { useEnquiries } from "@/context/EnquiriesContext";
import { isEmail, isPhoneIN, isRequired, type FieldErrors } from "@/lib/validation";
import { Calendar, CheckCircle2, Mail, MessageSquare, Phone, User } from "lucide-react";

interface EnquiryFormProps {
  hostel: Hostel;
  onSubmitted?: () => void;
}

export default function EnquiryForm({ hostel, onSubmitted }: EnquiryFormProps) {
  const { addEnquiry } = useEnquiries();
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    moveInDate: "",
    message: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const update = (field: string, value: string) => {
    setValues((v) => ({ ...v, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const validate = (): boolean => {
    const e: FieldErrors = {};
    if (!isRequired(values.name)) e.name = "Please enter your name.";
    else if (values.name.trim().length < 2) e.name = "Name is too short.";
    if (!isRequired(values.email)) e.email = "Please enter your email.";
    else if (!isEmail(values.email)) e.email = "Enter a valid email address.";
    if (!isRequired(values.phone)) e.phone = "Please enter your phone number.";
    else if (!isPhoneIN(values.phone)) e.phone = "Enter a valid 10-digit Indian mobile number.";
    if (!isRequired(values.moveInDate)) e.moveInDate = "Choose a preferred move-in date.";
    else if (new Date(values.moveInDate) < new Date(new Date().toDateString()))
      e.moveInDate = "Move-in date cannot be in the past.";
    if (!isRequired(values.message)) e.message = "Add a short message.";
    else if (values.message.trim().length < 10) e.message = "Message should be at least 10 characters.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    addEnquiry({
      hostelId: hostel.id,
      hostelName: hostel.name,
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      moveInDate: values.moveInDate,
      message: values.message.trim(),
    });
    setSubmitted(true);
    setValues({ name: "", email: "", phone: "", moveInDate: "", message: "" });
    onSubmitted?.();
  };

  if (submitted) {
    return (
      <div className="card p-6 text-center">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 size={26} />
        </span>
        <h3 className="mt-4 font-display font-semibold text-slate-900">Enquiry submitted</h3>
        <p className="mt-1 text-sm text-slate-600">
          This is a demo enquiry for <span className="font-medium">{hostel.name}</span>. No real
          booking has been made. You can view it in My Bookings.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="btn-secondary mt-5"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="card p-6 space-y-4">
      <div>
        <h3 className="font-display font-semibold text-slate-900">Enquire about this hostel</h3>
        <p className="text-sm text-slate-500">Fill in your details — this is a demo enquiry, not a real booking.</p>
      </div>

      <div>
        <label className="label" htmlFor="eq-name">Full name</label>
        <div className="relative">
          <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input id="eq-name" className={`input pl-9 ${errors.name ? "border-rose-400 focus:border-rose-400 focus:ring-rose-100" : ""}`} value={values.name} onChange={(e) => update("name", e.target.value)} placeholder="Your name" />
        </div>
        {errors.name && <p className="mt-1 text-xs text-rose-600">{errors.name}</p>}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="eq-email">Email</label>
          <div className="relative">
            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input id="eq-email" type="email" className={`input pl-9 ${errors.email ? "border-rose-400" : ""}`} value={values.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" />
          </div>
          {errors.email && <p className="mt-1 text-xs text-rose-600">{errors.email}</p>}
        </div>
        <div>
          <label className="label" htmlFor="eq-phone">Phone</label>
          <div className="relative">
            <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input id="eq-phone" type="tel" className={`input pl-9 ${errors.phone ? "border-rose-400" : ""}`} value={values.phone} onChange={(e) => update("phone", e.target.value)} placeholder="9876543210" />
          </div>
          {errors.phone && <p className="mt-1 text-xs text-rose-600">{errors.phone}</p>}
        </div>
      </div>

      <div>
        <label className="label" htmlFor="eq-date">Preferred move-in date</label>
        <div className="relative">
          <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input id="eq-date" type="date" className={`input pl-9 ${errors.moveInDate ? "border-rose-400" : ""}`} value={values.moveInDate} onChange={(e) => update("moveInDate", e.target.value)} />
        </div>
        {errors.moveInDate && <p className="mt-1 text-xs text-rose-600">{errors.moveInDate}</p>}
      </div>

      <div>
        <label className="label" htmlFor="eq-msg">Message</label>
        <div className="relative">
          <MessageSquare size={16} className="absolute left-3 top-3 text-slate-400" />
          <textarea id="eq-msg" rows={4} className={`input pl-9 resize-none ${errors.message ? "border-rose-400" : ""}`} value={values.message} onChange={(e) => update("message", e.target.value)} placeholder="Tell the host about your requirements..." />
        </div>
        {errors.message && <p className="mt-1 text-xs text-rose-600">{errors.message}</p>}
      </div>

      <button type="submit" className="btn-primary w-full">Submit enquiry</button>
    </form>
  );
}
