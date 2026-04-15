"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/app/actions/auth";

export function LogoutButton() {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      variant="ghost"
      size="sm"
      className="h-8 text-xs text-muted-foreground hover:text-foreground"
      disabled={isPending}
      onClick={() => startTransition(() => logoutAction())}
    >
      {isPending ? "..." : "Sign out"}
    </Button>
  );
}
