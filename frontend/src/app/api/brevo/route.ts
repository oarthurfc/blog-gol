import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    const url = "https://api.brevo.com/v3/contacts";
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": process.env.BREVO_API_KEY || "",
      },
      body: JSON.stringify({
        email,
        updateEnabled: false,
        listIds: [2], // ID da lista de newsletter na Brevo
      }),
    };

    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      // Se o contato já existe, retornar sucesso mesmo assim
      if (response.status === 400 && data.code === "duplicate_parameter") {
        return NextResponse.json(
          { message: "Você já está inscrito na nossa newsletter!" },
          { status: 200 },
        );
      }

      return NextResponse.json(
        { error: data.message || "Erro ao cadastrar email" },
        { status: response.status },
      );
    }

    return NextResponse.json({ message: "Inscrição realizada com sucesso!" }, { status: 200 });
  } catch (error) {
    console.error("Erro ao processar inscrição:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
