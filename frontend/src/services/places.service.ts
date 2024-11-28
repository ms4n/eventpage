import axios from "axios";
import env from "../config/env";

export interface PlaceSuggestion {
  placePrediction?: {
    place: string;
    placeId: string;
    text: {
      text: string;
      matches: Array<{
        startOffset?: number;
        endOffset: number;
      }>;
    };
    structuredFormat: {
      mainText: {
        text: string;
      };
      secondaryText: {
        text: string;
      };
    };
  };
}

export const searchPlaces = async (
  input: string
): Promise<PlaceSuggestion[]> => {
  try {
    const response = await axios.post(`${env.API_URL}/places/search`, {
      input,
    });
    return response.data.suggestions || [];
  } catch (error) {
    console.error("Error fetching place suggestions:", error);
    return [];
  }
};
