import { Suspense, useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import Footer from "./Footer";
import TopLoader from "./TopLoader";

export default function Layout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
            
            <div className="flex flex-col flex-1">
                <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
                <TopLoader />
                  
                <main className="flex-1 overflow-y-auto">
                    <div className="github-container py-6">
                        <Suspense fallback={
                            <div className="flex items-center justify-center min-h-[400px]">
                                <div className="text-center">
                                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
                                    <p className="text-muted-foreground">Loading page content...</p>
                                </div>
                            </div>
                        }>
                            {children}
                        </Suspense>
                    </div>
                </main>

                <Footer />
            </div>
        </div>
    );
}
