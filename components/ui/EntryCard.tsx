import { UIContext } from '@/context/ui'
import { Entry } from '@/interfaces'
import { dateFunctions } from '@/utils'
import { Card, CardActionArea, CardContent, CardActions, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { FC, DragEvent, useContext } from 'react'

interface Props {
    entry: Entry
}


export const EntryCard: FC<Props> = ({ entry }) => {

    const { startDragging, endDragging } = useContext(UIContext);
    const router = useRouter();


    const onDragStart = (event: DragEvent) => {
        event.dataTransfer.setData('text', entry._id)
        // todo: modificar el estado mientras estoy haciendo el drag
        startDragging()
    }

    const onDragEnd = () => {
        // todo: Cancelar on drag
        endDragging();
    }
    const onClick = () => {
        router.push(`/entries/${entry._id}`)
    }

    return (
        <Card
            onClick={onClick}
            sx={{ marginBottom: 1 }}
            draggable
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
        >
            <CardActionArea>
                <CardContent>
                    <Typography>{entry.description}</Typography>
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
                    <Typography variant='body2'>{dateFunctions.getFormatdDistanceTNow(entry.createdAt)}</Typography>
                </CardActions>
            </CardActionArea>
        </Card>
    )
}
