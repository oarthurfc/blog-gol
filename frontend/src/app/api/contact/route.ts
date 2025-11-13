import { Resend } from "resend";
import { NextRequest } from "next/server";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Inicializar Resend apenas quando a rota for chamada
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message }: ContactFormData = await request.json();

    // Validações
    if (!name || name.trim().length < 2) {
      return Response.json({ error: "Nome deve ter pelo menos 2 caracteres" }, { status: 400 });
    }

    if (!email || !email.includes("@")) {
      return Response.json({ error: "Email inválido" }, { status: 400 });
    }

    if (!subject || subject.trim().length < 3) {
      return Response.json({ error: "Assunto deve ter pelo menos 3 caracteres" }, { status: 400 });
    }

    if (!message || message.trim().length < 10) {
      return Response.json(
        { error: "Mensagem deve ter pelo menos 10 caracteres" },
        { status: 400 },
      );
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!adminEmail) {
      return Response.json(
        { error: "Configuração do servidor incompleta - ADMIN_EMAIL não definido" },
        { status: 500 },
      );
    }

    if (!resendApiKey) {
      return Response.json(
        { error: "Configuração do servidor incompleta - RESEND_API_KEY não definido" },
        { status: 500 },
      );
    }

    // HTML do email para o administrador
    const adminEmailHtml = `
      <!DOCTYPE html>
      <html lang="pt-BR">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Nova Mensagem de Contato</title>
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              background-color: #f4f4f4;
              padding: 20px;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            }
            .header {
              background: linear-gradient(135deg, #FFC700 0%, #FFD700 100%);
              padding: 30px 20px;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              color: #000;
              font-size: 28px;
              font-weight: 700;
            }
            .header p {
              margin: 5px 0 0 0;
              color: #333;
              font-size: 14px;
            }
            .content {
              padding: 30px 20px;
            }
            .field {
              margin-bottom: 25px;
              border-bottom: 1px solid #e0e0e0;
              padding-bottom: 20px;
            }
            .field:last-child {
              border-bottom: none;
              margin-bottom: 0;
            }
            .field-label {
              font-weight: 600;
              color: #555;
              font-size: 12px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              margin-bottom: 8px;
              display: block;
            }
            .field-value {
              margin-top: 5px;
              padding: 12px 15px;
              background-color: #f9f9f9;
              border-left: 4px solid #FFC700;
              border-radius: 4px;
              font-size: 15px;
              color: #333;
              word-wrap: break-word;
            }
            .field-value.message {
              white-space: pre-wrap;
              min-height: 80px;
            }
            .footer {
              background-color: #f9f9f9;
              text-align: center;
              padding: 20px;
              border-top: 1px solid #e0e0e0;
            }
            .footer p {
              color: #777;
              font-size: 13px;
              margin: 0;
            }
            .badge {
              display: inline-block;
              background-color: #4CAF50;
              color: white;
              padding: 4px 12px;
              border-radius: 12px;
              font-size: 11px;
              font-weight: 600;
              text-transform: uppercase;
              margin-top: 10px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📬 Nova Mensagem de Contato</h1>
              <p>Recebida através do formulário do site</p>
              <span class="badge">Novo</span>
            </div>
            <div class="content">
              <div class="field">
                <span class="field-label">👤 Nome do Remetente</span>
                <div class="field-value">${name}</div>
              </div>
              <div class="field">
                <span class="field-label">📧 Email de Resposta</span>
                <div class="field-value">
                  <a href="mailto:${email}" style="color: #0066cc; text-decoration: none;">${email}</a>
                </div>
              </div>
              <div class="field">
                <span class="field-label">📌 Assunto</span>
                <div class="field-value">${subject}</div>
              </div>
              <div class="field">
                <span class="field-label">💬 Mensagem</span>
                <div class="field-value message">${message.replace(/\n/g, "<br>")}</div>
              </div>
            </div>
            <div class="footer">
              <p>Esta mensagem foi enviada através do formulário de contato do <strong>Gol a Gol Esportes</strong></p>
              <p style="margin-top: 8px; font-size: 12px;">Para responder, basta clicar no email acima ou usar a função "Responder"</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // HTML do email de confirmação para o usuário
    const userEmailHtml = `
      <!DOCTYPE html>
      <html lang="pt-BR">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Mensagem Recebida</title>
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              background-color: #f4f4f4;
              padding: 20px;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            }
            .header {
              background: linear-gradient(135deg, #FFC700 0%, #FFD700 100%);
              padding: 40px 20px;
              text-align: center;
            }
            .header-icon {
              font-size: 48px;
              margin-bottom: 10px;
            }
            .header h1 {
              margin: 0;
              color: #000;
              font-size: 28px;
              font-weight: 700;
            }
            .content {
              padding: 40px 30px;
            }
            .content p {
              margin-bottom: 20px;
              font-size: 16px;
              color: #555;
            }
            .summary-box {
              background-color: #f9f9f9;
              border-left: 4px solid #FFC700;
              padding: 20px;
              margin: 25px 0;
              border-radius: 4px;
            }
            .summary-box h3 {
              margin: 0 0 10px 0;
              color: #333;
              font-size: 16px;
            }
            .summary-box p {
              margin: 8px 0;
              font-size: 14px;
              color: #666;
            }
            .summary-box strong {
              color: #333;
            }
            .cta-button {
              display: inline-block;
              background-color: #000;
              color: #FFC700;
              padding: 14px 30px;
              text-decoration: none;
              border-radius: 6px;
              font-weight: 600;
              margin: 20px 0;
              transition: background-color 0.3s;
            }
            .footer {
              background-color: #f9f9f9;
              text-align: center;
              padding: 30px 20px;
              border-top: 1px solid #e0e0e0;
            }
            .footer p {
              color: #777;
              font-size: 13px;
              margin: 5px 0;
            }
            .social-links {
              margin-top: 20px;
            }
            .social-links a {
              display: inline-block;
              margin: 0 8px;
              color: #666;
              text-decoration: none;
              font-size: 13px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="header-icon">✅</div>
              <h1>Mensagem Recebida!</h1>
            </div>
            <div class="content">
              <p>Olá, <strong>${name}</strong>!</p>
              <p>Recebemos sua mensagem através do nosso formulário de contato e queremos agradecer por entrar em contato conosco.</p>
              <p>Nossa equipe analisará sua mensagem e retornará o mais breve possível.</p>
              
              <div class="summary-box">
                <h3>📋 Resumo da sua mensagem:</h3>
                <p><strong>Assunto:</strong> ${subject}</p>
                <p><strong>Data:</strong> ${new Date().toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}</p>
              </div>

              <p>Enquanto isso, continue acompanhando as últimas notícias do futebol em nosso site!</p>
              
              <center>
                <a href="https://golagolesportes.com" class="cta-button">Visitar Gol a Gol Esportes</a>
              </center>
            </div>
            <div class="footer">
              <p><strong>Gol a Gol Esportes</strong></p>
              <p>Sua fonte de notícias esportivas</p>
              <div class="social-links">
                <a href="https://www.instagram.com/golagolesportes">Instagram</a> |
                <a href="https://www.linkedin.com/company/golagolesportes">LinkedIn</a>
              </div>
              <p style="margin-top: 15px; font-size: 11px; color: #999;">
                Este é um email automático. Por favor, não responda diretamente a esta mensagem.
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Enviar email para o administrador
    const { data: adminData, error: adminError } = await resend.emails.send({
      from: "Gol a Gol Esportes <contato@golagolesportes.com>",
      to: [adminEmail],
      replyTo: email,
      subject: `[Contato] ${subject}`,
      html: adminEmailHtml,
    });

    if (adminError) {
      console.error("Erro ao enviar email para admin:", adminError);
      return Response.json(
        { error: "Erro ao enviar mensagem. Tente novamente mais tarde." },
        { status: 500 },
      );
    }

    // Enviar email de confirmação para o usuário (não bloqueia a resposta se falhar)
    resend.emails
      .send({
        from: "Gol a Gol Esportes <contato@golagolesportes.com>",
        to: [email],
        subject: "Confirmação - Mensagem Recebida | Gol a Gol Esportes",
        html: userEmailHtml,
      })
      .catch((error) => {
        console.error("Erro ao enviar email de confirmação:", error);
      });

    return Response.json(
      {
        message: "Mensagem enviada com sucesso! Responderemos em breve.",
        data: adminData,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Erro ao processar contato:", error);
    return Response.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
