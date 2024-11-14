import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../lib/db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  try {
    const stmt = db.prepare(
      `SELECT * FROM Items WHERE itemId = ? OR itemName = ?`
    );
    const result = stmt.get(id, id);

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}