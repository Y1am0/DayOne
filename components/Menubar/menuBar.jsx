import Link from "next/link";
import UserButton from "../userButton";
import OverviewIcon from "../icons/overviewIcon";
import SettingsIcon from "../icons/settingsIcon";

const MenuBar = () => {
  return (
    <div className="h-36 fixed bg-background bottom-0 z-10 w-full flex justify-around">
      <button>
        <UserButton />
      </button>
      <button>
        <OverviewIcon />
      </button>
      <button>
        <SettingsIcon />
      </button>
    </div>
  );
};

export default MenuBar;
