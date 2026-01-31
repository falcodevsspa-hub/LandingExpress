import { Star } from "lucide-react";
import { useEffect, useState } from "react";

const testimonials = [
  {
    name: "María González",
    role: "Fundadora de Rustik Café",
    content: "LandingExpress transformó completamente nuestra presencia digital. Las reservas aumentaron un 300% en el primer mes.",
    rating: 5,
  },
  {
    name: "Carlos Rivera",
    role: "Gerente de Ferretería Rivera",
    content: "Excelente servicio y atención al detalle. El diseño superó nuestras expectativas y el proceso fue muy fluido.",
    rating: 5,
  },
  {
    name: "Dra. Ana Morales",
    role: "Directora de Clínica Sonrisa",
    content: "Profesionalismo de primer nivel. Ahora nuestros pacientes pueden agendar citas online fácilmente.",
    rating: 5,
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5" />
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Lo que dicen nuestros <span className="text-primary">clientes</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Historias reales de negocios que confiaron en nosotros
          </p>
        </div>

        {/* Testimonial card */}
        <div className="relative">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`transition-all duration-500 ${
                index === currentIndex
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95 absolute inset-0"
              }`}
            >
              <div className="gradient-border rounded-2xl p-8 md:p-12 bg-card">
                {/* Stars */}
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-center mb-8">
                  <p className="text-lg md:text-xl leading-relaxed">
                    "{testimonial.content}"
                  </p>
                </blockquote>

                {/* Author */}
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary opacity-30" />
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}

          {/* Navigation dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "w-8 bg-primary"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
