// -------------------- PACKAGE IMPORT FILES -------------------- //
import { useState } from "react";
import { LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { User, ShoppingBag, MapPin } from "lucide-react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

// -------------------- OTHER IMPORT FILES -------------------- //
import Hint from "./hint";
import { Button } from "../shared/ui/button";
import { logOutHandler } from "../features/auth/model/auth";
import { handleDeleteSession } from "../features/auth/services/appwrite";
import { Avatar, AvatarFallback, AvatarImage } from "../shared/ui/avatar";
import { useUserContext } from "../shared/context/UserContext";
import toast from "react-hot-toast";

const menuItems = [
  { icon: User, title: "Profile", href: "/account?section=profile" },
  { icon: ShoppingBag, title: "Orders", href: "/account?section=orders" },
  { icon: MapPin, title: "Address", href: "/account?section=address" },
];

let avatarImg = () => {
  return <FaUserCircle />;
}

const UserAvatar = ({ user }) => {
  const {setUser} = useUserContext();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    localStorage.removeItem("userToken");
    setUser(null);
    toast.success("logout successfully");
    return navigate("/");
  };

  return (
    <div>
      {user ? (
        <Popover className="relative z-40">
          <PopoverButton
            className={`${open ? "" : "text-opacity-90"} group inline-flex items-center rounded-md text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            onClick={() => setOpen(!open)}
          >
            <Hint label={"Profile"} align="center" alignOffset={10}>
              <Avatar className="cursor-pointer">
                <AvatarImage
                  src={avatarImg}
                  alt={user.name}
                  className="relative hover:shine-effect"
                />
                <AvatarFallback>
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-rose-600 via-purple-800 to-blue-800" />
                </AvatarFallback>
              </Avatar>
            </Hint>
          </PopoverButton>
          <PopoverPanel className="absolute right-0 top-full z-10 mt-3 w-56 max-w-md overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in">
            <div className="flex flex-col flex-1 w-full py-2">
              <div className="p-2">
                {menuItems.map((item) => (
                  <Link key={item.title} to={item.href} className="w-full">
                    <Button
                      key={item.title}
                      variant="ghost"
                      aschild
                      className="flex items-center justify-start w-full px-4 py-2 text-sm text-zinc-900"
                    >
                      <item.icon className="w-4 h-4 mr-2" />
                      {item.title}
                    </Button>
                  </Link>
                ))}
              </div>
              <hr className="my-1" />
              <div className="px-2">
                <Button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-sm text-left text-white"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Log out
                </Button>
              </div>
            </div>
          </PopoverPanel>
        </Popover>
      ) : null}
    </div>
  );
};

export default UserAvatar;
