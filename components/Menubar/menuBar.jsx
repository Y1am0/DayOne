import Image from "next/image";
import Link from "next/link";
import UserAvatar from "../userAvatar";
import OverviewIcon from "../icons/overviewIcon";
import SettingsIcon from "../icons/settingsIcon";

const MenuBar = () => {
  // const user = session.data?.user;

  return (
    <div className="h-36 fixed bottom-0 z-10 w-full flex justify-around">
      <button>
        <UserAvatar />
      </button>
      <button>
        <OverviewIcon />
      </button>

      <button>
        <Link href="/settings">
          <SettingsIcon />
        </Link>
      </button>
    </div>
  );
};

export default MenuBar;
