import { auth } from "@/auth";

const SettingsPage = async () => {
  const session = await auth();
  return (
    <div>
      Settings Page
      <p>{JSON.stringify(session)}</p>
    </div>
  );
};

export default SettingsPage;
