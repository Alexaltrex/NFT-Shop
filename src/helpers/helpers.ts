import {format} from 'date-fns'

// timestamp - sec
export const getDate = (timestamp: number): string => format(new Date(timestamp * 1000), 'HH:mm dd.MM.yyyy');

