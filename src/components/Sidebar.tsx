import { X } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import { clearTokens } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

export function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (v: boolean) => void }) {
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter()
  const handleLogOut = () => {
    router.push("/")
    clearTokens()
  }


  useEffect(() => {
    // Function to check screen width
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    // Clean up the event listener
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);
  if (!isMobile) return null;
  return (

    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={clsx(
          "fixed z-40 inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700 transform transition-transform duration-300 ease-in-out",
          {
            "-translate-x-full md:translate-x-0": !isOpen,
            "translate-x-0": isOpen,
          }
        )}
      >
        <div className="flex justify-between items-center px-4 py-3 md:hidden">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Menu</h2>
          <button onClick={() => setIsOpen(false)} className="text-gray-700 dark:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-4 px-4 space-y-2">
          <Link href="/dashboard" className="block text-gray-700 dark:text-white block w-full text-left px-3 py-2 text-red-500 hover:bg-red-100 rounded">Dashboard</Link>
          <Link href="/dashboard/bugs" className="block text-gray-700 dark:text-white block w-full text-left px-3 py-2 text-red-500 hover:bg-red-100 rounded">Issues</Link>
          <button
            onClick={handleLogOut}
            className="block w-full text-left px-3 py-2 text-red-500 hover:bg-red-100 rounded"
          >
            Logout
          </button>
        </nav>
      </aside>
    </>
  );
}
