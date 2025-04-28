import Spinner from './spinner';

export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary bg-opacity-80">
      <Spinner />
    </div>
  );
}
