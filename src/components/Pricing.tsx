import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$120.000",
    currency: "CLP",
    description: "Perfecto para emprendedores",
    popular: false,
    features: [
      "Landing page de 1 sección",
      "Diseño responsive",
      "SEO básico",
      "Entrega en 3 días",
      "1 revisión incluida",
    ],
  },
  {
    name: "Professional",
    price: "$170.000",
    currency: "CLP",
    description: "Ideal para PYMEs",
    popular: true,
    features: [
      "Landing page completa",
      "Diseño premium personalizado",
      "SEO avanzado",
      "Formulario de contacto",
      "Integración con redes sociales",
      "Entrega en 5 días",
      "3 revisiones incluidas",
      "Soporte 30 días",
    ],
  },
];

const Pricing = () => {
  return (
    <section id="precios" className="py-20 px-4 relative scroll-mt-[var(--header-h)]">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-card/30 via-transparent to-card/30" />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Planes que se adaptan a <span className="text-primary">tu negocio</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Transparencia total. Sin costos ocultos. Paga solo por lo que necesitas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-8 border-2 transition-all duration-300 animate-fade-in-up ${
                plan.popular
                  ? "border-primary bg-card scale-105 shadow-[0_0_50px_hsl(var(--primary)/0.2)]"
                  : "border-border bg-card hover:border-primary/50"
              }`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                    <Sparkles className="w-4 h-4" />
                    Más popular
                  </div>
                </div>
              )}

              {/* Plan header */}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                <div className="text-4xl font-bold text-primary mb-1">{plan.price}</div>
                <p className="text-sm text-muted-foreground">{plan.currency}, pago único</p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                variant={plan.popular ? "hero" : "hero-outline"}
                className="w-full"
                size="lg"
              >
                Comenzar ahora
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
