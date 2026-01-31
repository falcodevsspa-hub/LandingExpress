import { ExternalLink } from "lucide-react";

const projects = [
  {
    name: "Rustik Café",
    category: "Gastronomía",
    gradient: "from-amber-500/20 to-orange-600/20",
  },
  {
    name: "Ferretería Rivera",
    category: "Retail",
    gradient: "from-blue-500/20 to-cyan-600/20",
  },
  {
    name: "Clínica Sonrisa",
    category: "Salud",
    gradient: "from-green-500/20 to-emerald-600/20",
  },
  {
    name: "Studio Fit",
    category: "Fitness",
    gradient: "from-purple-500/20 to-pink-600/20",
  },
  {
    name: "Legal Pro",
    category: "Servicios",
    gradient: "from-indigo-500/20 to-blue-600/20",
  },
  {
    name: "Tech Solutions",
    category: "Tecnología",
    gradient: "from-primary/20 to-secondary/20",
  },
];

const Portfolio = () => {
  return (
    <section className="py-20 px-4 relative">
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Nuestro <span className="text-primary">portafolio</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Proyectos reales que han transformado negocios en toda Latinoamérica
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 animate-fade-in-up cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-50 group-hover:opacity-100 transition-opacity`} />
              
              {/* Content */}
              <div className="relative p-8 h-48 flex flex-col justify-between">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-background/50 backdrop-blur-sm text-xs font-medium text-muted-foreground mb-4">
                    {project.category}
                  </span>
                  <h3 className="text-2xl font-bold">{project.name}</h3>
                </div>

                {/* View project link */}
                <div className="flex items-center gap-2 text-primary group-hover:gap-3 transition-all">
                  <span className="text-sm font-medium">Ver proyecto</span>
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>

              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
