import Link from "next/link";
import { getUser } from "@/lib/supabase/server";
import { LogoutButton } from "../logout-button";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  const name =
    user?.user_metadata?.full_name ?? user?.email?.split("@")[0] ?? "User";
  const initial = name.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">
                N
              </span>
            </div>
            <span className="font-semibold tracking-tight">Nashr</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-muted-foreground bg-muted px-2 py-0.5 rounded-md">
              Free
            </span>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xs text-primary font-medium">
                  {initial}
                </span>
              </div>
              <span className="text-sm text-muted-foreground hidden sm:inline">
                {name}
              </span>
            </div>
            <LogoutButton />
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
