import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div style={{ display:"flex", minHeight:"100vh", alignItems:"center", justifyContent:"center", padding:"0 16px" }}>
      <div style={{ maxWidth:"400px", textAlign:"center" }}>
        <h1 style={{ fontSize:"72px", fontWeight:"bold" }}>404</h1>
        <h2 style={{ marginTop:"16px", fontSize:"20px" }}>Page not found</h2>
        <div style={{ marginTop:"24px" }}>
          <Link to="/" style={{ padding:"10px 20px", background:"#111", color:"#fff", borderRadius:"8px", textDecoration:"none" }}>
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => { console.error(error); }, [error]);
  return (
    <div style={{ display:"flex", minHeight:"100vh", alignItems:"center", justifyContent:"center", padding:"0 16px" }}>
      <div style={{ maxWidth:"400px", textAlign:"center" }}>
        <h1 style={{ fontSize:"20px" }}>Something went wrong</h1>
        <div style={{ marginTop:"24px", display:"flex", gap:"8px", justifyContent:"center", flexWrap:"wrap" }}>
          <button onClick={() => { router.invalidate(); reset(); }} style={{ padding:"10px 20px", background:"#111", color:"#fff", border:"none", borderRadius:"8px", cursor:"pointer" }}>
            Try again
          </button>
          <a href="/" style={{ padding:"10px 20px", border:"1px solid #ddd", borderRadius:"8px", textDecoration:"none", color:"#111" }}>
            Go home
          </a>
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
      { title: "Portfolio — Aysel Mohbaliyeva, iOS Developer" },
      { name: "description", content: "iOS Developer from Baku. Swift & SwiftUI. 4 shipped apps." },
      { name: "author", content: "Aysel Mohbaliyeva" },
      { property: "og:title", content: "Portfolio — Aysel Mohbaliyeva, iOS Developer" },
      { property: "og:description", content: "iOS Developer from Baku. Swift & SwiftUI. 4 shipped apps." },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
