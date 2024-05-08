import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <div className="h-36 top-0 fixed z-10 w-full flex items-center justify-center">
      <Link href="/">
        <Image src={"/logo.png"} width={27} height={38} alt="Logo" />
      </Link>
    </div>
  );
};

export default Header;
