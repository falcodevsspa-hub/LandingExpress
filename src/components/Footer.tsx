import { Instagram, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative border-t border-border/50 py-12 px-4">
      {/* Top glow line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold mb-2">
              Landing<span className="text-primary">Express</span>
            </h3>
            <p className="text-sm text-muted-foreground">by FalcoDevs SpA</p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Portafolio
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Servicios
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Contacto
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Blog
            </a>
          </div>

          {/* Social */}
          <div className="flex justify-center md:justify-end gap-4">
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-card border border-border hover:border-primary flex items-center justify-center transition-all hover:scale-110 group"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-card border border-border hover:border-primary flex items-center justify-center transition-all hover:scale-110 group"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-card border border-border hover:border-primary flex items-center justify-center transition-all hover:scale-110 group"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
          <p>© 2025 LandingExpress. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
