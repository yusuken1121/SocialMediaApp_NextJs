import Navbar from "@/components/template/organisms/Navbar";
import { Toaster } from "@/components/ui/toaster";

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <Toaster />
    </div>
  );
};

export default MainLayout;
