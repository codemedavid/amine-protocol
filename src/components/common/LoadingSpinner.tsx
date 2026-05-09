import { Spinner } from '@/components/ui/spinner';

export default function LoadingSpinner() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <Spinner className="text-secondary" />
    </div>
  );
}
