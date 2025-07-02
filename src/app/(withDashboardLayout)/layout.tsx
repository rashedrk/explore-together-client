import DashboardDrawer from "@/components/Dashboard/DashboardDrawer/DashboardDrawer";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  // Authentication is now handled by middleware.ts
  return <DashboardDrawer>{children} </DashboardDrawer>;
};

export default DashboardLayout;
