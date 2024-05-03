import Image from "next/image";
import Link from "next/link";
import UserAvatar from "../userAvatar";

const MenuBar = () => {
  // const user = session.data?.user;

  return (
    <div className="h-36 fixed bottom-0 z-10 bg-black w-full flex justify-around">
      <button>
        <UserAvatar />
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
        <Link href="/settings">
          <Image
            src={"/settings.svg"}
            width={24}
            height={24}
            alt="settigns icon"
          />
        </Link>
      </button>
    </div>
  );
};

export default MenuBar;
