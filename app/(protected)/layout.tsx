import Navbar from "./settings/_components/navbar";
type layoutProps = {
  children: React.ReactNode;
};

const layout = ({ children }: layoutProps) => {
  return (
    <div className="min-h-screen pt-3  flex flex-col items-center justify-center bg-gradient-to-r from-[#2c67f2] via-[#62cff4] to-indigo-500">
      <Navbar />
      {children}
    </div>
  );
};

export default layout;
