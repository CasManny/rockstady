import MobileHeader from "@/components/choose-adventure/MobileHeader";
import UserSidebar from "@/components/choose-adventure/UserSidebar";

type Props = {
  children: React.ReactNode;
};
const DashboardLayout = ({ children }: Props) => {
  return (
    <div className="bg-white text-black h-full w-full">
      <MobileHeader />
        <UserSidebar className="hidden lg:flex" />
        <main className="lg:pl-[256px] h-full w-full lg:pt-0">
          <div className="mx-auto h-full">{children}</div>
        </main>
    </div>
  );
};

export default DashboardLayout;
