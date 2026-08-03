function LoadingSpinner({ message = "Loading..." }) {
  return (
    <div className="flex h-64 flex-col items-center justify-center gap-4">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-amber-200 border-t-[#6B4423]" />
      <p className="text-[#6B4423] font-medium">{message}</p>
    </div>
  );
}

export default LoadingSpinner;