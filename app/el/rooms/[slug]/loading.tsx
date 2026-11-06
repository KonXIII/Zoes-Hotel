// Suspense fallback for the room pages (cacheComponents: params are read inside a boundary).
export default function Loading() {
  return <div className="min-h-[100svh] bg-limestone" aria-busy="true" />;
}
