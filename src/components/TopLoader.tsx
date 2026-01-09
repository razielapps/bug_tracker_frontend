"use client";

import { Suspense, useEffect } from "react";
import NProgress from "nprogress";
import { usePathname, useSearchParams } from "next/navigation";
import "nprogress/nprogress.css";

// Component that uses useSearchParams
function TopLoaderContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.configure({
      showSpinner: false,
      trickleSpeed: 150,
      minimum: 0.08,
    });

    // Start when route changes begin
    NProgress.start();

    // Finish after render
    const timeout = setTimeout(() => {
      NProgress.done();
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [pathname, searchParams]);

  return null;
}

// Main component with Suspense
export default function TopLoader() {
  return (
    <Suspense fallback={null}>
      <TopLoaderContent />
    </Suspense>
  );
}
