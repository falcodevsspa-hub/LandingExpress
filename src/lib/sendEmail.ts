/**
 * Configuración de EmailJS para el formulario de contacto
 * 
 * Configurar en Lovable / Vercel:
 * VITE_EMAILJS_SERVICE_ID = service_bycw1lw
 * VITE_EMAILJS_TEMPLATE_ID = template_pkf04rb
 * VITE_EMAILJS_PUBLIC_KEY = 1JpzSYJBcy5rfa82b
 * 
 * La plantilla EmailJS debe incluir estas variables:
 * {{name}}, {{email}}, {{phone}}, {{company}}, {{message}}
 */

import emailjs from '@emailjs/browser';

interface EmailData {
  from_name: string;
  reply_to: string;
  phone?: string;
  company?: string;
  message: string;
}

export const sendEmail = async (formData: EmailData): Promise<void> => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  // Verificar que las variables de entorno estén configuradas
  if (!serviceId || !templateId || !publicKey) {
    throw new Error('EmailJS no está configurado. Faltan variables de entorno.');
  }

  try {
    const response = await emailjs.send(
      serviceId,
      templateId,
      {
        name: formData.from_name,
        email: formData.reply_to,
        phone: formData.phone || '',
        company: formData.company || '',
        message: formData.message,
      },
      publicKey
    );

    console.log('✅ Email enviado exitosamente:', response.status, response.text);
  } catch (error) {
    console.error('❌ Error al enviar email:', error);
    throw new Error('Ocurrió un error al enviar el mensaje. Intenta nuevamente más tarde.');
  }
};
