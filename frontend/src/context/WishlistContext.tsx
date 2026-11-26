
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { load, save } from "@/lib/storage";

const STORAGE_KEY = "ooc_wishlist";

interface WishlistContextValue {
  ids: string[];
  isWishlisted: (id: string) => boolean;
  toggle: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  count: number;
}

const WishlistContext =
  createContext<WishlistContextValue | null>(null);

export function WishlistProvider({
  children,
}: {
  children: React.ReactNode;
}) {
 const [ids, setIds] = useState<string[]>(() => {
  const saved = load<string[]>(STORAGE_KEY, []);
  return saved;
});
  useEffect(() => {
    save(STORAGE_KEY, ids);
  }, [ids]);

  const toggle = useCallback((id: string) => {
    setIds((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  }, []);

  const remove = useCallback((id: string) => {
    setIds((prev) => prev.filter((x) => x !== id));
  }, []);

  const clear = useCallback(() => setIds([]), []);

  const value = useMemo(
    () => ({
      ids,
      isWishlisted: (id: string) => ids.includes(id),
      toggle,
      remove,
      clear,
      count: ids.length,
    }),
    [ids, toggle, remove, clear]
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);

  if (!ctx) {
    throw new Error(
      "useWishlist must be used within WishlistProvider"
    );
  }

  return ctx;
}
