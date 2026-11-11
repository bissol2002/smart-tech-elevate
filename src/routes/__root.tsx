import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
  Link,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { BackToTop } from "@/components/site/BackToTop";
import { site } from "@/content/site";
import { getCmsContent } from "@/lib/cms.functions";
import { CmsProvider } from "@/lib/cms";
import { Toaster } from "@/components/ui/sonner";
import { useCartSync } from "@/hooks/useCartSync";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-extrabold text-gradient">404</h1>
        <h2 className="mt-4 font-display text-xl font-bold text-ink">Page not found</h2>
        <p className="mt-2 text-sm text-ink-soft">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center justify-center rounded-full gradient-primary px-5 py-2.5 text-sm font-semibold text-white shadow-glow">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: unknown; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-xl font-bold text-ink">This page didn't load</h1>
        <p className="mt-2 text-sm text-ink-soft">Something went wrong on our end.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-full gradient-primary px-5 py-2.5 text-sm font-semibold text-white shadow-glow"
          >
            Try again
          </button>
          <a href="/" className="rounded-full border border-border bg-background px-5 py-2.5 text-sm font-semibold hover:bg-accent">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "author", content: site.name },
      { name: "theme-color", content: "#00A651" },
      { property: "og:site_name", content: site.name },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700;800;900&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: site.name,
          url: `https://${site.domain}`,
          email: site.email,
          telephone: site.phone,
          address: { "@type": "PostalAddress", streetAddress: site.address, addressCountry: "NG" },
          sameAs: Object.values(site.socials),
        }),
      },
    ],
  }),
  loader: () => getCmsContent(),
  staleTime: 5 * 60_000,
  shouldReload: false,
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try{if(localStorage.getItem('ismart-theme')==='dark')document.documentElement.classList.add('dark')}catch(e){}` }} />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const cms = Route.useLoaderData();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isAdmin = pathname.startsWith("/admin");
  useCartSync();
  // Scroll to top on route change
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior }); }, [pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <CmsProvider value={cms}>
        {!isAdmin && <Header />}
        <main className="min-h-screen">
          <Outlet />
        </main>
        {!isAdmin && (
          <>
            <Footer />
            <WhatsAppButton />
            <BackToTop />
          </>
        )}
        <Toaster position="top-right" richColors />
      </CmsProvider>
    </QueryClientProvider>
  );
}
