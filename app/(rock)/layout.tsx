import MobileHeader from "@/components/choose-adventure/MobileHeader";
import UserSidebar from "@/components/choose-adventure/UserSidebar";
import { ThemeProvider } from "@/providers/theme-provide";

type Props = {
  children: React.ReactNode;
};
const DashboardLayout = ({ children }: Props) => {
  return (
    <ThemeProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
    >
      <>
        <div className="bg-white text-black h-full w-full dark:bg-rs-bg-dark">
          <MobileHeader />
          <UserSidebar className="hidden lg:flex" />
          <main className="lg:pl-[256px] h-full w-full lg:pt-0">
            <div className="mx-auto h-full">{children}</div>
          </main>
        </div>
      </>
    </ThemeProvider>
  );
};

export default DashboardLayout;
