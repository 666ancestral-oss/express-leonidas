import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_123');

type FormData = {
  nome: string;
  empresa?: string;
  telefone: string;
  tipoCarga: string;
  origem: string;
  destino: string;
  mensagem?: string;
};

function buildEmailHtml(data: FormData): string {
  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
      <h2 style="color:#2563eb;border-bottom:2px solid #2563eb;padding-bottom:12px">
        Nova Cotação - Expresso Leonidas
      </h2>
      <table style="width:100%;border-collapse:collapse;margin-top:16px">
        <tr><td style="padding:8px 12px;background:#f1f5f9;font-weight:bold;width:140px">Nome</td>
            <td style="padding:8px 12px">${data.nome}</td></tr>
        ${data.empresa ? `<tr><td style="padding:8px 12px;background:#f1f5f9;font-weight:bold">Empresa</td>
            <td style="padding:8px 12px">${data.empresa}</td></tr>` : ''}
        <tr><td style="padding:8px 12px;background:#f1f5f9;font-weight:bold">Telefone</td>
            <td style="padding:8px 12px">${data.telefone}</td></tr>
        <tr><td style="padding:8px 12px;background:#f1f5f9;font-weight:bold">Tipo de Carga</td>
            <td style="padding:8px 12px">${data.tipoCarga}</td></tr>
        <tr><td style="padding:8px 12px;background:#f1f5f9;font-weight:bold">Origem</td>
            <td style="padding:8px 12px">${data.origem}</td></tr>
        <tr><td style="padding:8px 12px;background:#f1f5f9;font-weight:bold">Destino</td>
            <td style="padding:8px 12px">${data.destino}</td></tr>
        ${data.mensagem ? `<tr><td style="padding:8px 12px;background:#f1f5f9;font-weight:bold;vertical-align:top">Detalhes</td>
            <td style="padding:8px 12px">${data.mensagem}</td></tr>` : ''}
      </table>
      <p style="margin-top:24px;font-size:12px;color:#64748b">
        Enviado automaticamente pelo site expressoleonidas.com.br
      </p>
    </div>
  `;
}

const ALLOWED_ORIGINS = [
  'https://expressoleonidas.com.br',
  'https://www.expressoleonidas.com.br',
  'https://el.edgeweb.com.br',
  'http://localhost:5173',
  'http://localhost:3000',
];

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const origin = req.headers.origin;
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'POST');
  }

  try {
    const data: FormData = req.body;

    if (!data.nome || !data.telefone || !data.tipoCarga || !data.origem || !data.destino) {
      return res.status(400).json({ error: 'Campos obrigatórios faltando' });
    }

    const { error } = await resend.emails.send({
      from: 'Expresso Leonidas <contato@expressoleonidas.com.br>',
      to: ['expressoleonidas@gmail.com'],
      subject: `Nova Cotação - ${data.nome} - ${data.origem} → ${data.destino}`,
      html: buildEmailHtml(data),
      replyTo: data.telefone.includes('@') ? data.telefone : undefined,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: 'Erro ao enviar email' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Unexpected error:', err);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
