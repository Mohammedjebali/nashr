"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { useState } from "react";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <style>{`
        @keyframes navGradientSlide {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .nav-gradient-line {
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            oklch(0.78 0.145 70 / 0.4),
            oklch(0.78 0.145 70),
            oklch(0.78 0.145 70 / 0.4),
            transparent
          );
          background-size: 200% 100%;
          animation: navGradientSlide 4s ease infinite;
        }
        .logo-glow:hover .logo-icon {
          box-shadow: 0 0 16px oklch(0.78 0.145 70 / 0.5), 0 0 32px oklch(0.78 0.145 70 / 0.2);
        }
      `}</style>
      <div className="nav-gradient-line sticky top-0 z-50" />
      <nav className="border-b border-border/40 backdrop-blur-xl bg-background/70 sticky top-px z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="logo-glow flex items-center gap-2.5 group">
              <div className="logo-icon h-8 w-8 rounded-lg bg-primary flex items-center justify-center transition-all duration-300">
                <span className="text-primary-foreground font-bold text-sm">N</span>
              </div>
              <span className="text-lg font-semibold tracking-tight text-foreground">
                Nashr
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {[
                { href: "#features", label: "Features" },
                { href: "#how-it-works", label: "How It Works" },
                { href: "#pricing", label: "Pricing" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 relative after:absolute after:bottom-[-2px] after:left-0 after:h-px after:w-0 hover:after:w-full after:bg-primary/50 after:transition-all after:duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/login"
                className={buttonVariants({ variant: "ghost", size: "sm", className: "text-muted-foreground hover:text-foreground" })}
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className={buttonVariants({ size: "sm", className: "shadow-sm shadow-primary/20" })}
              >
                Get Started
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden flex items-center justify-center h-8 w-8 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile menu */}
          {mobileOpen && (
            <div className="md:hidden pb-4 border-t border-border/30 pt-4 space-y-3">
              {[
                { href: "#features", label: "Features" },
                { href: "#how-it-works", label: "How It Works" },
                { href: "#pricing", label: "Pricing" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-1 py-1.5"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center gap-3 pt-2">
                <Link href="/login" className={buttonVariants({ variant: "ghost", size: "sm" })}>
                  Sign In
                </Link>
                <Link href="/register" className={buttonVariants({ size: "sm" })}>
                  Get Started
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
