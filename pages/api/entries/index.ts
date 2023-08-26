import { db } from '@/database';
import { Entry, IEntry } from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data =
    | { message: string }
    | IEntry[]
    | IEntry

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'GET':

            return getEntries(res);
        case 'POST':

            return postEntry(req, res);


        default:
            return res.status(400).json({ message: 'Endpoint no existe' });
    }




}

const getEntries = async (res: NextApiResponse) => {
    await db.connect();
    const entries = await Entry.find().sort({ createdAt: 'ascending' });
    await db.disconnect();

    res.status(200).json(entries)

}
const postEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { description } = req.body;

    const newentry = new Entry({
        description,
        createdAt: Date.now(),
    });
    try {
        await db.connect();
        await newentry.save();
        await db.disconnect();
        return res.status(201).json(newentry);
    } catch (error) {
        await db.disconnect();
        console.log(error);
        return res.status(500).json({ message: 'Algo salio mal, revisar consola del servidor' });


    }




}
