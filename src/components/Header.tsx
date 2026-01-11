import { Menu, Bug, Home, FileText, Folder, User, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clearTokens } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export function Header({ toggleSidebar }: { toggleSidebar: () => void }) {
  const router = useRouter();
  const pathname = usePathname();
  
  const handleLogOut = () => {
    router.push("/login");
    clearTokens();
  };

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(path + '/');
  };

  return (
    <header className="github-nav border-b border-border">
      <div className="github-container-navbar">
        <div className="flex items-center justify-between h-14">
          {/* Left side - Menu button and logo */}
          <div className="flex items-center gap-3 md:gap-6">
            <button 
              className="md:hidden text-foreground hover:text-primary transition-colors p-1.5 -ml-1.5"
              onClick={toggleSidebar}
              aria-label="Toggle menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            
            <Link href="/dashboard" className="github-nav-logo flex items-center gap-2.5 hover:opacity-90 transition-opacity">
              
              <span className="font-semibold whitespace-nowrap">OurBugTracker</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 ml-2">
              <Link 
                href="/dashboard" 
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  isActive('/dashboard') && !isActive('/dashboard/bugs') && !isActive('/dashboard/project')
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground/70 hover:text-foreground hover:bg-accent'
                }`}
              >
                <Home className="h-4 w-4" />
                Dashboard
              </Link>
              
              <Link 
                href="/dashboard/bugs" 
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  isActive('/dashboard/bugs')
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground/70 hover:text-foreground hover:bg-accent'
                }`}
              >
                <FileText className="h-4 w-4" />
                Issues
              </Link>
              
              <Link 
                href="/info" 
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  isActive('/info') || isActive('/feedback')
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground/70 hover:text-foreground hover:bg-accent'
                }`}
              >
                <Folder className="h-4 w-4" />
                Info
              </Link>
            </nav>
          </div>

          {/* Right side - User actions */}
          <div className="flex items-center gap-3">
            {/* Desktop logout button */}
            <button 
              onClick={handleLogOut}
              className="hidden md:flex items-center gap-1.5 github-btn-outline py-1.5 px-3 text-sm hover:border-destructive hover:text-destructive transition-colors"
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
            
            {/* Mobile logout button */}
            <button 
              onClick={handleLogOut}
              className="md:hidden github-btn-outline p-1.5 text-sm hover:border-destructive hover:text-destructive transition-colors"
              title="Logout"
              aria-label="Logout"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}