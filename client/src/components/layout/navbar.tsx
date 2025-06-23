import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Menu, User } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navbar() {
  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const navItems = [
    { href: "/", label: "홈", id: "home" },
    { href: "/notices", label: "공지사항", id: "notices" },
    { href: "/gallery", label: "작품갤러리", id: "gallery" },
    { href: "/entrance", label: "입시정보", id: "entrance" },
    { href: "/admin", label: "관리자", id: "admin" },
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
                {navItems.map((item) => (
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
                ))}
              </div>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 pl-10 pr-4 py-2"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              </div>
              <Button className="ml-4 bg-primary hover:bg-primary/90">
                <User className="mr-2 h-4 w-4" />
                로그인
              </Button>
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
                  {navItems.map((item) => (
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
                  ))}
                  <div className="pt-4 border-t">
                    <Input
                      type="text"
                      placeholder="검색..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="mb-4"
                    />
                    <Button className="w-full">
                      <User className="mr-2 h-4 w-4" />
                      로그인
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
