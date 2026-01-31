import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroMockup from "@/assets/hero-mockup.jpg";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-[80vh] flex items-center justify-center overflow-x-clip overflow-y-visible px-4 py-16 sm:py-20"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background opacity-50" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.15),transparent_50%)]" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left space-y-8 animate-fade-in-up">
            {/* Logo text */}
            <div className="inline-block max-w-full">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-2 break-words">
                Landing<span className="text-primary">Express</span>
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground tracking-wide">
                by FalcoDevs SpA
              </p>
            </div>

            {/* Main headline */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight [text-wrap:balance]">
              Digitaliza tu negocio con
              <span className="block text-primary mt-2">velocidad y elegancia</span>
            </h2>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0">
              Landing pages rápidas, escalables y con diseño premium. Optimizadas para
              convertir visitantes en clientes.
            </p>

            {/* CTA Buttons */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild variant="hero" size="xl" className="group">
                <a href="#cotizar" aria-label="Ir a cotizar ahora">
                  Cotizar ahora
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button asChild variant="hero-outline" size="xl">
                <a href="#portfolio" aria-label="Ver portafolio">Ver portafolio</a>
              </Button>
            </div>

            {/* Quick stats (ocúltalo si aún no hay casos reales) */}
            <div className="grid grid-cols-3 gap-6 pt-8 max-w-md mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-primary">3–5</div>
                <div className="text-sm text-muted-foreground">días entrega</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">proyectos</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground">satisfacción</div>
              </div>
            </div>
          </div>

          {/* Mockup image */}
          <div className="relative animate-float mt-10 lg:mt-0">
            <div className="relative rounded-2xl overflow-hidden glow-effect max-w-[640px] mx-auto">
              <img
                src={heroMockup}
                alt="LandingExpress preview mockup"
                className="w-full h-auto"
                loading="eager"
                decoding="async"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl animate-glow-pulse" />
            <div
              className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl animate-glow-pulse"
              style={{ animationDelay: "1s" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
