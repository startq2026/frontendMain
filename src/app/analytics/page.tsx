
export default function DataPage() {
  return (
    <div className="h-[calc(100vh-7rem)] min-h-[720px] overflow-hidden rounded-2xl border border-gray-200 bg-gray-950 shadow-sm dark:border-gray-700">
      <iframe
        src="/backend-data/analytics.html"
        title="StarQ Analytics Dashboard"
        className="h-full w-full border-0"
      />
    </div>
  );
}
