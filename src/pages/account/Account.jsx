// -------------------- PACKAGE IMPORT FILES -------------------- //
import qs from "query-string";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LogOut, MapPin, ShoppingBag, User, Menu } from "lucide-react";

// -------------------- OTHER IMPORT FILES -------------------- //
import Orders from "./Orders";
import Address from "./Address";
import { cn } from "../../shared/lib/utils";
import { Badge } from "../../shared/ui/badge";
import Footer from "../../widgets/Footer";
import ProfileContent from "./ProfileContent";
import { Motion } from "../../widgets/motion";
import { Button } from "../../shared/ui/button";
import { useUserContext } from "../../shared/context/UserContext";
import { useUserStore } from "../../app/providers/zustandStoreApi";
import { Avatar, AvatarImage } from "../../shared/ui/avatar";
import MaxWidthWrapper from "../../widgets/max-width-wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "../../shared/ui/card";

const menuItems = [
  { icon: User, title: "Profile", href: "/profile" },
  { icon: ShoppingBag, title: "Orders", href: "/orders" },
  { icon: MapPin, title: "Address", href: "/address" },
];

const Account = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedSection, setSelectedSection] = useState("profile");
  const [showMenu, setShowMenu] = useState(false);
  const {setUser, user} = useUserContext();
  const { isLoading, error, fetchUser } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    const section = searchParams.get("section") || "profile";
    setSelectedSection(section);
  }, [searchParams]);

  const getSection = (title) => title.toLowerCase().replace(/ /g, "-");

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    setUser(null);
    return navigate("/");
  }

  const handleSectionChange = (title) => {
    const section = getSection(title);
    setSelectedSection(section);

    const url = qs.stringifyUrl(
      {
        url: `/account`,
        query: { section },
      },
      { skipNull: true }
    );
    navigate(url, { replace: true });
    setShowMenu(false);
  };

  const renderSection = () => {
    switch (selectedSection) {
      case "orders":
        return <Orders />;
      case "address":
        return <Address />;
      case "profile":
        return <ProfileContent />;
      default:
        return <ProfileContent />;
    }
  };

  return (
    <>
      <MaxWidthWrapper className="lg:h-[calc(100vh-7rem)] px-4 py-6 sm:px-6 lg:px-8">
        <div className="h-full mx-auto max-w-7xl">
          <Motion direction="up" duration={1.8} up={70}>
            <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
              <Button
                variant="outline"
                className="lg:hidden"
                onClick={() => setShowMenu(!showMenu)}
              >
                <Menu className="w-4 h-4 mr-2" />
                Menu
              </Button>

              <Card
                className={cn(
                  "lg:w-1/3",
                  showMenu ? "block" : "hidden",
                  "lg:block"
                )}
              >
                <CardHeader className="pb-4 lg:pb-6">
                  <CardTitle className="text-xl font-bold lg:text-2xl">
                    My Profile
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-4 space-x-4 lg:mb-6">
                    <Avatar className="w-16 h-16 lg:h-20 lg:w-20">
                      <AvatarImage
                        src={
                          user?.profile ||
                          "https://img.freepik.com/premium-vector/amazing-icon-voter-avatar-editable-design-style_142112-3583.jpg?semt=ais_hybrid"
                        }
                        alt={user?.profile || "User"}
                      />
                    </Avatar>
                    <div>
                      <h2 className="text-lg font-bold lg:text-2xl">
                        {user?.FirstName || user?.firstName || "User "} {user?.LastName || user?.lastName || "Name"}
                      </h2>
                      <p className="text-sm text-gray-600 lg:text-lg">
                        +91 {user?.phoneNumber || user?.PhoneNumber || "+91 1234567890"}
                      </p>
                      <p className="text-sm text-gray-600 lg:text-sm">
                        {user?.Email || user?.email || "user@example.com"}
                      </p>
                      <Badge variant="secondary" className="mt-2">
                        {user?.membershipStatus || "Active User"}
                      </Badge>
                      <Badge variant="outline" className="mt-2">
                        {user?.Gender || user?.gender || "Active User"}
                      </Badge>
                    </div>
                  </div>
                  <p className="mb-2 text-xs text-gray-600 lg:mb-4 lg:text-sm">
                    DOB : {user?.DOB || user?.dob || "Unknown"}
                  </p>
                  <nav className="space-y-2">
                    {menuItems.map((item) => (
                      <Button
                        key={item.title}
                        variant={
                          selectedSection === getSection(item.title)
                            ? "default"
                            : "ghost"
                        }
                        className={cn(
                          "w-full justify-start rounded-lg py-4 lg:py-6",
                          selectedSection === getSection(item.title) &&
                          "bg-primary/80"
                        )}
                        onClick={() => handleSectionChange(item.title)}
                      >
                        <item.icon className="w-4 h-4 mr-2 lg:h-5 lg:w-5" />
                        {item.title}
                      </Button>
                    ))}
                    <Button
                      variant="destructive"
                      className="justify-start w-full py-4 rounded-lg hover:text-zinc-800 lg:py-6"
                      onClick = {handleLogout}
                    >
                      <LogOut className="w-4 h-4 mr-2 lg:h-5 lg:w-5" />
                      Log Out
                    </Button>
                  </nav>
                </CardContent>
              </Card>
              <Card className="flex-1">
                <CardContent className="p-0">{renderSection()}</CardContent>
              </Card>
            </div>
          </Motion>
        </div>
      </MaxWidthWrapper>
      <Footer /></>
  );
};

export default Account;
