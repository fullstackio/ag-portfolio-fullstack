import { Button } from '@ag-portfolio/ui/components/button';

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-24 text-center">
      <h1 className="text-5xl">Portfolio Foundation Ready</h1>
      <p className="text-muted-foreground max-w-md">
        This is the base scaffold for the public portfolio application. Feature pages have not been
        implemented yet.
      </p>
      <Button>Get started</Button>
    </main>
  );
}
