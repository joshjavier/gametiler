import { AppShell } from '@/components/AppShell';

interface Props {
  params: Promise<{ brand: string; state: string }>;
}

export default async function LabelPage({ params }: Props) {
  const { brand, state } = await params;
  return <AppShell brand={brand} state={state} />;
}
