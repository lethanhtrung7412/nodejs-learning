import { useEffect, useState } from "react";

import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { ThemeToggle } from "../theme";

interface HeaderProps {
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
}

const navItems = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export default function Header({
  activeSection,
  scrollToSection,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.screenY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center w-full justify-between px-4">
        <div className="flex items-center gap-2">
          <Button
            variant="link"
            className="p-0 font-bold text-lg"
            onClick={() => scrollToSection("hero")}
          >
            Le Thanh Trung
          </Button>
        </div>

        <div className="flex items-center gap-4">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant="link"
                className={`p-0 text-sm font-medium ${
                  activeSection === item.id
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
                onClick={() => scrollToSection(item.id)}
              >
                {item.label}
              </Button>
            ))}
          </nav>

          <ThemeToggle />

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[240px] sm:w-[300px]">
              <nav className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <Button
                    key={item.id}
                    variant="ghost"
                    className={`justify-start ${
                      activeSection === item.id ? "font-medium" : ""
                    }`}
                    onClick={() => {
                      scrollToSection(item.id);
                      document
                        .querySelector('[data-state="open"]')
                        ?.setAttribute("data-state", "closed");
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
