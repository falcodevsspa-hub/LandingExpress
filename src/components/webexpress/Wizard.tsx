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
import { useMemo, useState, type ReactNode } from "react";

type WizardState = {
  tipo: string | null;
  estilo: string | null;
  paleta: string | null;
  paletaHex: string[];
  secciones: string[];
  logo: string | null;
  useEmail: boolean;
  useWsp: boolean;
  wantCall: boolean;
  nombre: string;
  empresa: string;
  email: string;
  codigoPais: string;
  telefono: string;
};

const initialState: WizardState = {
  tipo: null,
  estilo: null,
  paleta: null,
  paletaHex: [],
  secciones: [],
  logo: null,
  useEmail: true,
  useWsp: true,
  wantCall: false,
  nombre: "",
  empresa: "",
  email: "",
  codigoPais: "+56",
  telefono: "",
};

const Wizard = () => {
  const [step, setStep] = useState(1);
  const [state, setState] = useState<WizardState>(initialState);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");

  const validName = state.nombre.trim().length >= 2;
  const validCompany = state.empresa.trim().length >= 2;
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email.trim());
  const validPhone = /^\d{7,12}$/.test(state.telefono.replace(/\s/g, ""));

  const errors = {
    nombre: state.nombre && !validName ? "Ingresa un nombre valido (minimo 2 caracteres)." : "",
    empresa: state.empresa && !validCompany ? "Ingresa el nombre de tu empresa." : "",
    email: state.useEmail && state.email && !validEmail ? "Ingresa un email valido." : "",
    phone: state.useWsp && state.telefono && !validPhone ? "Ingresa un WhatsApp valido (solo numeros)." : "",
  };

  const canContinue = useMemo(() => {
    if (step === 1) return Boolean(state.tipo);
    if (step === 2) return Boolean(state.estilo && state.paleta);
    if (step === 3) return state.secciones.length > 0;
    if (step === 4) {
      const hasContact =
        (state.useEmail && state.email.trim() && validEmail) ||
        (state.useWsp && state.telefono.trim() && validPhone);
      return validName && validCompany && Boolean(hasContact);
    }
    return true;
  }, [state, step, validCompany, validEmail, validName, validPhone]);

  const progress = [0, 20, 40, 60, 80, 100][step] ?? 100;

  const sendEmail = async () => {
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        tipo: state.tipo ?? "-",
        estilo: state.estilo ?? "-",
        paleta: state.paleta ?? "-",
        secciones: state.secciones.join(", ") || "-",
        logo: state.logo ?? "No especificado",
        use_email: state.useEmail ? "Si" : "No",
        use_whatsapp: state.useWsp ? "Si" : "No",
        want_call: state.wantCall ? "Si" : "No",
        nombre: state.nombre,
        empresa: state.empresa,
        email: state.email || "-",
        codigo_pais: state.codigoPais,
        telefono: state.telefono || "-",
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    );
  };

  const next = async () => {
    if (!canContinue || sending) return;
    if (step < 4) return setStep((v) => v + 1);
    setSending(true);
    setSendError("");
    try {
      await sendEmail();
      setStep(5);
    } catch {
      setSendError("No pudimos enviar tu solicitud ahora. Intenta nuevamente.");
    } finally {
      setSending(false);
    }
  };

  const sendWsp = () => {
    const msg = `🌐 *Solicitud WebExpress*\n\n*Nombre:* ${state.nombre || "No indicado"}\n*Empresa:* ${state.empresa || "No indicado"}\n*Tipo de sitio:* ${state.tipo || "-"}\n*Estilo:* ${state.estilo || "-"}\n*Paleta:* ${state.paleta || "-"}\n*Secciones:* ${state.secciones.join(", ") || "-"}\n*Logo:* ${state.logo || "No especificado"}\n*WhatsApp:* ${state.codigoPais} ${state.telefono || "-"}\n*Email:* ${state.email || "-"}\n*Llamada:* ${state.wantCall ? "Si, solicita llamada" : "No"}\n\n_Enviado desde falcodevs.cl_`;
    window.open(`https://wa.me/56927444800?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
  };

  const Screen = ({ n, children }: { n: number; children: ReactNode }) => (
    <div className={step === n ? "screen active" : "screen"}>{children}</div>
  );

  const iconMap = {
    tipo1: Store,
    tipo2: Speaker,
    tipo3: ShoppingCart,
    tipo4: Briefcase,
    f1: Package,
    f2: MessageCircle,
    f3: Globe,
    f4: Mail,
    f5: MessageCircle,
    f6: Calendar,
    f7: Image,
    f8: MapPin,
    f9: Star,
    f10: Newspaper,
    f11: Search,
    f12: Globe,
  };

  return (
    <div className="app-shell w-full">
      <style>{`
        .app-shell{background:#0d1117;border-radius:16px;overflow:hidden;font-family:'DM Sans',var(--font-sans),sans-serif;min-height:560px;display:flex;flex-direction:column;border:.5px solid rgba(255,255,255,.08)}
        .topbar{display:flex;align-items:center;justify-content:space-between;padding:14px 20px;border-bottom:.5px solid rgba(255,255,255,.07)}
        .topbar-brand{display:flex;align-items:center;gap:8px;font-size:13px;color:rgba(255,255,255,.4)}
        .topbar-brand span{color:rgba(255,255,255,.9);font-weight:500}
        .topbar-steps{display:flex;align-items:center;gap:6px}.step-dot{width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:500;background:rgba(255,255,255,.06);color:rgba(255,255,255,.3);transition:all .3s}
        .step-dot.active{background:#00d97e;color:#0d1117}.step-dot.done{background:rgba(0,217,126,.15);color:#00d97e}.step-line{width:16px;height:.5px;background:rgba(255,255,255,.1)}
        .progress-bar{height:2px;background:rgba(255,255,255,.06)}.progress-fill{height:100%;background:#00d97e;transition:width .4s ease}
        .content{flex:1;padding:28px 24px 20px;display:flex;flex-direction:column;overflow-y:auto}.screen{display:none}.screen.active{display:flex;flex-direction:column;flex:1}
        .step-label{font-size:11px;font-weight:500;letter-spacing:.08em;color:#00d97e;text-transform:uppercase;margin-bottom:8px}.step-title{font-size:22px;font-weight:600;color:rgba(255,255,255,.95);line-height:1.3;margin-bottom:6px}.step-sub{font-size:13px;color:rgba(255,255,255,.35);margin-bottom:24px}
        .options-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}.opt-card{background:rgba(255,255,255,.04);border:.5px solid rgba(255,255,255,.08);border-radius:12px;padding:14px;cursor:pointer;transition:all .2s;display:flex;align-items:flex-start;gap:10px;text-align:left}
        .opt-card:hover{background:rgba(255,255,255,.07);border-color:rgba(0,217,126,.3)}.opt-card.selected{background:rgba(0,217,126,.07);border-color:rgba(0,217,126,.5)}.opt-icon{width:32px;height:32px;border-radius:8px;background:rgba(0,217,126,.1);display:flex;align-items:center;justify-content:center;flex-shrink:0;color:#00d97e}.opt-icon.sel{background:rgba(0,217,126,.2)}.opt-check{width:16px;height:16px;border-radius:50%;border:1px solid rgba(255,255,255,.15);margin-top:2px;display:flex;align-items:center;justify-content:center}
        .opt-check.checked{background:#00d97e;border-color:#00d97e}.opt-check.checked:after{content:'';display:block;width:6px;height:4px;border-left:1.5px solid #0d1117;border-bottom:1.5px solid #0d1117;transform:rotate(-45deg) translateY(-1px)}.opt-title{font-size:13px;font-weight:500;color:rgba(255,255,255,.85);margin-bottom:2px}.opt-desc{font-size:11px;color:rgba(255,255,255,.35);line-height:1.4}
        .summary-card{background:rgba(0,217,126,.05);border:.5px solid rgba(0,217,126,.2);border-radius:12px;padding:16px;margin-bottom:16px}.summary-row{display:flex;justify-content:space-between;align-items:flex-start;padding:6px 0}.summary-key{font-size:12px;color:rgba(255,255,255,.35)}.summary-val{font-size:12px;font-weight:500;color:rgba(255,255,255,.8);text-align:right;max-width:60%}
        .frow{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:6px}.field input,.field select{width:100%;padding:9px 12px;border-radius:8px;background:rgba(255,255,255,.05);border:.5px solid rgba(255,255,255,.1);color:rgba(255,255,255,.85);font-size:13px;outline:none;transition:border-color .2s;font-family:inherit}.field input:focus,.field select:focus{border-color:rgba(0,217,126,.4)}.field input::placeholder{color:rgba(255,255,255,.2)}
        .err{font-size:10px;color:#00d97e;min-height:14px;margin-top:2px}.toggle-row{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px}.tog-box{border:.5px solid rgba(255,255,255,.09);border-radius:10px;padding:10px 12px;display:flex;align-items:center;justify-content:space-between;cursor:pointer}.tog-box.on{border-color:rgba(0,217,126,.4);background:rgba(0,217,126,.05)}
        .tog-label{font-size:12px;font-weight:500;color:rgba(255,255,255,.7)}.tog-box.on .tog-label{color:#00d97e}.tog{width:36px;height:20px;border-radius:10px;background:rgba(255,255,255,.1);position:relative}.tog.on{background:#00d97e}.tog:after{content:'';position:absolute;top:2px;left:2px;width:16px;height:16px;border-radius:50%;background:#fff;transition:transform .2s}.tog.on:after{transform:translateX(16px)}
        .phone-wrap{display:flex;gap:8px}.phone-wrap select{width:130px;flex-shrink:0}.phone-input-wrap{flex:1;display:flex;align-items:center;border-radius:8px;background:rgba(255,255,255,.05);border:.5px solid rgba(255,255,255,.1);overflow:hidden}.phone-input-wrap:focus-within{border-color:rgba(0,217,126,.4)}.phone-prefix{padding:0 8px;font-size:12px;color:rgba(255,255,255,.35);border-right:.5px solid rgba(255,255,255,.1)}.phone-input-wrap input{flex:1;padding:9px 10px;background:transparent;border:none;color:rgba(255,255,255,.85);font-size:13px;outline:none}
        .call-opt{display:flex;align-items:center;gap:10px;padding:11px 13px;border-radius:10px;border:.5px solid rgba(255,255,255,.07);background:rgba(255,255,255,.02);cursor:pointer;margin-top:8px}.call-opt.on{border-color:rgba(0,217,126,.35);background:rgba(0,217,126,.04)}.call-radio{width:16px;height:16px;border-radius:50%;border:1.5px solid rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center;flex-shrink:0}.call-opt.on .call-radio{border-color:#00d97e;background:rgba(0,217,126,.15)}.call-opt.on .call-radio:after{content:'';width:7px;height:7px;border-radius:50%;background:#00d97e;display:block}
        .footer-bar{display:flex;align-items:center;justify-content:space-between;padding:16px 24px;border-top:.5px solid rgba(255,255,255,.06);margin-top:auto}.btn-back{font-size:13px;color:rgba(255,255,255,.35);background:none;border:none;cursor:pointer;display:flex;align-items:center;gap:4px;padding:8px 12px;border-radius:8px}.btn-back:hover{color:rgba(255,255,255,.6);background:rgba(255,255,255,.04)}.btn-next{font-size:13px;font-weight:500;background:#00d97e;color:#0d1117;border:none;cursor:pointer;padding:9px 20px;border-radius:8px;display:flex;align-items:center;gap:6px}.btn-next:hover{background:#00f590}.btn-next:disabled{background:rgba(255,255,255,.08);color:rgba(255,255,255,.2);cursor:not-allowed}
        @media (max-width:640px){.topbar{padding:12px 14px}.content{padding:20px 14px 14px}.options-grid{grid-template-columns:1fr}.frow{grid-template-columns:1fr}.footer-bar{padding:14px}}
      `}</style>

      <div className="topbar">
        <div className="topbar-brand"><LayoutPanelTop size={16} color="#00d97e" /> FalcoDevs / <span>WebExpress</span></div>
        <div className="topbar-steps">
          {[1, 2, 3, 4, 5].map((dot, i) => (
            <div key={dot} className="flex items-center gap-[6px]">
              <div className={`step-dot ${dot < step ? "done" : dot === step ? "active" : ""}`}>{dot === 5 ? <Check size={11} /> : dot}</div>
              {i < 4 ? <div className="step-line" /> : null}
            </div>
          ))}
        </div>
      </div>
      <div className="progress-bar"><div className="progress-fill" style={{ width: `${progress}%` }} /></div>

      <div className="content">
        <Screen n={1}>
          <div className="step-label">Paso 1 de 4</div><div className="step-title">Que tipo de sitio necesitas?</div><div className="step-sub">Elige el que mejor describe tu negocio</div>
          <div className="options-grid">
            {[
              ["Sucursal Digital", "Presencia web completa con links a tus redes y contacto directo", iconMap.tipo1],
              ["Landing Page", "Pagina de aterrizaje para captar clientes y generar conversiones", iconMap.tipo2],
              ["Catalogo + Carrito WhatsApp", "Tus productos con carrito - el pedido llega directo a tu WhatsApp", iconMap.tipo3],
              ["Portal de Servicios", "Muestra lo que ofreces con agendamiento y cotizacion online", iconMap.tipo4],
            ].map(([title, desc, Icon]) => {
              const selected = state.tipo === title;
              const I = Icon as typeof Store;
              return <button key={title} type="button" className={`opt-card ${selected ? "selected" : ""}`} onClick={() => setState((p) => ({ ...p, tipo: String(title) }))}><div className={`opt-icon ${selected ? "sel" : ""}`}><I size={16} /></div><div className="flex-1"><div className="opt-title">{title}</div><div className="opt-desc">{desc}</div></div><div className={`opt-check ${selected ? "checked" : ""}`} /></button>;
            })}
          </div>
        </Screen>

        <Screen n={2}>
          <div className="step-label">Paso 2 de 4</div><div className="step-title">Como quieres que se vea?</div><div className="step-sub">Elige el estilo y la paleta de colores</div>
          <div className="options-grid" style={{ gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", marginBottom: "14px" }}>
            {[["Minimalista", "Limpio y espacioso", "#fafafa", "#e8e8e8", "#111"], ["Oscuro Premium", "Moderno y tech", "#0d1117", "#1e2530", "#2dd4bf"], ["Vibrante", "Colorido y energetico", "#fff", "#f0f0f0", "#ff6b35"], ["Corporativo", "Serio y confiable", "#f8f8f8", "#e0e0e0", "#1a3a6b"], ["Natural", "Organico y cercano", "#f5f0eb", "#e8ddd0", "#4a7c59"], ["Bold & Creativo", "Impactante y unico", "#1a0533", "#2d0d52", "#c840eb"]].map(([name, desc, bg, bar, ac]) => {
              const selected = state.estilo === name;
              return <button key={name} type="button" className={`opt-card ${selected ? "selected" : ""}`} style={{ flexDirection: "column", gap: "8px" }} onClick={() => setState((p) => ({ ...p, estilo: String(name) }))}><div style={{ background: String(bg), height: 56, width: "100%", borderRadius: 8, display: "flex", alignItems: "center", gap: 6, padding: 8 }}><div style={{ height: 6, borderRadius: 3, flex: 1, background: String(bar) }} /><div style={{ height: 6, width: 26, borderRadius: 3, background: String(ac) }} /><div style={{ height: 6, borderRadius: 3, flex: 1, background: String(bar) }} /></div><div><div className="opt-title" style={{ marginBottom: 1 }}>{name}</div><div className="opt-desc" style={{ fontSize: 10 }}>{desc}</div></div></button>;
            })}
          </div>
          <div className="step-label" style={{ marginBottom: 8 }}>Paleta de colores</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {[["Esmeralda", ["#00d97e", "#0a4f30", "#e8fff5"]], ["Oceano", ["#378add", "#042c53", "#e6f1fb"]], ["Sunset", ["#d85a30", "#4a1b0c", "#faece7"]], ["Violeta", ["#7f77dd", "#26215c", "#eeedfe"]], ["Rosa", ["#d4537e", "#4b1528", "#fbeaf0"]], ["Ambar", ["#ef9f27", "#412402", "#faeeda"]], ["Neutro", ["#888780", "#2c2c2a", "#f1efe8"]], ["Clasico", ["#111", "#444", "#f5f5f5"]]].map(([name, colors]) => {
              const c = colors as string[];
              const selected = state.paleta === name;
              return <button key={name} type="button" onClick={() => setState((p) => ({ ...p, paleta: String(name), paletaHex: c }))} style={{ width: "calc(25% - 8px)", borderRadius: 10, overflow: "hidden", border: selected ? "2px solid #00d97e" : "2px solid transparent" }}><div style={{ display: "flex", height: 40 }}>{c.map((x) => <div key={x} style={{ flex: 1, background: x }} />)}</div><div style={{ fontSize: 10, textAlign: "center", padding: "4px 0", background: "rgba(255,255,255,.03)", color: selected ? "#00d97e" : "rgba(255,255,255,.4)" }}>{name}</div></button>;
            })}
          </div>
        </Screen>

        <Screen n={3}>
          <div className="step-label">Paso 3 de 4</div><div className="step-title">Que secciones necesita tu sitio?</div><div className="step-sub">Puedes elegir varias</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 8 }}>
            {[["Catalogo de productos", "Catalogo", iconMap.f1], ["Carrito -> WhatsApp", "Carrito -> WhatsApp", iconMap.f2], ["Links redes sociales", "Redes sociales", iconMap.f3], ["Formulario de contacto", "Formulario contacto", iconMap.f4], ["WhatsApp flotante", "WhatsApp flotante", iconMap.f5], ["Agendamiento online", "Agendamiento", iconMap.f6], ["Galeria de fotos", "Galeria", iconMap.f7], ["Mapa / ubicacion", "Mapa / ubicacion", iconMap.f8], ["Testimonios", "Testimonios", iconMap.f9], ["Blog / Noticias", "Blog", iconMap.f10], ["SEO basico", "SEO basico", iconMap.f11], ["Multiidioma", "Multiidioma", iconMap.f12]].map(([value, label, Icon]) => {
              const selected = state.secciones.includes(String(value));
              const I = Icon as typeof Store;
              return <button key={String(value)} type="button" className={`opt-card ${selected ? "selected" : ""}`} style={{ borderRadius: 20, padding: "7px 11px", display: "inline-flex", alignItems: "center" }} onClick={() => setState((p) => ({ ...p, secciones: selected ? p.secciones.filter((s) => s !== value) : [...p.secciones, String(value)] }))}><I size={13} color={selected ? "#00d97e" : "rgba(255,255,255,.3)"} /><span style={{ fontSize: 11, color: selected ? "#00d97e" : "rgba(255,255,255,.6)" }}>{label}</span></button>;
            })}
          </div>
          <div style={{ marginTop: "auto", paddingTop: 12 }}><div className="step-label" style={{ marginBottom: 7 }}>Tienes logo o branding propio?</div><div style={{ display: "flex", gap: 8 }}>{[["Si, tengo logo", Check], ["Necesito diseno", Brush]].map(([v, Icon]) => {const selected = state.logo === v; const I = Icon as typeof Check; return <button key={String(v)} type="button" className={`opt-card ${selected ? "selected" : ""}`} style={{ borderRadius: 20, padding: "7px 11px", display: "inline-flex", alignItems: "center" }} onClick={() => setState((p) => ({ ...p, logo: String(v) }))}><I size={13} color={selected ? "#00d97e" : "rgba(255,255,255,.3)"} /><span style={{ fontSize: 11, color: selected ? "#00d97e" : "rgba(255,255,255,.6)" }}>{v}</span></button>;})}</div></div>
        </Screen>

        <Screen n={4}>
          <div className="step-label">Paso 4 de 4</div><div className="step-title">Cuentanos de tu negocio</div><div className="step-sub">Con esto armamos la propuesta exacta para ti</div>
          <div className="summary-card">
            <div className="summary-row"><span className="summary-key">Tipo</span><span className="summary-val">{state.tipo || "-"}</span></div>
            <div className="summary-row"><span className="summary-key">Estilo</span><span className="summary-val">{state.estilo || "-"}</span></div>
            <div className="summary-row"><span className="summary-key">Paleta</span><span className="summary-val">{state.paleta || "-"}</span></div>
            <div className="summary-row"><span className="summary-key">Secciones</span><span className="summary-val">{state.secciones.length ? state.secciones.join(", ") : "-"}</span></div>
          </div>
          <div className="frow"><div className="field"><input placeholder="Tu nombre" value={state.nombre} onChange={(e) => setState((p) => ({ ...p, nombre: e.target.value }))} /><div className="err">{errors.nombre}</div></div><div className="field"><input placeholder="Nombre empresa" value={state.empresa} onChange={(e) => setState((p) => ({ ...p, empresa: e.target.value }))} /><div className="err">{errors.empresa}</div></div></div>
          <div className="toggle-row">
            <button type="button" className={`tog-box ${state.useEmail ? "on" : ""}`} onClick={() => setState((p) => ({ ...p, useEmail: !p.useEmail }))}><span className="tog-label">Email</span><span className={`tog ${state.useEmail ? "on" : ""}`} /></button>
            <button type="button" className={`tog-box ${state.useWsp ? "on" : ""}`} onClick={() => setState((p) => ({ ...p, useWsp: !p.useWsp }))}><span className="tog-label">WhatsApp</span><span className={`tog ${state.useWsp ? "on" : ""}`} /></button>
          </div>
          {state.useEmail ? <div className="field" style={{ marginBottom: 8 }}><input placeholder="tu@email.com" value={state.email} onChange={(e) => setState((p) => ({ ...p, email: e.target.value }))} /><div className="err">{errors.email}</div></div> : null}
          {state.useWsp ? <div style={{ marginBottom: 4 }}><div className="step-label" style={{ marginBottom: 5 }}>Codigo país</div><div className="phone-wrap"><select value={state.codigoPais} onChange={(e) => setState((p) => ({ ...p, codigoPais: e.target.value }))}>{[["Chile (+56)", "+56"], ["Argentina (+54)", "+54"], ["Colombia (+57)", "+57"], ["Peru (+51)", "+51"], ["Mexico (+52)", "+52"], ["Espana (+34)", "+34"], ["EE.UU. (+1)", "+1"]].map(([l, v]) => <option key={String(v)} value={String(v)}>{l}</option>)}</select><div className="phone-input-wrap"><span className="phone-prefix">{state.codigoPais}</span><input placeholder="9 1234 5678" value={state.telefono} onChange={(e) => setState((p) => ({ ...p, telefono: e.target.value }))} /></div></div><div className="err">{errors.phone}</div></div> : null}
          <button type="button" className={`call-opt ${state.wantCall ? "on" : ""}`} onClick={() => setState((p) => ({ ...p, wantCall: !p.wantCall }))}><span className="call-radio" /><span><div style={{ fontSize: 12, fontWeight: 500, color: state.wantCall ? "#00d97e" : "rgba(255,255,255,.75)" }}>Solicitar una llamada</div><div style={{ fontSize: 10, color: "rgba(255,255,255,.25)" }}>Coordinamos una llamada para revisar tu caso y acelerar la propuesta.</div></span></button>
          {sendError ? <div className="err" style={{ marginTop: 8 }}>{sendError}</div> : null}
        </Screen>

        <Screen n={5}>
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}><div style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "center" }}><div style={{ width: 52, height: 52, borderRadius: "50%", background: "rgba(0,217,126,.15)", display: "flex", alignItems: "center", justifyContent: "center" }}><Check size={24} color="#00d97e" /></div><div style={{ fontSize: 19, fontWeight: 600, color: "rgba(255,255,255,.9)" }}>Todo listo!</div><div style={{ fontSize: 13, color: "rgba(255,255,255,.35)", maxWidth: 280, lineHeight: 1.6 }}>Te respondemos con la propuesta en menos de 24 horas</div><button type="button" onClick={sendWsp} style={{ fontSize: 13, fontWeight: 500, background: "#25d366", color: "#fff", border: "none", cursor: "pointer", padding: "11px 22px", borderRadius: 10, display: "flex", alignItems: "center", gap: 7 }}><MessageCircle size={18} />Enviar solicitud por WhatsApp</button></div></div>
        </Screen>
      </div>

      {step < 5 ? <div className="footer-bar"><button className="btn-back" onClick={() => setStep((v) => Math.max(1, v - 1))} style={{ visibility: step > 1 ? "visible" : "hidden" }}><ArrowLeft size={14} /> Atras</button><button className="btn-next" disabled={!canContinue || sending} onClick={next}>{step === 4 ? "Enviar" : "Continuar"} {step === 4 ? <Send size={14} /> : <ArrowRight size={14} />}</button></div> : null}
    </div>
  );
};

export default Wizard;
