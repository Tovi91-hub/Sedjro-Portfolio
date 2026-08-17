import type { NextConfig } from "next";

/**
 * Security headers.
 *
 * CSP notes:
 * - 'unsafe-inline' in style-src is required by Next.js inline styles and
 *   the framer-motion style injection; scripts remain restricted to 'self'
 *   plus Next's inline bootstrap (covered by 'unsafe-inline' fallback for
 *   browsers without strict-dynamic support). Tighten with nonces later if
 *   desired — documented in DEPLOYMENT.md.
 * - Vercel Analytics/Speed Insights, if enabled later, need
 *   https://va.vercel-scripts.com added to script-src.
 */
// React's development mode relies on eval() for debugging features; allow it
// in dev only. Production keeps the strict policy.
const isDev = process.env.NODE_ENV === "development";

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  /**
   * Payments moved to sedjrodigital.com.
   *
   * This site's /pay charged a Stripe account that legally belongs to MyVital
   * Harmony LLC, so Sedjro Digital's revenue was landing in the wrong entity.
   * SEDJRO DIGITAL LLC now has its own activated account and its own payment
   * page, and the secret key behind this site's checkout has been rotated.
   *
   * Temporary (307) rather than permanent (308) on purpose: the FedaPay mobile
   * money surface under /pay is still pending KYC, and a 308 would be cached
   * hard by browsers if that path ever needs to come back here.
   */
  async redirects() {
    return [
      { source: "/pay", destination: "https://sedjrodigital.com/pay", permanent: false },
      { source: "/pay/:path*", destination: "https://sedjrodigital.com/pay", permanent: false },
    ];
  },
};

export default nextConfig;
