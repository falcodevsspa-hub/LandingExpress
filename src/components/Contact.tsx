import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageSquare, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { sendEmail } from "@/lib/sendEmail";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    acceptPrivacy: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const wspNumber = import.meta.env.VITE_WSP_NUMBER || "56927444800";
  const contactEmail = import.meta.env.VITE_CONTACT_TO_EMAIL || "falcodevsspa@gmail.com";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación básica
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error("Por favor completa todos los campos requeridos.");
      return;
    }

    if (!formData.acceptPrivacy) {
      toast.error("Debes aceptar la política de privacidad.");
      return;
    }

    if (formData.message.trim().length < 12) {
      toast.error("El mensaje debe tener al menos 12 caracteres.");
      return;
    }

    setIsSubmitting(true);

    try {
      await sendEmail({
        from_name: formData.name,
        reply_to: formData.email,
        phone: formData.phone,
        company: formData.company,
        message: formData.message,
      });

      toast.success("Mensaje enviado correctamente. Te contactaremos en menos de 24 horas.");
      setFormData({ name: "", email: "", phone: "", company: "", message: "", acceptPrivacy: false });
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : "Ocurrió un error al enviar el mensaje. Inténtalo nuevamente más tarde. ❌";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    const message = `Hola, quiero cotizar una landing. Mi nombre es ${formData.name || "___"}, mi correo es ${formData.email || "___"}, y mi empresa es ${formData.company || "___"}.`;
    const url = `https://wa.me/${wspNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="contacto" className="py-20 px-4 relative scroll-mt-[var(--header-h)]">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      
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
                  <a 
                    href={`mailto:${contactEmail}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {contactEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">WhatsApp</div>
                  <a 
                    href={`https://wa.me/${wspNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    +{wspNumber}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right form */}
          <div className="animate-fade-in-up relative z-20">
            <form onSubmit={handleSubmit} className="gradient-border rounded-2xl p-8 space-y-6 relative z-20">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Nombre <span className="text-destructive">*</span>
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-white/5 border-primary/30 focus:border-primary focus:ring-primary transition-colors"
                  placeholder="Tu nombre"
                  required
                  aria-required="true"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email <span className="text-destructive">*</span>
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-white/5 border-primary/30 focus:border-primary focus:ring-primary transition-colors"
                  placeholder="tu@email.com"
                  required
                  aria-required="true"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  Teléfono <span className="text-xs text-muted-foreground">(opcional)</span>
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-white/5 border-primary/30 focus:border-primary focus:ring-primary transition-colors"
                  placeholder="+56 9 2744 4800"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium mb-2">
                  Empresa <span className="text-xs text-muted-foreground">(opcional)</span>
                </label>
                <Input
                  id="company"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="bg-white/5 border-primary/30 focus:border-primary focus:ring-primary transition-colors"
                  placeholder="Tu empresa"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Mensaje <span className="text-destructive">*</span>
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-white/5 border-primary/30 focus:border-primary focus:ring-primary transition-colors min-h-32 resize-none"
                  placeholder="Cuéntanos sobre tu proyecto..."
                  required
                  minLength={12}
                  aria-required="true"
                />
              </div>

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="privacy"
                  checked={formData.acceptPrivacy}
                  onChange={(e) => setFormData({ ...formData, acceptPrivacy: e.target.checked })}
                  className="mt-1"
                  required
                />
                <label htmlFor="privacy" className="text-sm text-muted-foreground">
                  Acepto la política de privacidad <span className="text-destructive">*</span>
                </label>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button type="submit" variant="hero" className="flex-1" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? "Enviando..." : "Enviar mensaje"}
                  <Send className="w-4 h-4 ml-2" />
                </Button>
                <Button 
                  type="button"
                  onClick={handleWhatsApp}
                  variant="outline"
                  className="flex-1"
                  size="lg"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  WhatsApp
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
