export default function Spinner() {
  return (
    <div className="flex justify-center items-center w-full h-full py-8">
      <div className="relative flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-3 border-accent border-solid mb-2" />
      </div>
    </div>
  );
}
