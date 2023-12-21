import Navbar from "@/components/Navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <main className="">
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
