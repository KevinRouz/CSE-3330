import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../lib/db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    const { itemName } = req.body;

    try {
      const stmt = db.prepare(
        `DELETE FROM Items WHERE itemName = ?`
      );
      const result = stmt.run(itemName);

      if (result.changes > 0) {
        res.status(200).json({ message: 'Item deleted' });
      } else {
        res.status(404).json({ message: 'Item not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}