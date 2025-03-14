import { currentUser } from "@/lib/authserver";
import { Userinfo } from "@/components/userinfo";
const Server = async () => {
  const user = await currentUser();
  return (
    <div className="pt-5">
      <Userinfo user={user} label="💻server" />
    </div>
  );
};

export default Server;
