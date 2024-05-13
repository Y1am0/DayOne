import Link from "next/link";
import LogoIcon from "../icons/logoIcon";

const Header = () => {
  return (
    <div className="h-36 top-0 fixed z-10 w-full bg-background flex items-center justify-center">
      <Link href="/">
        <LogoIcon />
      </Link>
    </div>
  );
};

export default Header;
