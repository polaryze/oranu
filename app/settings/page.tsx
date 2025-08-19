import { AuthGuard } from "@/components/auth/auth-guard"

export default function SettingsPage() {
  return (
    <AuthGuard>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Account and preferences coming soon.</p>
      </div>
    </AuthGuard>
  )
}


