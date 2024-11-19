import CommunityNavbar from "@/components/community/CommunityNavbar";
import CommunitySidebar from "@/components/community/CommunitySidebar";

interface ComunityLayoutProps {
  children: React.ReactNode;
}
const CommunityLayout = ({ children }: ComunityLayoutProps) => {
  return (
    <main className="relative bg-white">
      <CommunityNavbar />
      <div className="flex">
        <CommunitySidebar />
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14">
          <div className="w-full">{children}</div>
        </section>
      </div>
    </main>
  );
};

export default CommunityLayout;
