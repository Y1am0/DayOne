import Link from "next/link";
import LogoIcon from "../icons/logoIcon";

const Header = () => {
  return (
    <div className="h-36 top-0 fixed z-20 border-b-2 bg-opacity-85 w-full backdrop-blur-2xl grid grid-cols-3 items-center">
      <div className="flex items-center justify-start pl-4">
        {/* <PointsBadge /> */}
      </div>
      <div className="flex items-center justify-center">
        <Link href="/">
          <LogoIcon />
        </Link>
      </div>
      <div className="flex items-center justify-end pr-4">
        {/* Placeholder div to balance the grid */}
      </div>
    </div>
  );
};

export default Header;
