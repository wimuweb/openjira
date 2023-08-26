import { Entry } from "@/interfaces";

interface SeedData {
    entries: ISeedEntry[];
}
interface ISeedEntry {
    description: string;
    status: string;
    createdAt: number;
}




export const seedData: SeedData = {
    entries: [
        {
            description: 'Pendientes: Laborum tempor duis fugiat pariatur pariatur ullamco aliquip.',
            status: 'pending',
            createdAt: Date.now()
        },
        {
            description: 'En progreso:Duis aliqua excepteur laborum dolore irure.',
            status: 'in-progress',
            createdAt: Date.now() - 1000000
        },
        {
            description: 'Completadas: Sunt exercitation dolor non ea proident eu aliquip sint magna ex nisi amet nisi excepteur.',
            status: 'finished',
            createdAt: Date.now() - 100000
        },
    ]
}
