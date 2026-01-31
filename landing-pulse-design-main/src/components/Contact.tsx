import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageSquare, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    toast.success("¡Mensaje enviado! Te contactaremos pronto.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="py-20 px-4 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              ¿Listo para <span className="text-primary">despegar</span>?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Cuéntanos sobre tu proyecto y te responderemos en menos de 24 horas.
              Sin compromiso, sin costos ocultos.
            </p>

            {/* Contact info */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">Email</div>
                  <a href="mailto:hola@landingexpress.cl" className="text-muted-foreground hover:text-primary transition-colors">
                    hola@landingexpress.cl
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">WhatsApp</div>
                  <a href="https://wa.me/56912345678" className="text-muted-foreground hover:text-primary transition-colors">
                    +56 9 1234 5678
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right form */}
          <div className="animate-fade-in-up">
            <form onSubmit={handleSubmit} className="gradient-border rounded-2xl p-8 space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Nombre
                </label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-background border-border focus:border-primary transition-colors"
                  placeholder="Tu nombre"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-background border-border focus:border-primary transition-colors"
                  placeholder="tu@email.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Mensaje
                </label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-background border-border focus:border-primary transition-colors min-h-32 resize-none"
                  placeholder="Cuéntanos sobre tu proyecto..."
                  required
                />
              </div>

              <Button type="submit" variant="hero" className="w-full" size="lg">
                Enviar mensaje
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
