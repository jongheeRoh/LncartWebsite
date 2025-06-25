import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, ChevronDown } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "홈", id: "home" },
    { href: "/about", label: "학원소개", id: "about" },
    { href: "/schedule", label: "학원 시간표", id: "schedule" },
    { href: "/notices", label: "공지사항", id: "notices" },
    { href: "/gallery", label: "작품갤러리", id: "gallery" },
    { 
      href: "/entrance", 
      label: "입시정보", 
      id: "entrance",
      subItems: [
        { href: "/middle-school", label: "예중입시정보" },
        { href: "/high-school", label: "예고입시정보" }
      ]
    },
    { href: "/directions", label: "오시는길", id: "directions" },
  ];

  const isActive = (href: string) => {
    if (href === "/" && location === "/") return true;
    if (href !== "/" && location.startsWith(href)) return true;
    return false;
  };

  return (
    <nav className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <div className="flex-shrink-0">
              <Link href="/">
                <h1 className="text-2xl font-bold text-primary cursor-pointer">선과색미술학원</h1>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navItems.map((item) => {
                  if (item.subItems) {
                    return (
                      <DropdownMenu key={item.id}>
                        <DropdownMenuTrigger asChild>
                          <button
                            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${
                              isActive(item.href) || item.subItems.some(sub => isActive(sub.href))
                                ? "text-primary border-b-2 border-primary"
                                : "text-slate-600 hover:text-primary"
                            }`}
                          >
                            {item.label}
                            <ChevronDown className="ml-1 h-4 w-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {item.subItems.map((subItem) => (
                            <DropdownMenuItem key={subItem.href} asChild>
                              <Link href={subItem.href}>
                                <span className="w-full cursor-pointer">{subItem.label}</span>
                              </Link>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    );
                  }
                  
                  return (
                    <Link key={item.id} href={item.href}>
                      <a
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          isActive(item.href)
                            ? "text-primary border-b-2 border-primary"
                            : "text-slate-600 hover:text-primary"
                        }`}
                      >
                        {item.label}
                      </a>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => {
                    if (item.subItems) {
                      return (
                        <div key={item.id} className="space-y-2">
                          <div className="px-3 py-2 text-base font-medium text-slate-900">
                            {item.label}
                          </div>
                          {item.subItems.map((subItem) => (
                            <Link key={subItem.href} href={subItem.href}>
                              <a
                                className={`block px-6 py-2 rounded-md text-sm transition-colors ${
                                  isActive(subItem.href)
                                    ? "text-primary bg-primary/10"
                                    : "text-slate-600 hover:text-primary hover:bg-slate-100"
                                }`}
                              >
                                {subItem.label}
                              </a>
                            </Link>
                          ))}
                        </div>
                      );
                    }
                    
                    return (
                      <Link key={item.id} href={item.href}>
                        <a
                          className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                            isActive(item.href)
                              ? "text-primary bg-primary/10"
                              : "text-slate-600 hover:text-primary hover:bg-slate-100"
                          }`}
                        >
                          {item.label}
                        </a>
                      </Link>
                    );
                  })}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}