import { Entry } from '@/interfaces';
import { createContext } from 'react'

interface ContextProps {
    entries: Entry[];

    // Metodos
    addNewEntry: (description: string) => void;
    updateEntry: (entry: Entry, showSnackbar?: boolean) => void;

}




export const EntriesContext = createContext({} as ContextProps);
