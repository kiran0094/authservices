import { logout } from "@/actions/logout";

type logoutButtonProps = {
  children: React.ReactNode;
};
const LogoutButton = ({ children }: logoutButtonProps) => {
  const onClick = () => {
    logout();
  };
  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};

export default LogoutButton;
