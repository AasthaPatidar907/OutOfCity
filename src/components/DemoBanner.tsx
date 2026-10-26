interface DemoBannerProps {
  message?: string;
}

export default function DemoBanner({ message }: DemoBannerProps) {
  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm text-amber-800">
      {message ?? "This is demo data. Listings are sample properties, not verified or bookable."}
    </div>
  );
}
