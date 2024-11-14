import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../lib/db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { itemName, price } = req.body;

    try {
      const stmt = db.prepare(
        `INSERT INTO Items (itemName, price) VALUES (?, ?)`
      );
      const result = stmt.run(itemName, price);

      res.status(201).json({ message: 'Item inserted', id: result.lastInsertRowid });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}