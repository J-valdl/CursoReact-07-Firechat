import { useAuthActions } from "@/hooks/use-auth-actions";
import { cn } from "@/lib/utils";
import { LayoutDashboard, LogOut, MessageCircle, User } from "lucide-react";
import { NavLink } from "react-router";
import { Button } from "./ui/button";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Chat", href: "/admin/chat", icon: MessageCircle },
  { name: "Profile", href: "/admin/profile", icon: User },
];

const navbar = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { logout } = useAuthActions();

  return (
    <header className="shadow-sm border-b">
      <nav className="p-4 flex gap-4">
        {navigation.map((item) => (
          <NavLink
            to={item.href}
            key={item.name}
            end
            className={({ isActive }) =>
              cn(
                "flex items-center gap-2",
                isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
              )
            }
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </NavLink>
        ))}
        <Button className="flex items-center gap-2 ml-auto" onClick={logout}>
          <LogOut className="w-5 h-5" />
          Logout
        </Button>
      </nav>
    </header>
  );
};

export default navbar;
