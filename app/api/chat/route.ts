import OpenAI from 'openai';
import { NextResponse } from 'next/server';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// System prompt that defines the chatbot's behavior and knowledge
const SYSTEM_PROMPT = `You are a helpful assistant for Abdellatyf en-neiymy's portfolio website. 
You should provide brief, friendly responses about Abdellatyf's background, skills, and experience.
Keep responses concise and professional. If you're not sure about something, be honest and suggest 
contacting Abdellatyf directly through WhatsApp or the contact form.

Key information about Abdellatyf:
- Full-stack developer focused on React, Next.js, and TypeScript
- Portfolio available at current website
- Resume available at /resume/resume.pdf
- Contact via WhatsApp or contact form on the website
- Main skills: JavaScript/TypeScript, React, Next.js, Node.js, Tailwind CSS

If asked about personal opinions or non-portfolio topics, politely redirect to professional matters.`;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.map((m: any) => ({
          role: m.from === 'user' ? 'user' : 'assistant',
          content: m.text
        }))
      ],
      temperature: 0.7,
      max_tokens: 200, // Keep responses concise
    });

    const reply = completion.choices[0]?.message?.content || "I apologize, but I couldn't generate a response at the moment.";

    return NextResponse.json({ reply });

  } catch (error: any) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    );
  }
}