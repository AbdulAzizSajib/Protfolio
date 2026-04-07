export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-16 h-16">
          <div className="absolute w-full h-full border-4 border-blue-200 rounded-full" />
          <div className="absolute w-full h-full border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
        <p className="text-lg font-medium text-gray-300">Loading...</p>
      </div>
    </div>
  );
}
