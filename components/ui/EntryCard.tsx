import { UIContext } from '@/context/ui'
import { Entry } from '@/interfaces'
import { Card, CardActionArea, CardContent, CardActions, Typography } from '@mui/material'
import { FC, DragEvent, useContext } from 'react'

interface Props {
    entry: Entry
}


export const EntryCard: FC<Props> = ({ entry }) => {

    const { startDragging, endDragging } = useContext(UIContext)


    const onDragStart = (event: DragEvent) => {
        event.dataTransfer.setData('text', entry._id)
        // todo: modificar el estado mientras estoy haciendo el drag
        startDragging()
    }

    const onDragEnd = () => {
        // todo: Cancelar on drag
        endDragging();
    }

    return (
        <Card
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
                    <Typography variant='body2'>hace 30 minutos</Typography>
                </CardActions>
            </CardActionArea>
        </Card>
    )
}
