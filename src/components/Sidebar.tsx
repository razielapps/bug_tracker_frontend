"use client";

import { X, Home, FileText, Folder, Info, MessageSquare, LogOut } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import { clearTokens } from '@/lib/auth';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from "react";

export function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (v: boolean) => void }) {
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleLogOut = () => {
    router.push("/login");
    clearTokens();
  };

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(path + '/');
  };

  const navItems = [
    { href: "/dashboard", icon: Home, label: "Dashboard", badge: null },
    { href: "/dashboard/bugs", icon: FileText, label: "Issues", badge: null },
    { href: "/info", icon: Folder, label: "Features Info", badge: null },
    { href: "/feedback", icon: MessageSquare, label: "Feedback", badge: null },
  ];

  if (!isMobile) return null;

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden animate-fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={clsx(
          "fixed z-50 inset-y-0 left-0 w-64 bg-card border-r border-border transform transition-all duration-300 ease-in-out shadow-xl",
          {
            "-translate-x-full": !isOpen,
            "translate-x-0": isOpen,
          }
        )}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gradient-primary rounded-md flex items-center justify-center">
              <FileText className="h-4 w-4 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">Navigation</h2>
              <p className="text-xs text-muted-foreground">OurBugTracker</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)} 
            className="text-muted-foreground hover:text-foreground hover:bg-accent p-1.5 rounded-md transition-colors"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={clsx(
                "flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200",
                isActive(item.href)
                  ? "bg-primary/10 text-primary font-medium border-l-2 border-primary"
                  : "text-foreground/70 hover:text-foreground hover:bg-accent/50"
              )}
            >
              <item.icon className={clsx(
                "h-4.5 w-4.5",
                isActive(item.href) ? "text-primary" : "text-muted-foreground"
              )} />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="px-1.5 py-0.5 text-xs rounded-full bg-primary/20 text-primary">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}

          {/* Divider */}
          <div className="h-px bg-border my-2"></div>

          {/* Logout Button */}
          <button
            onClick={() => {
              setIsOpen(false);
              handleLogOut();
            }}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-md text-destructive hover:bg-destructive/10 transition-colors text-left"
          >
            <LogOut className="h-4.5 w-4.5" />
            <span>Logout</span>
          </button>
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border bg-card/95">
          <div className="text-xs text-muted-foreground">
            <div className="font-medium text-foreground mb-1">Current User</div>
            <div className="truncate">Logged In</div>
          </div>
        </div>
      </aside>
    </>
  );
}