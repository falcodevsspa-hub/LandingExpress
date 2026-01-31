interface WhatsAppPayload {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
}

export const notifyWhatsapp = async (payload: WhatsAppPayload): Promise<void> => {
  // Solo ejecutar si está habilitado
  if (import.meta.env.VITE_WHATSAPP_CLOUD_ENABLED !== "true") {
    return;
  }

  const phoneId = import.meta.env.VITE_WHATSAPP_PHONE_ID;
  const token = import.meta.env.VITE_WHATSAPP_TOKEN;

  if (!phoneId || !token) {
    console.warn('WhatsApp Cloud API no configurada correctamente');
    return;
  }

  const url = `https://graph.facebook.com/v19.0/${phoneId}/messages`;
  
  const body = `Nuevo lead LandingExpress:
Nombre: ${payload.name}
Email: ${payload.email}
Tel: ${payload.phone || "-"}
Empresa: ${payload.company || "-"}
Mensaje: ${payload.message}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: "56927444800",
        type: "text",
        text: {
          body,
        },
      }),
    });

    if (!response.ok) {
      console.error('Error en WhatsApp Cloud API:', await response.text());
    }
  } catch (error) {
    console.error('Error al notificar por WhatsApp:', error);
  }
};
