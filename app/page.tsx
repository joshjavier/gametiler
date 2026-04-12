import { AppShell } from '@/components/AppShell';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-100 p-8">
      <div className="w-full max-w-4xl">
        <AppShell />
      </div>
    </div>
  );
}
