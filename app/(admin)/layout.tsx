import AdminSidebar from "@/components/admin/AdminSidebar";

type Props = {
  children: React.ReactNode;
};
const AdminLayout = ({ children }: Props) => {
  return (
    <div className="text-black bg-white min-h-screen">
      <AdminSidebar className="hidden lg:flex" />
      <main className="lg:pl-[256px] h-full lg:pt-0">{children}</main>
    </div>
  );
};

export default AdminLayout;
