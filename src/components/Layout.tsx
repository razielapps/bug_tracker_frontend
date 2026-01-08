import { useState } from "react";
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
                        {children}
                    </div>
                </main>

                <Footer />
            </div>
        </div>
    );
}
