import UserSidebar from "@/components/choose-adventure/UserSidebar";

type Props = {
  children: React.ReactNode;
};
const DashboardLayout = ({ children }: Props) => {
  return (
    <div className="container">
      <UserSidebar />
      <main className="lg:pl-[256px] h-full lg:pt-0">
        <div className="max-w-[1056px] mx-auto pt-6 h-full">
        {children}
        </div>
    </main>
    </div>
  );
};

export default DashboardLayout;
