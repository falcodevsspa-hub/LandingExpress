import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#home", label: "Inicio" },
    { href: "#servicios", label: "Servicios" },
    { href: "#catalogo", label: "Catálogo" },
    { href: "#portafolio", label: "Portafolio" },
    { href: "#precios", label: "Precios" },
    { href: "#contacto", label: "Contacto" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-16 md:h-20 transition-all duration-300 ${
        isScrolled ? "bg-black/60 backdrop-blur-md shadow-lg" : "bg-black/40 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto max-w-7xl h-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <a href="#home" className="flex items-center space-x-2 group">
            <div className="text-xl md:text-2xl font-heading font-bold">
              Landing<span className="text-primary">Express</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="px-3 lg:px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-card/50"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Brand logo (Desktop) */}
          <div className="hidden md:flex items-center">
            <a 
              href="https://falcodevs.vercel.app/" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center transition-opacity hover:opacity-80 group"
              aria-label="Visitar FalcoDevs"
            >
              <img 
                src={new URL('../assets/falcodevs-logo.png', import.meta.url).href} 
                alt="FalcoDevs Logo" 
                className="h-10 w-auto transition-transform group-hover:scale-110"
              />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-foreground hover:bg-card/50 rounded-md transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-lg border-t border-border shadow-xl">
          <nav className="container mx-auto px-4 py-6 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="px-4 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-card/50 rounded-md transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Button asChild variant="hero" size="lg" className="w-full">
              <a href="#contacto" onClick={(e) => handleLinkClick(e, '#contacto')}>
                Cotizar ahora
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
