import Link from "next/link";
import { getUser } from "@/lib/supabase/server";
import { logoutAction } from "@/app/actions/auth";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  const name =
    user?.user_metadata?.full_name ?? user?.email ?? "User";
  const initial = name[0]?.toUpperCase() ?? "U";

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">
                N
              </span>
            </div>
            <span className="font-semibold tracking-tight">Nashr</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground">Free Plan</span>
            <form action={logoutAction}>
              <button
                type="submit"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Sign Out
              </button>
            </form>
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xs text-primary font-medium">
                {initial}
              </span>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
