import { useMemo, useState } from "react";
import emailjs from "@emailjs/browser";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Brush,
  Calendar,
  Check,
  Globe,
  Image,
  LayoutPanelTop,
  Mail,
  MapPin,
  MessageCircle,
  Newspaper,
  Package,
  Search,
  Send,
  ShoppingCart,
  Speaker,
  Star,
  Store,
} from "lucide-react";
import "./App.css";

type WizardState = {
  tipo: string | null;
  estilo: string | null;
  paleta: string | null;
  paletaHex: string[];
  secciones: string[];
  logo: string | null;
  wantCall: boolean;
  nombre: string;
  empresa: string;
  email: string;
  whatsapp: string;
  telefono: string;
};

const initialState: WizardState = {
  tipo: null,
  estilo: null,
  paleta: null,
  paletaHex: [],
  secciones: [],
  logo: null,
  wantCall: false,
  nombre: "",
  empresa: "",
  email: "",
  whatsapp: "",
  telefono: "",
};

const onlyDigits = (value: string) => value.replace(/\D/g, "");
const cleanName = (value: string) => value.replace(/[^a-zA-ZÀ-ÿ\s'-]/g, "");
const cleanCompany = (value: string) => value.replace(/[^a-zA-ZÀ-ÿ0-9\s.,&-]/g, "");

const App = () => {
  const [step, setStep] = useState(1);
  const [state, setState] = useState<WizardState>(initialState);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<{ type: "ok" | "error"; text: string } | null>(null);

  const validName = state.nombre.trim().length >= 2;
  const validCompany = state.empresa.trim().length >= 2;
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email.trim());
  const whatsappDigits = onlyDigits(state.whatsapp);
const phoneDigits = onlyDigits(state.telefono);

const validWhatsapp =
  whatsappDigits.length === 0 ||
  (whatsappDigits.length >= 9 && whatsappDigits.length <= 14);

const validPhone =
  phoneDigits.length === 0 ||
  (phoneDigits.length >= 9 && phoneDigits.length <= 14);

  const validationErrors = useMemo(() => {
    const errors: Record<string, string> = {};

    if (state.nombre && !validName) {
      errors.nombre = "Ingresa un nombre valido.";
    }

    if (state.empresa && !validCompany) {
      errors.empresa = "Ingresa el nombre de tu empresa.";
    }

    if (state.email && !validEmail) {
      errors.email = "Ingresa un email valido.";
    }
    
    if (state.whatsapp && !validWhatsapp) {
    errors.whatsapp = "Ingresa un WhatsApp valido de 9 a 14 digitos.";
    }


    if (state.telefono && !validPhone) {
      errors.telefono = "Ingresa un telefono valido de 9 a 14 digitos.";
    }

    if (state.wantCall && !state.telefono) {
      errors.telefono = "Ingresa un telefono para solicitar llamada.";
    }

    return errors;
  }, [state, validCompany, validEmail, validName, validPhone, validWhatsapp]);

  const canContinue = useMemo(() => {
    if (step === 1) return Boolean(state.tipo);
    if (step === 2) return Boolean(state.estilo && state.paleta);
    if (step === 3) return state.secciones.length > 0;
    if (step === 4) {
      return (
        validName &&
        validCompany &&
        validEmail &&
        validWhatsapp &&
        validPhone &&
        (!state.wantCall || Boolean(state.telefono)) &&
        !sending
      );
    }

    return true;
  }, [step, state, validName, validCompany, validEmail, validPhone, validWhatsapp, sending]);

  const progressWidth = step === 5 ? "100%" : `${(step / 4) * 100}%`;

  const submitLead = async () => {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus({
        type: "error",
        text: "Faltan credenciales de EmailJS en el entorno.",
      });
      return;
    }

    if (Object.keys(validationErrors).length > 0) {
      setStatus({
        type: "error",
        text: "Revisa los campos marcados antes de enviar.",
      });
      return;
    }

    setSending(true);
    setStatus(null);

    const fullMessage = [
      "Nueva solicitud WebExpress",
      "",
      "--- Proyecto ---",
      `Tipo de sitio: ${state.tipo ?? "No especificado"}`,
      `Estilo visual: ${state.estilo ?? "No especificado"}`,
      `Paleta: ${state.paleta ?? "No especificado"}`,
      `Colores HEX: ${state.paletaHex.length ? state.paletaHex.join(", ") : "No especificado"}`,
      `Secciones: ${state.secciones.length ? state.secciones.join(", ") : "No especificado"}`,
      `Logo / branding: ${state.logo ?? "No especificado"}`,
      "",
      "--- Datos del cliente ---",
      `Nombre: ${state.nombre}`,
      `Empresa: ${state.empresa}`,
      `Email: ${state.email}`,
      `WhatsApp: ${state.whatsapp ? `+56 ${state.whatsapp}` : "No especificado"}`,
      `Telefono llamada: ${state.telefono ? `+56 ${state.telefono}` : "No especificado"}`,
      `Solicita llamada: ${state.wantCall ? "Si" : "No"}`,
    ].join("\n");

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          subject: "Nueva solicitud WebExpress",
          title: "Nueva solicitud WebExpress",
          from_name: state.nombre,
          name: state.nombre,
          client_name: state.nombre,
          company_name: state.empresa,
          empresa: state.empresa,
          from_email: state.email,
          email: state.email,
          reply_to: state.email,
          tipo: state.tipo ?? "-",
          estilo: state.estilo ?? "-",
          paleta: state.paleta ?? "-",
          paleta_hex: state.paletaHex.join(", ") || "-",
          secciones: state.secciones.join(", ") || "-",
          logo: state.logo ?? "-",
          whatsapp: state.whatsapp ? `+56 ${state.whatsapp}` : "-",
          telefono: state.telefono ? `+56 ${state.telefono}` : "-",
          solicitar_llamada: state.wantCall ? "Si" : "No",
          message: fullMessage,
          full_message: fullMessage,
        },
        publicKey,
      );

      setStep(5);
      setStatus(null);
    } catch {
      setStatus({
        type: "error",
        text: "No pudimos enviar la solicitud. Intenta nuevamente.",
      });
    } finally {
      setSending(false);
    }
  };

  const nextStep = async () => {
    if (!canContinue) return;

    if (step === 4) {
      await submitLead();
      return;
    }

    setStep((prev) => Math.min(prev + 1, 5));
    setStatus(null);
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
    setStatus(null);
  };

  const sendWsp = () => {
    const msg = `🌐 *Solicitud WebExpress*

*Nombre:* ${state.nombre || "No indicado"}
*Empresa:* ${state.empresa || "No indicado"}
*Tipo de sitio:* ${state.tipo || "-"}
*Estilo:* ${state.estilo || "-"}
*Paleta:* ${state.paleta || "-"}
*Secciones:* ${state.secciones.join(", ") || "-"}
*Logo:* ${state.logo || "No especificado"}
*WhatsApp:* ${state.whatsapp ? `+56 ${state.whatsapp}` : "-"}
*Telefono llamada:* ${state.telefono ? `+56 ${state.telefono}` : "-"}
*Email:* ${state.email || "-"}
*Llamada:* ${state.wantCall ? "Si, solicita llamada" : "No"}

_Enviado desde falcodevs.cl_`;

    window.open(
      `https://wa.me/56927444800?text=${encodeURIComponent(msg)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <main className="page-wrap">
      <section className="app-shell">
        <header className="topbar">
          <div className="topbar-brand">
            <LayoutPanelTop size={16} color="#00d97e" />
            FalcoDevs / <span>WebExpress</span>
          </div>

          <div className="topbar-steps">
            {[1, 2, 3, 4].map((dot, i) => (
              <div key={dot} className="flex items-center gap-[6px]">
                <div
                  className={`step-dot ${
                    dot < step ? "done" : dot === step ? "active" : ""
                  }`}
                >
                  {dot}
                </div>

                {i < 3 ? <div className="step-line" /> : null}
              </div>
            ))}
          </div>
        </header>

        <div className="progress-bar">
          <div className="progress-fill" style={{ width: progressWidth }} />
        </div>

        <div className="content">
          {step === 1 && (
            <div className="screen active">
              <div className="step-label">Paso 1 de 4</div>
              <h1 className="step-title">¿Que tipo de sitio necesitas?</h1>
              <p className="step-sub">Elige el que mejor describe tu negocio</p>

              <div className="options-grid two-cols">
                {[
                  [
                    "Sucursal Digital",
                    "Presencia web completa con links a tus redes y contacto directo",
                    <Store size={16} />,
                  ],
                  [
                    "Landing Page",
                    "Pagina de aterrizaje para captar clientes y generar conversiones",
                    <Speaker size={16} />,
                  ],
                  [
                    "Catalogo + Carrito WhatsApp",
                    "Tus productos con carrito - el pedido llega directo a tu WhatsApp",
                    <ShoppingCart size={16} />,
                  ],
                  [
                    "Portal de Servicios",
                    "Muestra lo que ofreces con agendamiento y cotizacion online",
                    <Briefcase size={16} />,
                  ],
                ].map(([title, desc, icon]) => {
                  const selected = state.tipo === title;

                  return (
                    <button
                      key={String(title)}
                      type="button"
                      aria-pressed={selected}
                      className={`opt-card ${selected ? "selected" : ""}`}
                      onClick={() =>
                        setState((p) => ({
                          ...p,
                          tipo: String(title),
                        }))
                      }
                    >
                      <span className={`opt-icon ${selected ? "sel" : ""}`}>
                        {icon}
                      </span>

                      <span className="opt-text">
                        <span className="opt-title">{title}</span>
                        <span className="opt-desc">{desc}</span>
                      </span>

                      <span className={`opt-check ${selected ? "checked" : ""}`} />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="screen active">
              <div className="step-label">Paso 2 de 4</div>
              <h2 className="step-title">¿Como quieres que se vea?</h2>
              <p className="step-sub">Elige el estilo y la paleta de colores</p>

              <div className="style-grid">
                {[
                  ["Minimalista", "Limpio y espacioso", ["#fafafa", "#111111"]],
                  ["Oscuro Premium", "Moderno y tech", ["#0d1117", "#2dd4bf"]],
                  ["Vibrante", "Colorido y energetico", ["#ffffff", "#ff6b35"]],
                  ["Corporativo", "Serio y confiable", ["#f8f8f8", "#1a3a6b"]],
                  ["Natural", "Organico y cercano", ["#f5f0eb", "#4a7c59"]],
                  ["Bold & Creativo", "Impactante y unico", ["#1a0533", "#c840eb"]],
                ].map(([name, desc, colors]) => {
                  const selected = state.estilo === name;
                  const [bg, accent] = colors as string[];

                  return (
                    <button
                      key={String(name)}
                      type="button"
                      className={`style-card ${selected ? "selected" : ""}`}
                      onClick={() =>
                        setState((p) => ({
                          ...p,
                          estilo: String(name),
                        }))
                      }
                    >
                      <div className="style-preview" style={{ background: bg }}>
                        <div
                          className="style-bar"
                          style={{ background: "rgba(0,0,0,.12)" }}
                        />
                        <div
                          className="style-bar"
                          style={{
                            background: accent,
                            width: 28,
                            flex: "none",
                          }}
                        />
                        <div
                          className="style-bar"
                          style={{ background: "rgba(0,0,0,.12)" }}
                        />
                      </div>

                      <div className="style-name">{name}</div>
                      <div className="style-desc">{desc}</div>
                    </button>
                  );
                })}
              </div>

              <div className="palette-label">Paleta de colores</div>

              <div className="palette-row">
                {[
                  ["Esmeralda", ["#00d97e", "#0a4f30", "#e8fff5"]],
                  ["Oceano", ["#378add", "#042c53", "#e6f1fb"]],
                  ["Sunset", ["#d85a30", "#4a1b0c", "#faece7"]],
                  ["Violeta", ["#7f77dd", "#26215c", "#eeedfe"]],
                  ["Rosa", ["#d4537e", "#4b1528", "#fbeaf0"]],
                  ["Ambar", ["#ef9f27", "#412402", "#faeeda"]],
                  ["Neutro", ["#888780", "#2c2c2a", "#f1efe8"]],
                  ["Clasico", ["#111111", "#444444", "#f5f5f5"]],
                ].map(([name, hex]) => {
                  const palette = hex as string[];
                  const selected = state.paleta === name;

                  return (
                    <button
                      key={String(name)}
                      type="button"
                      className={`pal ${selected ? "selected" : ""}`}
                      onClick={() =>
                        setState((p) => ({
                          ...p,
                          paleta: String(name),
                          paletaHex: palette,
                        }))
                      }
                    >
                      <div className="pal-preview">
                        {palette.map((color) => (
                          <div
                            key={color}
                            className="pal-swatch"
                            style={{ background: color }}
                          />
                        ))}
                      </div>

                      <div className="pal-name">{name}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="screen active">
              <div className="step-label">Paso 3 de 4</div>
              <h2 className="step-title">¿Que secciones necesita tu sitio?</h2>
              <p className="step-sub">Puedes elegir varias</p>

              <div className="feat-grid">
                {[
                  ["Catalogo de productos", <Package size={14} />],
                  ["Carrito a WhatsApp", <MessageCircle size={14} />],
                  ["Links redes sociales", <Globe size={14} />],
                  ["Formulario de contacto", <Mail size={14} />],
                  ["WhatsApp flotante", <MessageCircle size={14} />],
                  ["Agendamiento online", <Calendar size={14} />],
                  ["Galeria de fotos", <Image size={14} />],
                  ["Mapa / ubicacion", <MapPin size={14} />],
                  ["Testimonios", <Star size={14} />],
                  ["Blog / Noticias", <Newspaper size={14} />],
                  ["SEO basico", <Search size={14} />],
                  ["Multiidioma", <Globe size={14} />],
                ].map(([name, icon]) => {
                  const selected = state.secciones.includes(String(name));

                  return (
                    <button
                      key={String(name)}
                      type="button"
                      className={`feat ${selected ? "selected" : ""}`}
                      onClick={() =>
                        setState((p) => ({
                          ...p,
                          secciones: selected
                            ? p.secciones.filter((s) => s !== name)
                            : [...p.secciones, String(name)],
                        }))
                      }
                    >
                      {icon}
                      <span>{name}</span>
                    </button>
                  );
                })}
              </div>

              <div className="logo-block">
                <div className="palette-label">¿Tienes logo o branding propio?</div>

                <div className="feat-logo-row">
                  <button
                    type="button"
                    className={`feat ${state.logo === "Si, tengo logo" ? "selected" : ""}`}
                    onClick={() =>
                      setState((p) => ({
                        ...p,
                        logo: "Si, tengo logo",
                      }))
                    }
                  >
                    <Check size={14} />
                    <span>Si, tengo logo</span>
                  </button>

                  <button
                    type="button"
                    className={`feat ${state.logo === "Necesito diseno" ? "selected" : ""}`}
                    onClick={() =>
                      setState((p) => ({
                        ...p,
                        logo: "Necesito diseno",
                      }))
                    }
                  >
                    <Brush size={14} />
                    <span>Necesito diseno</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="screen active">
              <div className="step-label">Paso 4 de 4</div>
              <h2 className="step-title">Casi listo - ¿a quien le enviamos la propuesta?</h2>
              <p className="step-sub">
                En menos de 24 horas recibes alcance, fechas y costo definido
              </p>

              <div className="summary-card">
                <div className="summary-row">
                  <span className="summary-key">Tipo</span>
                  <span className="summary-val">{state.tipo ?? "-"}</span>
                </div>

                <div className="summary-row">
                  <span className="summary-key">Estilo</span>
                  <span className="summary-val">{state.estilo ?? "-"}</span>
                </div>

                <div className="summary-row">
                  <span className="summary-key">Paleta</span>
                  <span className="summary-val">{state.paleta ?? "-"}</span>
                </div>

                <div className="summary-row">
                  <span className="summary-key">Secciones</span>
                  <span className="summary-val">
                    {state.secciones.length ? state.secciones.join(", ") : "-"}
                  </span>
                </div>
              </div>

              <div className="form-row">
                <div className="field">
                  <label htmlFor="nombre">Nombre</label>
                  <input
                    id="nombre"
                    placeholder="Tu nombre"
                    maxLength={60}
                    value={state.nombre}
                    onChange={(e) =>
                      setState((p) => ({
                        ...p,
                        nombre: cleanName(e.target.value),
                      }))
                    }
                  />
                  {validationErrors.nombre && (
                    <p className="field-error">{validationErrors.nombre}</p>
                  )}
                </div>

                <div className="field">
                  <label htmlFor="empresa">Empresa</label>
                  <input
                    id="empresa"
                    placeholder="Nombre empresa"
                    maxLength={80}
                    value={state.empresa}
                    onChange={(e) =>
                      setState((p) => ({
                        ...p,
                        empresa: cleanCompany(e.target.value),
                      }))
                    }
                  />
                  {validationErrors.empresa && (
                    <p className="field-error">{validationErrors.empresa}</p>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="field">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    maxLength={120}
                    value={state.email}
                    onChange={(e) =>
                      setState((p) => ({
                        ...p,
                        email: e.target.value,
                      }))
                    }
                  />
                  {validationErrors.email && (
                    <p className="field-error">{validationErrors.email}</p>
                  )}
                </div>

                <div className="field">
                  <label htmlFor="whatsapp">WhatsApp opcional</label>

                  <div className="whatsapp-input-group">
                    <div className="whatsapp-country-static">🇨🇱 +56</div>

                    <input
                      id="whatsapp"
                      placeholder="9 1234 5678"
                      inputMode="numeric"
                      maxLength={14}
                      value={state.whatsapp}
                      onChange={(e) =>
                        setState((p) => ({
                          ...p,
                          whatsapp: onlyDigits(e.target.value).slice(0, 14),
                        }))
                      }
                      className="whatsapp-number-input"
                    />
                  </div>

                  {validationErrors.whatsapp && (
                    <p className="field-error">{validationErrors.whatsapp}</p>
                  )}
                </div>
              </div>

              <button
                type="button"
                className={`opt-card call-request ${state.wantCall ? "selected" : ""}`}
                onClick={() =>
                  setState((p) => ({
                    ...p,
                    wantCall: !p.wantCall,
                    telefono: p.wantCall ? "" : p.telefono,
                  }))
                }
              >
                <span className={`opt-check ${state.wantCall ? "checked" : ""}`} />

                <span className="opt-text">
                  <span className="opt-title">Solicitar una llamada</span>
                  <span className="opt-desc">
                    Te llamamos apenas envies los datos para revisar tu caso al instante.
                  </span>
                </span>
              </button>

              {state.wantCall && (
                <div className="form-row single">
                  <div className="field">
                    <label htmlFor="telefono-call">Telefono para llamada</label>
                    <input
                      id="telefono-call"
                      placeholder="Ej: 912345678"
                      inputMode="numeric"
                      maxLength={14}
                      value={state.telefono}
                      onChange={(e) =>
                        setState((p) => ({
                          ...p,
                          telefono: onlyDigits(e.target.value).slice(0, 14),
                        }))
                      }
                    />
                    {validationErrors.telefono && (
                      <p className="field-error">{validationErrors.telefono}</p>
                    )}
                  </div>
                </div>
              )}

              {status && <p className={`status-message ${status.type}`}>{status.text}</p>}
            </div>
          )}

          {step === 5 && (
            <div className="screen active centered">
              <div className="success-icon">
                <Check size={24} />
              </div>

              <h2 className="success-title">Todo listo</h2>

              <p className="success-sub">
                Revisamos tu caso y te respondemos con una propuesta concreta.
              </p>

              <button type="button" className="whatsapp-send" onClick={sendWsp}>
                <MessageCircle size={18} />
                Enviar tambien por WhatsApp
              </button>
            </div>
          )}
        </div>

        {step < 5 && (
          <footer className="footer-bar">
            <button
              className="btn-back"
              onClick={prevStep}
              style={{ visibility: step > 1 ? "visible" : "hidden" }}
            >
              <ArrowLeft size={14} />
              Atras
            </button>

            <button className="btn-next" disabled={!canContinue} onClick={nextStep}>
              {step === 4 ? (
                <>
                  {sending ? "Enviando..." : "Enviar"} <Send size={14} />
                </>
              ) : (
                <>
                  Continuar <ArrowRight size={14} />
                </>
              )}
            </button>
          </footer>
        )}
      </section>
    </main>
  );
};

export default App;
