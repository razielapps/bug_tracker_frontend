import { Menu } from "lucide-react";
import Link from "next/link";
import { clearTokens } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export function Header({ toggleSidebar }: { toggleSidebar: () => void }) {
  const router = useRouter()
  const handleLogOut = () => {
    router.push("/login")
    clearTokens()
  }
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <button className="md:hidden text-gray-700 dark:text-white" onClick={toggleSidebar}>
        <Menu className="h-6 w-6" />
      </button>
      <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Dashboard</h1>
      <div className="nav-links">
        <span><Link href="/">Home</Link></span>
        <span><Link href="/dashboard/bugs">Issues</Link> </span>
        <span><button className="spn-btn" onClick={handleLogOut}>Logout</button></span>

      </div>
    </header>
  );
}
