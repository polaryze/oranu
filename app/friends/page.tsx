import { AuthGuard } from "@/components/auth/auth-guard"

export default function FriendsPage() {
  return (
    <AuthGuard>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Friends</h1>
        <p className="text-muted-foreground">Add and view friends. Streaks and social features coming soon.</p>
      </div>
    </AuthGuard>
  )
}


