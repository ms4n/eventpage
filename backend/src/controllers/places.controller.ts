import { Request, Response } from 'express';
import axios from 'axios';

export const searchPlaces = async (req: Request, res: Response) => {
  try {
    const { input, locationBias } = req.body;
    
    const response = await axios.post(
      'https://places.googleapis.com/v1/places:autocomplete',
      {
        input,
        locationBias: locationBias || {
          circle: {
            center: {
              latitude: 37.7749,
              longitude: -122.4194
            },
            radius: 5000.0
          }
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': process.env.GOOGLE_MAPS_API_KEY
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Places API Error:', error);
    res.status(500).json({ error: 'Failed to fetch place suggestions' });
  }
}; 