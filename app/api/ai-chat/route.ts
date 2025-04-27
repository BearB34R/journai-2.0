import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    const openaiRes = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "You are a supportive AI wellness companion. Respond empathetically and helpfully to the user's messages.",
            },
            {
              role: "user",
              content: message,
            },
          ],
          max_tokens: 200,
          temperature: 0.7,
        }),
      }
    );
    if (!openaiRes.ok) {
      const errorText = await openaiRes.text();
      console.error("OpenAI API error:", openaiRes.status, errorText);
      return NextResponse.json(
        { error: `OpenAI error: ${openaiRes.status} - ${errorText}` },
        { status: 500 }
      );
    }
    const openaiData = await openaiRes.json();
    const aiMessage =
      openaiData.choices?.[0]?.message?.content ||
      `Sorry, I couldn't generate a response. OpenAI raw response: ${JSON.stringify(
        openaiData
      )}`;
    return NextResponse.json({ aiMessage });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
