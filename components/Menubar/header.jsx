import Link from "next/link";
import LogoIcon from "../icons/logoIcon";

const Header = () => {
  return (
    <div className="h-36 top-0 fixed z-20 border-b-2 bg-opacity-85 w-full backdrop-blur-2xl flex items-center justify-center">
      <Link href="/">
        <LogoIcon />
      </Link>
    </div>
  );
};

export default Header;
