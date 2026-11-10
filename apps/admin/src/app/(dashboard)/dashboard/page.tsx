import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const STATS = [
  { label: 'Total Views', value: '—' },
  { label: 'Projects', value: '—' },
  { label: 'Messages', value: '—' },
  { label: 'Uptime', value: '—' },
];

export default function DashboardOverviewPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-4xl">Overview</h1>
        <p className="text-muted-foreground">Dashboard foundation — modules are not wired yet.</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => (
          <Card key={stat.label}>
            <CardHeader>
              <CardDescription>{stat.label}</CardDescription>
              <CardTitle>{stat.value}</CardTitle>
            </CardHeader>
            <CardContent />
          </Card>
        ))}
      </div>
    </div>
  );
}
