import { Zap, Search, Smartphone, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Entrega rápida",
    description: "Tu landing lista en 3-5 días laborales",
  },
  {
    icon: Search,
    title: "SEO optimizado",
    description: "Posicionamiento garantizado en buscadores",
  },
  {
    icon: Smartphone,
    title: "100% responsive",
    description: "Perfecto en todos los dispositivos",
  },
  {
    icon: TrendingUp,
    title: "Escalable",
    description: "Crece junto a tu negocio",
  },
];

const ValueProps = () => {
  return (
    <section className="py-20 px-4 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/30 to-transparent" />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Por qué elegir <span className="text-primary">LandingExpress</span>?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Transformamos tu presencia digital con tecnología de punta y diseño impecable
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative p-8 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Icon with glow */}
                <div className="mb-6 inline-flex p-4 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 rounded-xl" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ValueProps;
