import FormProfile from "@/components/profile/form-profile";
import { useUser } from "reactfire";

const ProfilePage = () => {
  const { data: user } = useUser();

  if (!user) {
    return <div>Loading user data...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <FormProfile user={user} />
    </div>
  );
};

export default ProfilePage;
