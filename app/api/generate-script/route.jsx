import { GENERATE_SCRIPT_PROMPT } from "@/services/prompt"
import { NextResponse } from "next/server"
import OpenAI from "openai"

export const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
})

export async function POST(req) {  
  try {
    const { topic } = await req.json()
    
    if (!topic) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 })
    }
    
    const PROMPT = GENERATE_SCRIPT_PROMPT.replace('{topic}', topic)
    
    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-exp:free",
      messages: [
        { role: "user", content: PROMPT }
      ],
    })

    console.log("API Response:", completion.choices[0].message)
    return NextResponse.json({ content: completion.choices[0].message?.content })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 })
  }
}