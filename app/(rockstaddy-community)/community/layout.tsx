interface ComunityLayoutProps {
  children: React.ReactNode;
}
const CommunityLayout = ({ children }: ComunityLayoutProps) => {
  return <div className="h-full bg-white text-black">{children}</div>;
};

export default CommunityLayout;
