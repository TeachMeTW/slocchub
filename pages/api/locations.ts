// pages/api/locations.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/libs/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            // Handle the file upload here (e.g., uploading to a cloud storage)
            // For simplicity, let's assume the image URL is returned and stored in imageUrl

            const { type, latitude, longitude, description } = req.body;
            const imageUrl = 'path/to/your/uploaded/image.jpg'; // Replace with actual image URL

            const location = await prisma.location.create({
                data: {
                    type,
                    latitude: parseFloat(latitude),
                    longitude: parseFloat(longitude),
                    description,
                    image: imageUrl,
                },
            });

            res.status(200).json(location);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
