import { useAuthActions } from "@/hooks/use-auth-actions";
import { cn } from "@/lib/utils";
import {
  ClipboardCheck,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageCircle,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router";
import { Button } from "./ui/button";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Chat", href: "/admin/chat", icon: MessageCircle },
  { name: "Profile", href: "/admin/profile", icon: User },
  { name: "Tasks", href: "/admin/tasks", icon: ClipboardCheck },
];

const Navbar = () => {
  const { logout } = useAuthActions();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">FireChat</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2",
                    isActive
                      ? "bg-blue-50 text-blue-600 shadow-sm"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  )
                }
                end
              >
                <item.icon className="w-4 h-4" />
                <span className="hidden lg:block">{item.name}</span>
              </NavLink>
            ))}
          </div>

          {/* Desktop Logout */}
          <div className="hidden md:flex">
            <Button
              onClick={logout}
              variant="ghost"
              size="sm"
              className="text-slate-600 hover:text-red-600 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4" />
              <span className="ml-2 hidden lg:block">Cerrar sesión</span>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-600"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      "block px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-3",
                      isActive
                        ? "bg-blue-50 text-blue-600 shadow-sm"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    )
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                  end
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </NavLink>
              ))}
              <div className="pt-2 border-t border-slate-200">
                <Button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  variant="ghost"
                  className="w-full justify-start text-slate-600 hover:text-red-600 hover:bg-red-50 px-3 py-2"
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  Cerrar sesión
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
export default Navbar;
