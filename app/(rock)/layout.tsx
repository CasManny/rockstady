import MobileHeader from "@/components/choose-adventure/MobileHeader";
import UserSidebar from "@/components/choose-adventure/UserSidebar";

type Props = {
  children: React.ReactNode;
};
const DashboardLayout = ({ children }: Props) => {
  return (
    <div className="bg-white text-black min-h-screen">
      <MobileHeader />
        <UserSidebar className="hidden lg:flex" />
        <main className="lg:pl-[256px] h-full lg:pt-0">
          <div className="max-w-[1056px] mx-auto h-full">{children}</div>
        </main>
    </div>
  );
};

export default DashboardLayout;
