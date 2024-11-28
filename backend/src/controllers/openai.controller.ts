import { Request, Response } from "express";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateDescription = async (req: Request, res: Response) => {
  try {
    const { eventName, location } = req.body;

    if (!eventName || !location) {
      return res
        .status(400)
        .json({ error: "Event name and location are required" });
    }

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are an event description writer. Create a brief, engaging description for an event.",
        },
        {
          role: "user",
          content: `Write a brief description for an event named "${eventName}" located at "${location}". Keep it concise and engaging.`,
        },
      ],
      model: "gpt-4o-mini",
    });

    const description = completion.choices[0]?.message?.content || "";
    res.json({ description });
  } catch (error) {
    console.error("OpenAI API error:", error);
    res.status(500).json({ error: "Failed to generate description" });
  }
};
