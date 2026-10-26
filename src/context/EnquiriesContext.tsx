import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Enquiry } from "@/types";
import { load, save, uid } from "@/lib/storage";

const STORAGE_KEY = "ooc_enquiries";

interface EnquiryInput {
  hostelId: string;
  hostelName: string;
  name: string;
  email: string;
  phone: string;
  moveInDate: string;
  message: string;
}

interface EnquiriesContextValue {
  enquiries: Enquiry[];
  addEnquiry: (input: EnquiryInput) => Enquiry;
  removeEnquiry: (id: string) => void;
  clearAll: () => void;
}

const EnquiriesContext = createContext<EnquiriesContextValue | null>(null);

export function EnquiriesProvider({ children }: { children: React.ReactNode }) {
  const [enquiries, setEnquiries] = useState<Enquiry[]>(() => load<Enquiry[]>(STORAGE_KEY, []));

  useEffect(() => {
    save(STORAGE_KEY, enquiries);
  }, [enquiries]);

  const addEnquiry = useCallback((input: EnquiryInput): Enquiry => {
    const enq: Enquiry = {
      id: uid(),
      ...input,
      createdAt: new Date().toISOString(),
    };
    setEnquiries((prev) => [enq, ...prev]);
    return enq;
  }, []);

  const removeEnquiry = useCallback((id: string) => {
    setEnquiries((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const clearAll = useCallback(() => setEnquiries([]), []);

  const value = useMemo<EnquiriesContextValue>(
    () => ({ enquiries, addEnquiry, removeEnquiry, clearAll }),
    [enquiries, addEnquiry, removeEnquiry, clearAll]
  );

  return <EnquiriesContext.Provider value={value}>{children}</EnquiriesContext.Provider>;
}

export function useEnquiries() {
  const ctx = useContext(EnquiriesContext);
  if (!ctx) throw new Error("useEnquiries must be used within EnquiriesProvider");
  return ctx;
}
