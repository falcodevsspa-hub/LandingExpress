import { MessageSquare, Palette, Code, Rocket, CheckCircle } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Consulta inicial",
    description: "Conversamos sobre tu negocio y objetivos",
  },
  {
    number: "02",
    icon: Palette,
    title: "Diseño personalizado",
    description: "Creamos mockups adaptados a tu marca",
  },
  {
    number: "03",
    icon: Code,
    title: "Desarrollo",
    description: "Codificamos con las mejores prácticas",
  },
  {
    number: "04",
    icon: CheckCircle,
    title: "Revisión",
    description: "Ajustamos hasta que quede perfecto",
  },
  {
    number: "05",
    icon: Rocket,
    title: "Lanzamiento",
    description: "Publicamos tu landing al mundo",
  },
];

const Process = () => {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Proceso <span className="text-primary">simple y efectivo</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            De la idea al lanzamiento en cinco pasos claros
          </p>
        </div>

        {/* Desktop: horizontal timeline */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Connection line */}
            <div className="absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-primary opacity-30" />
            
            <div className="grid grid-cols-5 gap-4">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div
                    key={index}
                    className="relative animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.15}s` }}
                  >
                    {/* Number badge */}
                    <div className="relative mb-6">
                      <div className="w-16 h-16 mx-auto rounded-full bg-card border-2 border-primary flex items-center justify-center text-2xl font-bold text-primary glow-effect">
                        {step.number}
                      </div>
                      {/* Icon */}
                      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-background border border-primary/30 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="text-center mt-8">
                      <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="lg:hidden space-y-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="flex gap-6 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Number and line */}
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-card border-2 border-primary flex items-center justify-center text-xl font-bold text-primary glow-effect">
                    {step.number}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-0.5 flex-1 bg-gradient-to-b from-primary to-transparent mt-4" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pb-8">
                  <div className="flex items-center gap-3 mb-2">
                    <Icon className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold">{step.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Process;
