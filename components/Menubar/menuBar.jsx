import Image from "next/image";
import Link from "next/link";

const MenuBar = () => {
  return (
    <div className="h-36 absolute bottom-0 bg-black w-full flex justify-around">
      <button>
        <Image src={"/user.svg"} width={24} height={24} alt="users icon" />
      </button>
      <button>
        <Image
          src={"/overview.svg"}
          width={24}
          height={24}
          alt="overview icon"
        />
      </button>
      <button>
        <Image
          src={"/settings.svg"}
          width={24}
          height={24}
          alt="settigns icon"
        />
      </button>
    </div>
  );
};

export default MenuBar;
