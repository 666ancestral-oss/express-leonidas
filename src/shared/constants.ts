export const SITE_CONFIG = {
  name: 'Expresso Leonidas',
  tagline: 'Logística Premium',
  url: 'https://el.edgeweb.com.br',
  phone: '(11) 94780-7184',
  email: 'expressoleonidas@gmail.com',
  address: 'São Paulo, SP - Atendimento Nacional',
  whatsapp: {
    number: '5511947807184',
    message: 'Olá! Vim pelo site da Expresso Leonidas e gostaria de solicitar uma cotação. 🚛',
  },
  social: {
    instagram: 'https://instagram.com/expressoleonidas',
    linkedin: 'https://linkedin.com/company/expressoleonidas',
    facebook: 'https://facebook.com/expressoleonidas',
  },
  seo: {
    title: 'Expresso Leonidas - Logística Premium | Fretes e Transportes para todo o Brasil',
    description:
      'Fretes e transportes para todo o Brasil. Conectamos empresas, cargas e destinos com rapidez, tecnologia e segurança. Solicite sua cotação agora!',
    keywords:
      'logística, frete, transporte de cargas, carga fechada, carga fracionada, transportadora, São Paulo, Brasil',
  },
} as const;

export function getWhatsAppUrl(): string {
  const { number, message } = SITE_CONFIG.whatsapp;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
