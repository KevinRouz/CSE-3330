import mysql from 'mysql';
import { userAgent } from 'next/server';

export default function handler(req, res)
{
    const {id} = req.query;
    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD, 
        database: process.env.DB_NAME,
    });

    connection.query(
        'SELECT * FROM Items WHERE itemID = ? OR itemName = ?'
        [id, id],
        (err, results) => {
            if (err){
                res.status(500).json({error: err.message});
            } 
            else {
                res.status(200).json(results);
            }
        }
    );
    connection.end();
}