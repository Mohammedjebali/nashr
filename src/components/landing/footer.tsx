"use client";

import Link from "next/link";

export function Footer() {
  return (
    <>
      <style>{`
        .footer-link {
          position: relative;
          transition: color 0.2s;
        }
        .footer-link:hover {
          color: oklch(0.93 0.005 80);
        }
        .footer-link::after {
          content: "";
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 0;
          height: 1px;
          background: oklch(0.78 0.145 70 / 0.4);
          transition: width 0.3s ease;
        }
        .footer-link:hover::after {
          width: 100%;
        }
        .social-icon {
          transition: color 0.2s, background-color 0.2s, transform 0.2s;
        }
        .social-icon:hover {
          color: oklch(0.78 0.145 70);
          background-color: oklch(0.78 0.145 70 / 0.1);
          transform: translateY(-1px);
        }
      `}</style>
      <footer className="relative pt-16 pb-10">
        {/* Gradient separator */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
            {/* Brand column */}
            <div>
              <div className="flex items-center gap-2.5 mb-5">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center shadow-sm shadow-primary/20">
                  <span className="text-primary-foreground font-bold text-sm">N</span>
                </div>
                <span className="font-semibold text-foreground tracking-tight">Nashr</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                AI-powered content repurposing built for MENA creators, agencies, and coaches.
              </p>
              {/* Social icons */}
              <div className="flex items-center gap-2">
                {/* X (Twitter) */}
                <a href="#" className="social-icon h-8 w-8 rounded-lg flex items-center justify-center text-muted-foreground" aria-label="X (Twitter)">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                {/* LinkedIn */}
                <a href="#" className="social-icon h-8 w-8 rounded-lg flex items-center justify-center text-muted-foreground" aria-label="LinkedIn">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                {/* Instagram */}
                <a href="#" className="social-icon h-8 w-8 rounded-lg flex items-center justify-center text-muted-foreground" aria-label="Instagram">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Product column */}
            <div>
              <h4 className="font-medium text-sm text-foreground mb-5">Product</h4>
              <ul className="space-y-3">
                {["Features", "Pricing", "Changelog", "API"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="footer-link text-sm text-muted-foreground">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources column */}
            <div>
              <h4 className="font-medium text-sm text-foreground mb-5">Resources</h4>
              <ul className="space-y-3">
                {["Documentation", "Blog", "Support", "Contact"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="footer-link text-sm text-muted-foreground">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Languages column */}
            <div>
              <h4 className="font-medium text-sm text-foreground mb-5">Languages</h4>
              <ul className="space-y-3">
                {[
                  { label: "English", sublabel: "Global" },
                  { label: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629", sublabel: "Arabic" },
                  { label: "Fran\u00E7ais", sublabel: "French" },
                ].map((lang) => (
                  <li key={lang.label}>
                    <Link href="#" className="footer-link text-sm text-muted-foreground">
                      {lang.label}{" "}
                      <span className="text-muted-foreground/40">/ {lang.sublabel}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="relative pt-8">
            {/* Gradient separator line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-muted-foreground/60">
                {new Date().getFullYear()} Nashr. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                {["Privacy", "Terms", "Cookies"].map((item) => (
                  <Link
                    key={item}
                    href="#"
                    className="footer-link text-xs text-muted-foreground/60"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
