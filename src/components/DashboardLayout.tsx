'use client';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {


    return (
        <div className="flex min-h-screen bg-gray-100">
            

            {/* Main content */}
            <main className="flex-1 p-4">
                {children}
            </main>
        </div>
    );
}
