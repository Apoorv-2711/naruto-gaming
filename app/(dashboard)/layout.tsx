import Navbar from "@/components/Navbar";
import ScrollToTop from "@/components/ScrollToTop";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <main className="">
        <Navbar />
        {children}
        <ScrollToTop />
      </main>
    </div>
  );
};

export default DashboardLayout;
