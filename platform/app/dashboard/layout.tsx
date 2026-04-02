import { AppShell } from "@/components/app-shell"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AppShell
      isAdmin={false}
      isDemoMode={false}
    >
      {children}
    </AppShell>
  )
}
