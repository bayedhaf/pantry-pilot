import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Configuration Error" }, { status: 500 });
    }

    const body = await req.json();
    const { ingredients, dietaryRestrictions, cuisine, mealType, cookingTime, difficulty } = body;

    // Validation
    if (!ingredients) {
      return NextResponse.json({ error: "Ingredients are required" }, { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Using gemini-1.5-flash for production speed and cost-efficiency
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
      You are a Michelin-star chef. Create a highly professional recipe card in Markdown.
      
      CONTEXT:
      - Ingredients: ${ingredients}
      - Diet: ${dietaryRestrictions || "None"}
      - Style: ${cuisine} ${mealType}
      - Constraint: Ready in ${cookingTime} mins, ${difficulty} level.

      STRUCTURE:
      # [Recipe Name]
      *Brief appetizing description*
      ---
      ### ⏱️ Details
      - **Prep:** X min | **Cook:** Y min | **Total:** <${cookingTime} min
      ---
      ### 🛒 Ingredients
      (List with precise measurements)
      ---
      ### 👨‍🍳 Instructions
      (Numbered, clear steps)
      ---
      ### 🥗 Nutrition & Tips
      (Calories/Macros and one chef's secret tip)
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return NextResponse.json({ recipe: text });
  } catch (error: unknown) {
    const err = error as { message?: string; status?: number };
    const message = err?.message || "AI service is temporarily busy.";
    const status = typeof err?.status === "number" ? err.status : 503;
    console.error("Gemini API Error:", message);
    return NextResponse.json({ error: message }, { status });
  }
}