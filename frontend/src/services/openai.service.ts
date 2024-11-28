import env from "../config/env";

interface GenerateDescriptionResponse {
  description: string;
}

export const generateEventDescription = async (
  eventName: string,
  location: string
): Promise<string> => {
  try {
    const response = await fetch(`${env.API_URL}/openai/generate-description`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ eventName, location }),
    });

    if (!response.ok) {
      throw new Error("Failed to generate description");
    }

    const data: GenerateDescriptionResponse = await response.json();
    return data.description;
  } catch (error) {
    console.error("Error generating description:", error);
    throw error;
  }
};
