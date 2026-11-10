import { Button } from '@ag-portfolio/ui/components/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-24 text-center">
      <h1 className="text-5xl">404</h1>
      <p className="text-muted-foreground max-w-md">The page you are looking for does not exist.</p>
      <Button asChild>
        <Link href="/dashboard">Back to dashboard</Link>
      </Button>
    </div>
  );
}
