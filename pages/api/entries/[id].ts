import { db } from '@/database';
import { Entry, IEntry } from '@/models';
import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data =
    | { message: string }
    | IEntry

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    const { id } = req.query;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: 'El id no es valido' + id })
    }
    switch (req.method) {
        case 'PUT':

            return updateEntry(req, res);

        case 'DELETE':
            return deleteEntry(req, res);
        case 'GET':
            return getEntry(req, res);

        default:
            return res.status(400).json({ message: 'Méthodo no existe!!!' });

    }


}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id } = req.query;
    await db.connect();
    const entryUpdate = await Entry.findById(id);
    if (!entryUpdate) {
        await db.disconnect();
        return res.status(400).json({ message: 'No hay entrada con ese ID: ' + id });
    }
    const {
        description = entryUpdate.description,
        status = entryUpdate.status,
    } = req.body;

    try {
        const updatedEntry = await Entry.findByIdAndUpdate(id, { description, status }, { runValidators: true, new: true });
        await db.disconnect();
        return res.status(200).json(updatedEntry!);

    } catch (error: any) {
        console.log(error);

        await db.disconnect();
        res.status(400).json({ message: error.errors.status.message });
    }

}

/**
 * aca borre la logica, he implemente una respuesta
 * sencilla para ver si era algo con la logica que
 * proporcionaste y o algo que yo hice mal
 * y arroja el mismo error.
 */
const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id } = req.query;
    return res.status(200).json({ message: 'el getentry funciona' })
}

//  esto lo cree como prueba haber si solo me pasaba con get
const deleteEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id } = req.query;
    return res.status(200).json({ message: 'el delete funciona' })
}
