import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[calc(100svh-var(--header-h))] flex items-center justify-center overflow-x-clip px-4 py-16 sm:py-20 scroll-mt-[var(--header-h)]"
    >
      {/* Digital matrix background */}
      <div className="absolute inset-0 pointer-events-none -z-10 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(0,224,160,0.1) 1px, transparent 1px),
            linear-gradient(0deg, rgba(0,224,160,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          animation: 'matrix-move 20s linear infinite'
        }} />
      </div>
      
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background opacity-50 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.15),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none animate-pulse bg-[radial-gradient(circle_at_center,rgba(0,255,198,0.08),transparent_70%)]" />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex items-center justify-center">
          {/* Content */}
          <div className="text-center space-y-8 animate-fade-in-up max-w-4xl">
            {/* Logo text */}
            <div className="inline-block max-w-full">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-2 break-words sm:whitespace-nowrap">
                Landing<span className="text-primary">Express</span>
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground tracking-wide">by FalcoDevs SpA</p>
            </div>

            {/* Main headline */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight [text-wrap:balance]">
              Digitaliza tu negocio con
              <span className="block text-primary mt-2">velocidad y elegancia</span>
            </h2>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
              Landing pages rápidas, escalables y con diseño premium,
              capaces de transformarse en soluciones completas e impulsar tu visibilidad en la web.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6 sm:mt-8">
              <Button asChild variant="hero" size="xl" className="group">
                <a href="#contacto" onClick={(e) => handleSmoothScroll(e, '#contacto')} aria-label="Ir a cotizar ahora">
                  Cotizar ahora
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button asChild variant="hero-outline" size="xl">
                <a href="#portafolio" onClick={(e) => handleSmoothScroll(e, '#portafolio')} aria-label="Ver portafolio">Ver portafolio</a>
              </Button>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 max-w-md mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">3-5</div>
                <div className="text-sm text-muted-foreground">días entrega</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">proyectos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground">satisfacción</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
