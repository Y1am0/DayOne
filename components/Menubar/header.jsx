import Image from "next/image";

const Header = () => {
  return (
    <div className="h-36 fixed z-10 bg-black w-full grid place-content-center">
      <Image src={"/logo.png"} width={27} height={38} alt="Logo" />
    </div>
  );
};

export default Header;
