
import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req) {
    try {
        const { caseDetails } = await req.json();

        const chatCompletion = await getGroqChatCompletion(caseDetails);

        const generatedBrief = chatCompletion.choices[0]?.message?.content || "No brief generated.";

        return NextResponse.json({ brief: generatedBrief });
    } catch (error) {
        console.error('Error generating brief:', error);  // Improved logging
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

async function getGroqChatCompletion(caseDetails) {
    try {
        return await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: caseDetails,
                },
            ],
            model: "llama3-8b-8192",
        });
    } catch (error) {
        throw new Error('Failed to communicate with Groq API: ' + error.message);
    }
}
