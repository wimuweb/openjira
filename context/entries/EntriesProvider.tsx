import { FC, ReactNode, useReducer, useEffect } from "react";
import { useSnackbar } from 'notistack';
import { EntriesContext, entriesReducer } from "./";
import { Entry } from "@/interfaces";
import { entriesApi } from "@/apis";

export interface EntriesState {
    entries: Entry[];
}
interface Props {
    children: ReactNode;
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: [],
};

export const EntriesProvider: FC<Props> = ({ children }) => {
    useEffect(() => {
        refreshEntries();
    }, []);

    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);
    const { enqueueSnackbar } = useSnackbar();

    const addNewEntry = async (description: string) => {
        const { data } = await entriesApi.post<Entry>("/entries", { description });
        dispatch({ type: "[Entry] - Add-Entry", payload: data });
    };

    const updateEntry = async ({ _id, description, status }: Entry, showSnackbar = false) => {
        try {
            const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {
                description,
                status,
            });
            dispatch({ type: "[Entry] - ENTRY-UPDATED", payload: data });

            if (showSnackbar) {

                enqueueSnackbar('Entrada actualizada', {
                    variant: 'success',
                    autoHideDuration: 1500,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    }
                })
            }

        } catch (error) {
            console.log({ error });
        }
    };

    const refreshEntries = async () => {
        const { data } = await entriesApi.get<Entry[]>("/entries");
        dispatch({ type: "[Entry] - Refresh-Data", payload: data });
    };

    return (
        <EntriesContext.Provider
            value={{
                ...state,

                // Metodos
                addNewEntry,
                updateEntry,
            }}
        >
            {children}
        </EntriesContext.Provider>
    );
};
